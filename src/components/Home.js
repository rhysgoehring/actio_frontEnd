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
    this.state = {categoryFilter:"SHOW_ALL", skillFilter:0}
    this.filterByCategory = this.filterByCategory.bind(this);
    this.filterBySkillLevel = this.filterBySkillLevel.bind(this);
    this.changeCategoryFilterState = this.changeCategoryFilterState.bind(this);
    this.changeSkillFilterState = this.changeSkillFilterState.bind(this);
  }

  componentDidMount() {
    this.props.getAllEvents();
    const id = this.props.id
    this.props.getUserEvents(id)


  }
  filterByCategory(unfiltered){
    switch(this.state.categoryFilter){
      case "SHOW_ALL":
        return unfiltered;
      case "SHOW_SOCCER":
        return this.applyCategoryFilter(unfiltered,5);
      case "SHOW_CLIMBING":
        return this.applyCategoryFilter(unfiltered,4);
      case "SHOW_BASKETBALL":
        return this.applyCategoryFilter(unfiltered,1);
      case "SHOW_HIKING":
        return this.applyCategoryFilter(unfiltered,2);
      case "SHOW_GOLF":
        return this.applyCategoryFilter(unfiltered,6);
      case "SHOW_SWIMMING":
        return this.applyCategoryFilter(unfiltered,3);
      default:
        return unfiltered;
    }
  }

  filterBySkillLevel(unfiltered){
    switch (this.state.skillFilter) {
      case '0':
        return unfiltered;
      case '1':
        return this.applySkillFilter(unfiltered, 'beginner')
      case '2':
        return this.applySkillFilter(unfiltered, 'advanced')
      case '3':
        return this.applySkillFilter(unfiltered, 'expert')
      default:
        return unfiltered;
    }
  }

  applyCategoryFilter(unfiltered, id){
    return _.filter(unfiltered, (ev) =>{
      return ev.cat_id == id;
    });
  }

  applySkillFilter(unfiltered, skillLevel){
    return _.filter(unfiltered, ev =>{
      console.log("event about to be filtered", ev)
      return ev.skill_level == skillLevel;
    })
  }

  changeCategoryFilterState(filterText){
    this.setState({categoryFilter: filterText})
  }

  changeSkillFilterState(filterText){
    this.setState({skillFilter: filterText})
  }
  renderAllEvents() {
    let filtered = this.filterByCategory(this.props.allEvents)
    let moreFiltered = this.filterBySkillLevel(filtered);
    console.log(moreFiltered)
    return _.map(moreFiltered, events => {

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
          cardClass='actCard'
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
              <EventFilter changeCategory={this.changeCategoryFilterState} changeSkill={this.changeSkillFilterState}/>
                {console.log('state of home after eventFilter', this.state)}
          </Row>
          <Row className='center-block'>
            <h4 className='text-center'>All Events</h4>
              {console.log("Rendering events")}
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
