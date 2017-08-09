import React, {Component} from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import EventCard from './EventCard';
import _ from 'lodash';

class MyEvents extends Component {
  constructor(props){
    super();
  }

  componentDidMount() {
    // this.props.getUserEvents(this.props.id);
    this.props.getOwnedEvents(this.props.id);
    
  }

  renderOwnedEvents(){
    return _.map(this.props.userEvents.ownedEvents, events =>{
      return(
          <div className="col-md-3" key={events.name}>
            <EventCard
              eventId= {events.id}
              eventPic= {events.event_pic}
              eventTitle={events.name}
              eventDesc={events.description}
              icon={events.icon}
              eventLocation={events.location}
              eventDate={events.event_date}
              eventOwner={events.owner_id}
              eventLat={parseInt(events.lat)}
              eventLng={parseInt(events.lng)}
            />
        </div>
      )
    })
  }
  
  renderUserEvents() {
    return _.map(this.props.userEvents.myEvents, events => {
      console.log('mapped events', events);
      return (
        <div className="col-md-3" key={events.eu_id}>
          <EventCard
            eventId= {events.id}
            eventPic= {events.event_pic}
            eventTitle={events.name}
            eventDesc={events.description}
            icon={events.icon}
            eventLocation={events.location}
            eventDate={events.event_date}
            eventOwner={events.owner_id}
            eventLat={parseInt(events.lat)}
            eventLng={parseInt(events.lng)}
          />
      </div>
      )
    })
  }

  render(){
    console.log('this.props.userEvents', this.props.userEvents)
    return (
      <div>
        <div className="container">
          <hr />
          <h3 className='text-center' style={{fontFamily:'gothamReg'}}>Events You Created:</h3>
          <hr />
          <div className="row" >
            {this.renderOwnedEvents()}
          </div>
          <hr />
          <h3 className='text-center' style={{fontFamily:'gothamReg'}}>Events You're Attending:</h3>
          <hr />
          <div className="row" >
            {this.renderUserEvents()}
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state){
  return ({
    authenticated: state.auth.authenticated,
    email: state.auth.email,
    firstName: state.auth.firstName,
    id: state.auth.id,
    lastName: state.auth.lastName,
    picUrl: state.auth.profPic,
    userEvents: state.userEvents,
    zip: state.auth.zip
  })
}

export default connect(mapStateToProps, actions)(MyEvents);
