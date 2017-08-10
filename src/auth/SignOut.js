import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import {Link} from 'react-router';

class SignOut extends Component {
  componentWillMount(){
    this.props.signOutUser();

  }
  render(){
    return (
      <div className="landing_main">
        <div className="container" style={{alignContent: 'center'}}>
          <h1 className="text-center main_title">ACTIO</h1>
          <p className="text-center" style={{fontFamily: 'gothamReg'}}>Sorry to see you go</p>
          <div className="row">
            <div className="col-md-6">
              <Link className="btn auth_btn pull-right" to="/signin">Sign In</Link>
            </div>
            <div className="col-md-6">
              <Link className="btn auth_btn" to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(SignOut);
