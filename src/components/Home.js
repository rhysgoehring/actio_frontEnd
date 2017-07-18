import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

class Home extends Component {
  constructor(props){
    super(props);
  }
  
  componentDidMount() {
    console.log('this.props', this.props)
  }
  
  
  render() {
    return(
      <Grid>
        <Col md={3}>
            <Row>
              
            </Row>
        </Col>
        <Col md={9}>
          
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
    zip: state.auth.zip
  })
}

export default connect(mapStateToProps, actions)(Home);