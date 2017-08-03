import React, {Component} from 'react';
import {Link} from 'react-router';


class Landing extends Component {
  render() {
    return (
      <div className="landing_main">
        <div className="container">
          <div className='logoBox'>
            <h1 className="text-center main_title">A C T I O</h1>
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-6">
                <Link className="btn btn-success pull-right landing_btn" to="/signin">Sign In</Link>
              </div>
              <div className="col-md-6 col-sm-6 col-xs-6">
                <Link className="btn btn-success landing_btn pull-left" to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="marketing_sec">
          <div className="row">
            <div className="container text-center">
              <div className="col-md-4">
                <h2>Discover</h2>
                <hr />
              </div>
              <div className="col-md-4">
                <h2>Learn</h2>
                <hr />
              </div>
              <div className="col-md-4">
                <h2>Get Active</h2>
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
