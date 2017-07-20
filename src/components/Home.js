import React, {Component} from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import GoogleMap from './googleMap';

class Home extends Component {
  constructor(props){
    super(props);
    console.log('this in Home constructor', this)
  }
  
  componentDidMount() {
    this.props.getAllEvents();
  }
  
  // renderAllEvents(){
  //   this.props.allEvents.map(event, id => {
  //
  //   })
  // }
  
  render() {
    console.log('prof pic in render on Home', this.props.picUrl)
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