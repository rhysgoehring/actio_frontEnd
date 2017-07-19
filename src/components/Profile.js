import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Profile extends Component {
  render() {
    return (
      <h1 className='text-center'></h1>
    )
  }
}

function mapStateToProps(state) {
  return ({
    authenticated: state.auth.authenticated,
    userId: state.auth.id,
    firstName: state.auth.firstName,
    profilePic: state.auth.profilePic,
    email: state.auth.email,
    zip: state.auth.zip
  })
}

Profile = connect(mapStateToProps, null)(Profile)
export default Profile