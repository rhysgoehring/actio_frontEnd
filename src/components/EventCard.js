import React, {Component} from 'react';
import {Grid, Row, Col, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import _ from 'lodash';
import {Link} from 'react-router';
import axios from 'axios';
import {reduxForm, Field, reset} from 'redux-form';
import GoogleMap from './googleMap';

// const ROOT_URL = 'https://actio-backend.herokuapp.com';
const ROOT_URL = 'http://localhost:8080';

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
   return axios.get(`${ROOT_URL}/api/events/${eventInfo.id}/messages`).then(response =>{
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
          <tr className="owner_info" key={users.last_name}>
            <td>
              <img src={users.profile_pic}></img>
            </td>
            <td>
              <h4><strong>  {users.first_name} {users.last_name}</strong></h4>
            </td>
          </tr>
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

 leaveE(id){
   console.log('leaving event');
 }

  renderButtons(){
    if (this.checkUserStatus() === true) {
      return (
        <button className='card-link btnMain pull-left' onClick={this.leaveE.bind(this)}>Leave Event</button>
      )
    } else {
      return (
        <button className='card-link btnMain pull-right' onClick={this.joinE.bind(this)}>Join Event</button>
      )
    }
  }

  deleteE(id) {
    console.log('deleting event')
    this.props.deleteEvent(this.props.eventId);
  }

  renderEditDelete(){
    if (this.props.eventOwner === this.props.id){
      return(
        <div className='row'>
          <div className='col-md-6'>
             <div className='btnMain'><Link to={`/events/${this.props.eventId}`}>Edit Event</Link></div>
          </div>
          <div className='col-md-6'>
             <button className='btnMain pull-right' onClick={this.deleteE.bind(this)}>Delete</button>
          </div>
        </div>

      )
    }
  }

  render() {
   const {handleClick, handleSubmit} = this.props
    return (
      <div className="row">
        <div className='eventCardContainer'>
          <div className={`card ${this.props.cardClass}`}>
            <div className='row'>
              <div className='col-md-5'>
                 <img className="img-responsive allEventPic float-left" src={this.props.eventPic} alt="Card image cap" />
              </div>
              <div className='col-md-7'>
                  <h4 className=" card-title text-center">{this.props.eventTitle}</h4>
                  <p className="card-text text-center">{this.props.eventDesc}</p>
                  <div className='row'>
                    <ul className="list-inline">
                      <li className="list-inline-item"><img src={this.props.icon} className="img-responsive eventCardImg" /></li>
                      <li className="list-inline-item">At: <strong>{this.props.eventLocation}</strong></li>
                      <li className="list-inline-item">On: <strong>{this.props.eventDate}</strong></li>
                    </ul>
                  </div>
              </div>
            </div>
            <div className="card-block btnRow" style={{paddingTop: "-20px"}}>
              <button className='card-link btnMain' onClick={this.handleModalClick.bind(this)}>See More</button>
              {this.renderButtons()}
              {this.renderEditDelete()}
            </div>
          </div>
          <Modal bsSize="large" show={this.state.showModal} dialogClassName="custom-modal">
            <Modal.Header>
              <div className="modal_cover">
                <div className="cover_container">
                  <div className="cover_transparency"></div>
                  <div className="modal_cover_img" style={{backgroundImage:'url('+this.props.eventPic+')'}}></div>
                  <div className="event_title">
                    <h3 >{this.props.eventTitle}</h3>
                  </div>
                </div>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className='row'>
                  <div className='col-md-4'>
                    <h2 className='text-center'>Event Info</h2>
                    <div className="event_col">
                      <h4>Created By</h4>
                      <div className="owner_info">
                        <h4><img src={this.state.eventOwner.pic}></img><strong>{this.state.eventOwner.name}</strong></h4>
                      </div>
                      <h4> Category:</h4>
                      <h4><img src={this.props.icon} style={{height:'85px', width:'85px'}}/> <strong>{this.props.catName}</strong></h4>
                      <h4> Where: <strong>{this.props.eventLocation}</strong></h4>
                      <h4> When: <strong>{this.props.eventDate}</strong></h4>
                      <h4> Event Description: </h4>
                      <h2 className='text-center'>Map</h2>
                      <GoogleMap  latLngs={[{lat:this.props.eventLat,lng:this.props.eventLng,icon:this.props.icon}]}style={{marginBottom: '10px'}}center zoom={16} lat={this.props.eventLat} lng={this.props.eventLng} />
                    </div>
                  </div>
                    <div className='col-md-4 attending_col'>
                      <h2 className='text-center'>Who's Attending?</h2>
                      <table className="table table-hover">
                        <tbody>
                          {this.renderJoinedUsers()}
                        </tbody>
                      </table>
                    </div>
                    <div className='col-md-4 comment_col'>
                      <h2 className='text-center'><strong>Comments:</strong></h2>
                      <div className="row">
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                          <fieldset className="form-group">
                            <div className="col-md-9">
                              <label>Post a Comment</label>
                              <Field
                              name="body"
                              type="text"
                              component="textarea"
                              className="form-control" />
                              <button type="submit" className="btn btn-success">Comment</button>
                            </div>

                          </fieldset>
                        </form>
                      </div>
                      {this.renderMessages()}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
              {this.renderButtons()}
              <button className="btn btn-success" onClick={this.handleModalClick.bind(this)}>Close</button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>


  )
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
