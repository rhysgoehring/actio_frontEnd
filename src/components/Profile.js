import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import {Link} from 'react-router';

class Profile extends Component {
  
  constructor(props){
    super(props);
    console.log('this.props.profilePic', this.props.profilePic)
    this.state = {
      imgUrl: this.props.profilePic
    }
  }
  
  handleSubmit(values){
    console.log(values)

  }
  
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  
  showPreview() {
    if (!this.state.imgUrl){
      console.log('no pic url')
    } else {
    let picUrl = this.state.imgUrl
    return (
          <img src={picUrl}
            style={{
              width: "200px",
              height: "200px",
              alignContent: "center"
            }} />
    )
    }
  }
  render() {
    const { showPreview} = this.props;
    
    return (
      <div className="container">
        <header>
          <h1 className="text-center prof_title">
            ACTIO
          </h1>
        </header>
          <div className="container">
            <form onSubmit={this.handleSubmit()}>
              <div className="row">
                <div className="col-md-6">
                  <div className="input-group">
                    <input type='text' ref='firstName' className='form-control actField' />
                  </div>
                  <div className="input-group">
                    <input type='text' ref='lastName' className='form-control actField' />
                  </div>
                  <br />
                  <div className="input-group">
                    <input type='text' ref='email' className='form-control actField' />
                  </div>
                  <div className="input-group">
                    <input type='textarea' ref='info' className='form-control actArea' />
                  </div>
                  <div className="input-group">
                    <input type='text' ref='zip' className='form-control actField' />
                  </div>
                  {this.renderAlert()}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group">
                      <input type='text' ref='url' className='form-control actField' />
                    </div>
                    {this.showPreview()}
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-6">
                  <button action="submit" className="btn newBtn">Update Profile</button>
                </div>
                <div className="col-md-6">
                  <Link className='btn newBtn' style={{textDecoration: 'none', color: 'black'}} to="/home">Back to Home</Link>
                </div>
              </div>
            </form>
          </div>
       
      </div>
      
    )
  }
}

function mapStateToProps(state) {
  return ({
    authenticated: state.auth.authenticated,
    userId: state.auth.id,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    profilePic: state.auth.profPic,
    email: state.auth.email,
    zip: state.auth.zip,
    errorMessage: state.auth.error
  })
}

Profile = connect(mapStateToProps, actions)(Profile)

export default Profile