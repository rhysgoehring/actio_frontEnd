import React, {Component} from 'react';
import {Grid, Row, Col, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import _ from 'lodash';
import {Link} from 'react-router';
import axios from 'axios';
import {reduxForm, Field, reset} from 'redux-form';
import GoogleMap from './googleMap';

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
        console.log(users);
        return (
          <li key={users.last_name}>{users.first_name} {users.last_name}</li>
        )
      })
    )
  }

onSubmit(values) {
  console.log('this.props in onSubmit', this.props);
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
  console.log('this.state', this.state);
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
        <button className='card-link' onClick={this.leaveE.bind(this)}>Leave Event</button>
      )
    } else {
      return (
        <button className='card-link' onClick={this.joinE.bind(this)}>Join Event</button>
      )
    }
  }

  render() {
   const {handleClick, handleSubmit} = this.props
    return (
      <div className="row">
        <div className='eventCardContainer'>
          <div className="card">
            <img className="card-img-top img-responsive" src={this.props.eventPic} alt="Card image cap" style={{alignSelf: 'center', maxHeight: '500px'}}/>
            <div className="card-block">
              <h4 className="card-title text-center">{this.props.eventTitle}</h4>
              <p className="card-text text-center">{this.props.eventDesc}</p>
            </div>
            <ul className="list-inline">
              <li className="list-inline-item"><img src={this.props.icon} style={{height:'75px', width:'75px'}} className="img-responsive" /></li>
              <li className="list-inline-item">Location: <strong>{this.props.eventLocation}</strong></li>
              <li className="list-inline-item">Date: <strong>{this.props.eventDate}</strong></li>
              <li className="list-inline-item">Participants:</li>
            </ul>
            <div className="card-block">
              <button className='card-link' onClick={this.handleModalClick.bind(this)}>See More</button>
              {this.renderButtons()}
            </div>
          </div>
          <Modal bsSize="large" show={this.state.showModal} dialogClassName="custom-modal">
            <Modal.Header>
              <Modal.Title>{this.props.eventTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='row'>
                  <div className='col-md-6'>
                    <GoogleMap style={{marginBottom: '10px'}}center zoom={16} lat={this.props.eventLat} lng={this.props.eventLng} />
                  </div>
                  <div className='col-md-3'>
                    <img src={this.state.eventOwner.pic} style={{height: '250px', width: '250px', margin: 'auto'}} />
                  </div>
                  <div className='col-md-3'>
                    <h5 className='text-left'>About {this.state.eventOwner.name}: </h5>
                    <h6 className='text-left'> {this.state.eventOwner.info} </h6>
                  </div>
                </div>
              <div className='row'>
                <div className='col-md-4'>
                  <img className="img-responsive" src={this.props.eventPic} style={{alignSelf: 'center', maxHeight:'500px'}} />
                  <ul className="list-inline">
                    <li className="list-inline-item"><img src={this.props.icon} style={{height:'75px', width:'75px'}} className="img-responsive" /></li>
                    <li className="list-inline-item">Location: <strong>{this.props.eventLocation}</strong></li>
                    <li className="list-inline-item">Date: <strong>{this.props.eventDate}</strong></li>
                    <li className="list-inline-item">Participants:</li>
                  </ul>
                </div>
                <div className='col-md-4'>
                  <h4 className='text-left'>About {this.props.eventTitle}:</h4>
                  <h6 className='text-left'>{this.props.eventDesc}</h6>
                  <div className='row'>
                    <h5 className='text-center'>Who's Attending?</h5>
                    <ul>
                      {this.renderJoinedUsers()}
                    </ul>
                  </div>
                </div>
                <div className='col-md-4'>
                  <h4><strong>Comments:</strong></h4>
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
                        </div>
                        <div className="col-md-3">
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
