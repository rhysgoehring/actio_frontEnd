import React, {Component} from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

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
            <Row>
              <img className="profPicHome img-responsive" src={this.props.picUrl} />
            </Row>
            <Row>
              <h3 className="text-left">{this.props.firstName}'s Events</h3>
            </Row>
        </Col>
        <Col md={9}>
          <Row>
            <h1 className="text-center">All Events</h1>
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