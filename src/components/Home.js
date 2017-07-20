import React, {Component} from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import GoogleMap from './googleMap';
import _ from 'lodash';

class Home extends Component {
  constructor(props){
    super(props);
    console.log('this in Home constructor', this)
  }
  
  componentWillMount() {
    this.props.getAllEvents();
  }
  
  renderAllEvents() {
    return _.map(this.props.allEvents, events => {
      return (
        <div className="card" key={events.name}>
          <img className="card-img-top img-responsive" src={events.event_pic} alt="Card image cap" style={{alignSelf: 'center'}}/>
          <div className="card-block">
            {/* <div className='row'>
              <div className="col-md-4">
                
                <div className='row'>
                  
                </div>
                <div className='row'>
                  
                </div>
                <div className='row'>
                  Participants: 0/10
                </div>
              </div>
              <div className="col-md-6">
                
              </div>
            </div> */}
            <h4 className="card-title">{events.name}</h4>
            <p className="card-text">{events.description}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{events.title}</li>
            <li className="list-group-item">{events.location}</li>
            <li className="list-group-item">{events.event_date}</li>
            <li className="list-group-item">Particpants</li>
          </ul>
          <div className="card-block">
            <a href="#" className="card-link">Card link</a>
            <a href="#" className="card-link">Another link</a>
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
    allEvents: state.allEvents
  })
}

export default connect(mapStateToProps, actions)(Home);