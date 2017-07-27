import React, {Component} from 'react';
import {Grid, Row, Col, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import _ from 'lodash';
import {Link} from 'react-router';
import axios from 'axios';
import GoogleMap from './googleMap';

const ROOT_URL = 'http://localhost:8080';

class EventCard extends Component {
  constructor(props) {
    super(props);
    
    this.state = ({
      showModal: false,
      eventOwner: {name: '', pic:'',info:''}
    })
 }

 getOwnerInfo(id) {
   return axios.get(`${ROOT_URL}/api/users/${id}`).then(response => {
     const owner = {
       name: `${response.data.first_name} ${response.data.last_name}`,
       pic: response.data.profile_pic,
       info: response.data.about
     }
     return owner;
   })
   
 }
 
 handleModalClick() {
   console.log('all props in modalClick', this.props);
   if (this.state.showModal === true) {
     this.setState({
       showModal: false
     })
   } else {
   this.getOwnerInfo(this.props.eventOwner)
   .then((ownerInfo) => {
     console.log('ownerInfo', ownerInfo);
     this.setState({
       eventOwner: ownerInfo,
       showModal: true
     })
   })
 }
 }

renderOwnerInfo() {
  return (
  <div>
    <h4 className='text-center'>About {this.state.eventOwner.name}:</h4>
    <h6 className='text-center'>{this.state.eventOwner.info}</h6>
  </div>
  )
}

render() {
  const {handleClick} = this.props
  console.log('this.props in EventCard render', this.props)
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
            <a href="#" className="card-link pull-right">Another link</a>
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
              <div className='col-md-3'>
                <img className="img-responsive" src={this.props.eventPic} style={{alignSelf: 'center', maxHeight:'500px'}} />
                <ul className="list-inline">
                  <li className="list-inline-item"><img src={this.props.icon} style={{height:'75px', width:'75px'}} className="img-responsive" /></li>
                  <li className="list-inline-item">Location: <strong>{this.props.eventLocation}</strong></li>
                  <li className="list-inline-item">Date: <strong>{this.props.eventDate}</strong></li>
                  <li className="list-inline-item">Participants:</li>
                </ul>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
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

export default connect(mapStateToProps, actions)(EventCard);
