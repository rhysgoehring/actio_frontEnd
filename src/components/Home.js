import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
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
    console.log('this.props in render on Home', this.props)
    return(
      <Grid>
        <Col md={3}>
            <Row >
              <header>
                <h1 className="text-center">{this.props.firstName}'s Events</h1>
              </header>
            </Row>
        </Col>
        <Col md={9}>
          <Row>
            <header>
              <h1 className="text-center">All Events</h1>
            </header>
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