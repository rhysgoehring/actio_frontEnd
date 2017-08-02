import React, {Component} from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import GoogleMap from './googleMap';
import _ from 'lodash';
import EventCard from './EventCard';
import EventFilter from './EventFilter';



class Home extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.getAllEvents();
    const id = this.props.id
    this.props.getUserEvents(id)

  }

  renderAllEvents() {
    return _.map(this.props.allEvents, events => {
      return (
        <EventCard key={events.id}
          eventType="all"
          eventId= {events.id}
          eventPic= {events.event_pic}
          eventTitle={events.name}
          eventDesc={events.description}
          icon={events.icon}
          catName={events.title}
          eventLocation={events.location}
          eventDate={events.event_date}
          eventOwner={events.owner_id}
        />
      )
    })
  }

  renderUserEvents() {
    return _.map(this.props.userEvents, events => {
      return (
        <EventCard key={events.eu_id}
          eventId = {events.id}
          eventPic= {events.event_pic}
          eventTitle={events.name}
          eventDesc={events.description}
          icon={events.icon}
          catName={events.title}
          eventLocation={events.location}
          eventDate={events.event_date}
          eventOwner={events.owner_id}
        />
      )
    })
  }

  render() {
    return (
      <Grid>
        <Col md={3}>
            <Row className='profPicRow'>
              <img className="profPicHome img-responsive" src={this.props.picUrl} />
            </Row>
            <Row>
              <h4 className="text-left">{this.props.firstName}'s Events</h4>
              {this.renderUserEvents()}
            </Row>
        </Col>
        <Col md={9}>
          <Row className='center-block mainMap'>
            <GoogleMap center id='homeMap' zoom={10} lat={40.014984} lng={-105.270546} />
          </Row>
          <Row className="center-block">
              <EventFilter />
          </Row>
          <Row className='center-block'>
            <h4 className='text-center'>All Events</h4>
              {this.renderAllEvents()}
          </Row>
        </Col>
      </Grid>
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



export default connect(mapStateToProps, actions)(Home);
