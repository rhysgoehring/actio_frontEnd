import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import {DropdownButton, MenuItem} from 'react-bootstrap';
class EventFilter extends Component {
  render(){
    return (
      <div className="event_filter text-center">
      <h3>Filter By: </h3>
      <DropdownButton title="Category" id="bg-nested-dropdown">
        <MenuItem eventKey="1">Soccer</MenuItem>
        <MenuItem eventKey="2">Hiking</MenuItem>
        <MenuItem eventKey="2">Swimming</MenuItem>
        <MenuItem eventKey="2">Climbing</MenuItem>
        <MenuItem eventKey="2">Golfing</MenuItem>
      </DropdownButton>
      <DropdownButton title="Skill Level" id="bg-nested-dropdown">
        <MenuItem eventKey="1">Easy</MenuItem>
        <MenuItem eventKey="2">Medium</MenuItem>
        <MenuItem eventKey="2">Hard</MenuItem>
      </DropdownButton>
      </div>
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

export default connect(mapStateToProps, actions)(EventFilter);
