import React, {Component} from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import _ from 'lodash';
import {Link} from 'react-router';

class EventCard extends Component {
  constructor(props) {
    super(props);
    console.log('this in EventCard constructor', this)
  }


render() {
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
            <button className='card-link'>See More</button>
            <a href="#" className="card-link pull-right">Another link</a>
          </div>
        </div>
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
