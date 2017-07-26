import React, {Component} from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../actions/index';


class MyEvents extends Component {
  constructor(props){
    super();
  }

  render(){
    console.log("In Render: ", this.props.id)
    return (
      <div>

      </div>
    )
  }
}


function mapStateToProps(state){
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

export default connect(mapStateToProps, actions)(MyEvents);
