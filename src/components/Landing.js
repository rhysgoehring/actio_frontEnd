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
          <div className="col-md-6 col-sm-6 col-xs-6">
            <Link className=" btn btn-success landing_btn" to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
      <div className="marketing_sec">
        <div className="row">
          <div className="container text-center">
            <div className="col-md-4">
              <h2>col 1</h2>
              <hr />
            </div>
            <div className="col-md-4">
              <h2>col 2</h2>
              <hr />
            </div>
            <div className="col-md-4">
              <h2>col 3</h2>
              <hr />
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Landing;
