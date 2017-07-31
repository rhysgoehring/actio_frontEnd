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
    this.state = {currentFilter:"SHOW_ALL"}
    this.filterEvents = this.filterEvents.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
  }

  componentDidMount() {
    this.props.getAllEvents();
    const id = this.props.id
    this.props.getUserEvents(id)


  }
  filterEvents(unfiltered){
    switch(this.state.currentFilter){
      case "SHOW_ALL":
        return unfiltered;
      case "SHOW_SOCCER":
        return this.filterByCategory(unfiltered,5);
      case "SHOW_CLIMBING":
        return this.filterByCategory(unfiltered,4);
      case "SHOW_BASKETBALL":
        return this.filterByCategory(unfiltered,1);
      case "SHOW_HIKING":
        return this.filterByCategory(unfiltered,2);
      case "SHOW_GOLF":
        return this.filterByCategory(unfiltered,6);
      case "SHOW_SWIMMING":
        return this.filterByCategory(unfiltered,3);
      default:
        return unfiltered;
    }
  }

  filterByCategory(unfiltered, id){
    return _.filter(unfiltered, (ev) =>{
      return ev.cat_id == id;
    });
  }

  changeFilter(filterText){
    this.setState({currentFilter: filterText})
  }
  renderAllEvents() {
    let filtered = this.filterEvents(this.props.allEvents)
    return _.map(filtered, events => {

      return (
        <EventCard key={events.id}
          eventId= {events.id}
          eventPic= {events.event_pic}
          eventTitle={events.name}
          eventDesc={events.description}
          icon={events.icon}
          catName={events.title}
          eventLocation={events.location}
          eventDate={events.event_date}
          eventOwner={events.owner_id}
          eventLat={parseInt(events.lat)}
          eventLng={parseInt(events.lng)}
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
          eventLat={parseInt(events.lat)}
          eventLng={parseInt(events.lng)}
        />
      )
    })
  }

  render() {
    return(
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
              {console.log('state of home before eventFilter', this.state)}
              <EventFilter filterEvents={this.changeFilter}/>
                {console.log('state of home after eventFilter', this.state)}
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
