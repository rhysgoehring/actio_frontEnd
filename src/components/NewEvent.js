import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router';
import GoogleMap from './googleMap';
import * as actions from '../actions';

class NewEvent extends Component {
  render() {
    console.log('this.props', this.props)
    return (
      <div className="container">
        <h1 className='text-center'>New Event</h1>
        <div className='row'>
          <div className='col-md-6'>
            <GoogleMap
             center id='eventMap' zoom={12} lat={40.014984} lng={-105.270546}
            />
          </div>
          <div className='col-md-6'>
            
          </div>
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
    zip: state.auth.zip
  })
}

export default connect(mapStateToProps, actions)(NewEvent);