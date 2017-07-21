import React, {Component} from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import GoogleMap from './googleMap';
import _ from 'lodash';

class Home extends Component {
  constructor(props){
    super(props);
  
  console.log('this in constructor', this)
  }
  
  componentDidMount() {
    this.props.getAllEvents();
    const id = this.props.id
    this.props.getUserEvents(id)
      
    
  }
  
  renderAllEvents() {
    return _.map(this.props.allEvents, events => {
      return (
        <div className="row" key={events.name}>
          <div className='eventCardContainer'>
            <div className="card" key={events.name}>
              <img className="card-img-top img-responsive" src={events.event_pic} alt="Card image cap" style={{alignSelf: 'center'}}/>
              <div className="card-block">
                <h4 className="card-title text-center">{events.name}</h4>
                <p className="card-text text-center">{events.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Category: <img src={events.icon} style={{height:'50px', width:'50px'}} className="img-responsive" /></li>
                <li className="list-group-item">Location: {events.location}</li>
                <li className="list-group-item">Date: {events.event_date}</li>
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
    })
  }
 
  
  render() {
    console.log('propsin render on Home', this.props)
    return(
      <Grid>
        <Col md={3}>
            <Row className='profPicRow'>
              <img className="profPicHome img-responsive" src={this.props.picUrl} />
            </Row>
            <Row>
              <h4 className="text-left">{this.props.firstName}'s Events</h4>
            </Row>
        </Col>
        <Col md={9}>
          <Row className='center-block mainMap'>
            <GoogleMap center id='homeMap' lat={40.014984} lng={-105.270546} />
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