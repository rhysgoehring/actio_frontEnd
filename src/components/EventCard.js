import React, {Component} from 'react';
import {Grid, Row, Col, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import _ from 'lodash';
import {Link} from 'react-router';
import axios from 'axios';
import {reduxForm, Field, reset} from 'redux-form';
import GoogleMap from './googleMap';

const google = window.google;

// const ROOT_URL = 'https://actio-backend.herokuapp.com';
const ROOT_URL= 'http://localhost:8080'


class EventCard extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      showModal: false,
      eventOwner: {name: '', pic:'',info:''},
      messages: [],
      usersJoined: []
    })

 }

  getOwnerInfo(id) {
   return axios.get(`${ROOT_URL}/api/users/${id}`).then(response => {
    let eventInfo = {}
    eventInfo['id'] = this.props.eventId;
    eventInfo['owner'] = {
       name: `${response.data.first_name} ${response.data.last_name}`,
       pic: response.data.profile_pic,
       info: response.data.about
     }
     return eventInfo;
   })

 }

  getMessages(eventInfo){
   return axios.get(`${ROOT_URL}/api/events/${this.props.eventId}/messages`).then(response =>{
     eventInfo['messages'] = response.data
     return eventInfo
   })
 }

 getUsersJoined(eventInfo){
   return axios.get(`${ROOT_URL}/api/events/${this.props.eventId}/users`).then(response => {
     eventInfo['usersJoined'] = response.data
     return eventInfo
   })
 }

  handleModalClick() {
   if (this.state.showModal === true) {
     this.setState({
       showModal: false
     })
   } else {
     this.getOwnerInfo(this.props.eventOwner)
     .then((data) => this.getMessages(data))
     .then((data) => this.getUsersJoined(data)) // <-- here
     .then((eventInfo) => {
       this.setState({
         eventOwner: eventInfo['owner'],
         messages: eventInfo['messages'],
  	     usersJoined: eventInfo['usersJoined'], // then add it to the state change
         showModal: true
       })
     })
   }
    }

  renderOwnerInfo() {
    return (
    <div>
      <h5 className='text-center'>About {this.state.eventOwner.name}:</h5>
      <h5 className='text-center'>{this.state.eventOwner.info}</h5>
    </div>
    )
}

  renderMessages(){
    return (
      _.map(this.state.messages, message =>{
        return (
        <div key={message.id}>
          <h5><strong>{message.title}</strong></h5>
          <h5>{message.body}</h5>
          <hr />
        </div>
        )
      })
    )
  }

  renderJoinedUsers(){
    return (
      _.map(this.state.usersJoined, users =>{
        return (
          <li className="owner_info list-inline-item" key={users.last_name}>
              <h6><img className='img-responsive' src={users.profile_pic}></img><strong>{users.first_name} {users.last_name}</strong></h6>
          </li>
        )
      })
    )
  }

onSubmit(values) {
  let currentMessages = this.state.messages
  let body = values.body
  let title = this.props.firstName
  let message = {title:title, body:body, event_id:this.props.eventId}
  currentMessages.push(message);
  this.setState({
    messages: currentMessages
  })
  axios.post(`${ROOT_URL}/api/messages`, message);
  this.props.dispatch(reset('comments'));
}

