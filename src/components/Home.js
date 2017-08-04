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
    this.props.getUserEvents(id);


  }

  renderAllEvents() {
    return _.map(this.props.viewableEvents, events => {
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
          eventLat={events.lat}
          eventLng={events.lng}
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
          eventLat={events.lat}
          eventLng={events.lng}
        />
      )
    })
  }

  render() {
    console.log('The props of home', this.props)
    return (
      <div className='homeBody'>
        <Grid>
          <Col md={3} smHidden xsHidden>
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
              <GoogleMap markerData={this.props.markerData}center id='homeMap' zoom={10} lat={40.014984} lng={-105.270546} />
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
      </div>

    )
  }
}

function createViewable(events, skillFilter, categoryFilter){
  let catagorized = applyCategoryFitler(events, categoryFilter);
  return applySkillFilter(catagorized, skillFilter);
}

function applyCategoryFitler(events, filter){
  switch(filter){
    case 'SHOW_ALL':
      return events;
    case 'SHOW_BASKETBALL':
      return filterByCategory(events, 1)
    case 'SHOW_HIKING':
      return filterByCategory(events, 2)
    case 'SHOW_SWIMMING':
      return filterByCategory(events, 3)
    case 'SHOW_CLIMBING':
      return filterByCategory(events, 4)
    case 'SHOW_SOCCER':
      return filterByCategory(events, 5)
    case 'SHOW_GOLF':
      return filterByCategory(events, 6)
    default:
      return events;
  }
}

function applySkillFilter(events, filter){
  switch(filter){
    case '0':
      return events;
    case'1':
      return filterBySkill(events, 'beginner');
    case'2':
      return filterBySkill(events,'advanced');
    case'3':
      return filterBySkill(events,'master');
    default:
      return events;
  }
}

function getMapMarkerData(events){
  return _.map(events, (ev) =>{
    return {lat:parseFloat(ev.lat), lng:parseFloat(ev.lng),icon:ev.icon}
  })
}

function filterByCategory(unfiltered, id){
  return _.filter(unfiltered, (ev) =>{
    return ev.cat_id == id;
  })
}

function filterBySkill(unfiltered, id){
  return _.filter(unfiltered, (ev) =>{
    console.log("the skill level!", ev.skill_level)
    return ev.skill_level == id;
  })
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
    viewableEvents: createViewable(state.allEvents, state.filters.skillFilter, state.filters.categoryFilter),
    markerData: getMapMarkerData(createViewable(state.allEvents,state.filters.skillFilter ,  state.filters.categoryFilter)),
    userEvents: state.userEvents,
    skillFilter: 'SHOW_ALL',
    categoryFilter: 'SHOW_ALL'
  })
}



export default connect(mapStateToProps, actions)(Home);
