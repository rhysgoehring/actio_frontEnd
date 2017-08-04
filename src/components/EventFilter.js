import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import {DropdownButton, MenuItem} from 'react-bootstrap';
class EventFilter extends Component {
  constructor(props){
    super();
    this.selectCategory = this.selectCategory.bind(this);
    this.selectSkillLevel = this.selectSkillLevel.bind(this);
  }

  selectCategory(eventKey){
    this.props.changeCatFilter(eventKey);
  }

  selectSkillLevel(eventKey){
    console.log('here');
    this.props.changeSkillFilter(eventKey);
  }
  render(){
    return (
      <div className='row filterRow'>
        <div className='col-md-4 col-sm-4 col-xs-4'>
          <h5>Filter Events By:</h5>
        </div>
        <div className='col-md-4 col-sm-4 col-xs-4'>
          <DropdownButton title="Category" id="bg-nested-dropdown">
            <MenuItem eventKey="SHOW_ALL" onSelect={this.selectCategory}>Show All</MenuItem>
            <MenuItem eventKey="SHOW_SOCCER" onSelect={this.selectCategory}>Soccer</MenuItem>
            <MenuItem eventKey="SHOW_HIKING" onSelect={this.selectCategory}>Hiking</MenuItem>
            <MenuItem eventKey="SHOW_SWIMMING" onSelect={this.selectCategory}>Swimming</MenuItem>
            <MenuItem eventKey="SHOW_CLIMBING" onSelect={this.selectCategory}>Climbing</MenuItem>
            <MenuItem eventKey="SHOW_GOLF" onSelect={this.selectCategory}>Golfing</MenuItem>
          </DropdownButton>
        </div>
        <div className='col-md-4 col-sm-4 col-xs-4'>
          <DropdownButton title="Skill Level" id="bg-nested-dropdown">
            <MenuItem eventKey="0" onSelect={this.selectSkillLevel}>Show All</MenuItem>
            <MenuItem eventKey="1" onSelect={this.selectSkillLevel}>Beginner</MenuItem>
            <MenuItem eventKey="2" onSelect={this.selectSkillLevel}>Advanced</MenuItem>
            <MenuItem eventKey="3" onSelect={this.selectSkillLevel}>Master</MenuItem>
          </DropdownButton>
        </div>
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