joinE(id) {
  const userId = this.props.id
  const currentUsers = this.state.usersJoined
  let newUser= {
    id: this.props.id,
    first_name: this.props.firstName,
    last_name: this.props.lastName,
    profile_pic: this.props.picUrl
  }

  currentUsers.push(newUser)
  this.setState({
    usersJoined: currentUsers
  })
  axios.post(`${ROOT_URL}/api/events/${this.props.eventId}`, {userId})
  }

  checkUserStatus() {
    for (var i = 0; i < this.state.usersJoined.length; i++) {
      if(this.state.usersJoined[i].id === this.props.id) {
        return true;
      }
    }
      return false;
  }



  renderButtons(){
    if (this.checkUserStatus() === false) {
      return (
        <button className='btn eventBtn pull-right' onClick={this.joinE.bind(this)}>Join Event</button>
      )
    }
  }

  deleteE(id) {
    this.props.deleteEvent(this.props.eventId);
  }

  renderEditDelete(){
    if (this.props.eventOwner === this.props.id){
      return(
        <div>
          <div>
             <div className='btn eventBtn pull-left edit-btn'><Link style={{textDecoration: 'none', color: 'black'}} to={`/events/${this.props.eventId}`}>Edit Event</Link></div>
          </div>
          <div>
             <button className='btn eventBtn pull-right delete-btn' style={{color:'black'}} onClick={this.deleteE.bind(this)}>Delete</button>
          </div>
       </div>

      )
    }
  }

  render() {
   const { handleSubmit} = this.props
   if (this.props.eventType === 'all') {
    return (
      <div className="row">
        <div className='eventCardContainer' style={{marginLeft: '1.0em'}}>
          <div className='card actCard'>
            <div className='row'>
              <div className='col-md-4 col-xs-12'>
                 <img className="img-responsive allEventPic" src={this.props.eventPic} alt={this.props.eventTitle}
                 />
              </div>
              <div className='col-md-2 col-md-offset-0 col-xs-4 col-xs-offset-3'>
                <img src={this.props.icon} className="img-responsive eventCardImg" />
              </div>
              <div className='col-md-5 col-md-offset-0 col-md-pull-1 col-xs-9 col-xs-offset-1'>
                  <h4 className="card-title text-center allEventTitle" style={{marginLeft: '2.0em'}}><strong>{this.props.eventTitle}</strong></h4>
                  <p className="card-text text-left allEventDesc">{this.props.eventDesc}</p>
                  <div className='row container allEventDetails'>
                    <ul className="actList">
                      <li>At: <strong>{this.props.eventLocation}</strong></li>
                      <li>On: <strong>{this.props.eventDate}</strong></li>
                    </ul>
                  </div>
              </div>
            </div>
            <div className='row'>
              <div className="card-block btnRow">
                <button className='btn eventBtn' onClick={this.handleModalClick.bind(this)}>See More</button>
                {this.renderButtons()}
              </div>
            </div>
            <div className='card-block btn-row'>
                 {this.renderEditDelete()}
            </div>
          </div>
          <Modal
            show={this.state.showModal} dialogClassName="custom-modal"
            className='actModal'
              >
            <Modal.Header>
              <div className="modal_cover">
                <div className="cover_container">
                  <div className="cover_transparency"></div>
                  <div className="modal_cover_img img-responsive" style={{backgroundImage:'url('+this.props.eventPic+')'}}></div>
                  <div className="event_title">
                    <h3><img src={this.props.icon} style={{height:'85px', width:'85px'}}/><strong>{this.props.eventTitle}</strong></h3>
                  </div>
                </div>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className='row container'>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                  <div className='row'>
                    <div className='col-md-5'>
                      <h4 className='text-center'><strong>Event Info</strong></h4>
                      <div className='row container'>
                        <ul className='list-inline'>
                          <li className="list-inline-item">At: <strong>{this.props.eventLocation}</strong></li>
                          <li className="list-inline-item">On: <strong>{this.props.eventDate}</strong></li>
                        </ul>
                      </div>
                      <GoogleMap
                        latLngs={[{lat:this.props.eventLat, lng:this.props.eventLng,icon:this.props.icon}]} center zoom={16} lat={this.props.eventLat} lng={this.props.eventLng} style={{paddingLeft: '2.0em'}} />
                      <h4 className='text-center'><strong>About {this.props.eventTitle}:</strong></h4>
                      <p className='text-left'>{this.props.eventDesc}</p>
                      <h4 className='text-center'><strong>Event Creator: {this.state.eventOwner.name}</strong></h4>
                      <p className='text-left'>{this.state.eventOwner.info}</p>
                      <h4 className='text-center'><strong>Who Else is Going?</strong></h4>
                      <ul className='list-inline'>
                       {this.renderJoinedUsers()}
                      </ul>
                    </div>
                    <div className='col-md-5'>
                      <h4 className='text-center'><strong>Comments:</strong></h4>
                      <div className="row">
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                          <fieldset className="form-group">
                            <span className="col-md-12">
                              <label>Post a Comment</label>
                              <Field
                              name="body"
                              type="text"
                              component="textarea"
                              className="form-control" />
                              <button type="submit" className="btn eventBtn">Comment</button>
                            </span>
                          </fieldset>
                        </form>
                      </div>
                      {this.renderMessages()}
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              {this.renderButtons()}
              <button className="btn eventBtn" onClick={this.handleModalClick.bind(this)}>Close</button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      )
    } else {
      return (
        <div className="row">
          <div className='col-md-12'>
            <div className='thumbnail'>
              <img className="img-responsive myEventImg" src={this.props.eventPic} alt={this.props.eventTitle} />
              <div className='caption'>
                <h4>{this.props.eventTitle}</h4>
                <p>{this.props.eventDesc}</p>
                <button className='card-link eventBtn' onClick={this.handleModalClick.bind(this)}>See More</button>
                <Modal
                  show={this.state.showModal} dialogClassName="custom-modal"
                  className='actModal'>
                  <Modal.Header>
                    <div className="modal_cover">
                      <div className="cover_container">
                        <div className="cover_transparency"></div>
                        <div className="modal_cover_img img-responsive" style={{backgroundImage:'url('+this.props.eventPic+')'}}></div>
                        <div className="event_title">
                          <h3><img src={this.props.icon} style={{height:'85px', width:'85px'}}/><strong>{this.props.eventTitle}</strong></h3>
                        </div>
                      </div>
                    </div>
                  </Modal.Header>
                  <Modal.Body>
                    <div className='row container'>
                      <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                        <div className='row'>
                          <div className='col-md-5'>
                            <h4 className='text-center'><strong>Event Info</strong></h4>
                            <div className='row container'>
                              <ul className='list-inline'>
                                <li className="list-inline-item">At: <strong>{this.props.eventLocation}</strong></li>
                                <li className="list-inline-item">On: <strong>{this.props.eventDate}</strong></li>
                              </ul>
                            </div>
                            <GoogleMap
                              latLngs={[{lat:this.props.eventLat, lng:this.props.eventLng,icon:this.props.icon}]} center zoom={16} lat={this.props.eventLat} lng={this.props.eventLng} style={{paddingLeft: '2.0em'}} />
                            <h4 className='text-center'><strong>About {this.props.eventTitle}:</strong></h4>
                            <p className='text-left'>{this.props.eventDesc}</p>
                            <h4 className='text-center'><strong>Event Creator: {this.state.eventOwner.name}</strong></h4>
                            <p className='text-left'>{this.state.eventOwner.info}</p>
                            <h4 className='text-center'><strong>Who Else is Going?</strong></h4>
                            <ul className='list-inline'>
                             {this.renderJoinedUsers()}
                            </ul>
                          </div>
                          <div className='col-md-5'>
                            <h4 className='text-center'><strong>Comments:</strong></h4>
                            <div className="row">
                              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <fieldset className="form-group">
                                  <span className="col-md-12">
                                    <label>Post a Comment</label>
                                    <Field
                                    name="body"
                                    type="text"
                                    component="textarea"
                                    className="form-control" />
                                    <button type="submit" className="btn eventBtn">Comment</button>
                                  </span>
                                </fieldset>
                              </form>
                            </div>
                            {this.renderMessages()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    {this.renderButtons()}
                    <button className="btn eventBtn" onClick={this.handleModalClick.bind(this)}>Close</button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      )
    }
   }
  }

function mapStateToProps(state) {
  return ({
    authenticated: state.auth.authenticated,
    email: state.auth.email,
    firstName: state.auth.firstName,
    id: state.auth.id,
    lastName: state.auth.lastName,
    picUrl: state.auth.profPic,
    zip: state.auth.zip,
    allEvents: state.allEvents,
    userEvents: state.userEvents
  })
}

EventCard = connect(mapStateToProps, actions)(EventCard)
EventCard = reduxForm({
  form: "comments",
  fields: "body",
})(EventCard);

export default EventCard;
