import React, {Component} from 'react';
import {Link} from 'react-router';


class Landing extends Component {
  render() {
    return (
      <div className="landing_main">
      <div className="container">
        <h1 className="text-center main_title">ACTIO</h1>
        <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-6">
            <Link className=" btn btn-success pull-right landing_btn" to="/signin">Sign In</Link>
          </div>
          <div className="col-md-6 col-sm-6">
            <Link className=" btn btn-success landing_btn" to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Landing;
