import React, {Component} from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import _ from 'lodash';

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
          <img className="card-img-top img-responsive" src={this.props.eventPic} alt="Card image cap" style={{alignSelf: 'center'}}/>
          <div className="card-block">
            <h4 className="card-title text-center">{this.props.eventTitle}</h4>
            <p className="card-text text-center">{this.props.eventDesc}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Category: <img src={this.props.icon} style={{height:'50px', width:'50px'}} className="img-responsive" /></li>
            <li className="list-group-item">Location: {this.props.eventLocation}</li>
            <li className="list-group-item">Date: {this.props.eventDate}</li>
            <li className="list-group-item">Participants</li>
          </ul>
          <div className="card-block">
            <a href="#" className="card-link">Card link</a>
            <a href="#" className="card-link">Another link</a>
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
