import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import * as actions from '../actions/index';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class SignIn extends Component {

  handleFormSubmit({email, password}) {
    this.props.signinUser({email, password})
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const {handleSubmit, fields: {email, password}} = this.props

    return (
      <div className="landing_main">
        <div className="container">
          <header>
            <h1 className ="text-center main_title">
              A C T I O
            </h1>
          </header>
          <section />
          <div className='center-block'>
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <div className="row authBox">
                  <fieldset className="form-group col-md-3 col-md-offset-4">
                    <Field
                      name="email"
                      type="text"
                      component="input"
                      className="form-control actField"
                      placeholder='Enter Your Email Address'/>
                  </fieldset>
                </div>
                <div className='row authBox'>
                  <fieldset className="form-group col-md-3 col-md-offset-4">
                    <Field
                      name="password"
                      type="password"
                      component="input"
                      className="form-control actField"
                      placeholder="Enter Your Password"
                      />
                  </fieldset>
                  {this.renderAlert()}
                </div>
                  <div className="row">
                    <div className="col-md-6">
                      <button action="submit" className="btn pull-right auth_btn">Sign In</button>
                    </div>
                    <div className="col-md-6">
                      <Link className="btn auth_btn" to="/signup">Sign Up</Link>
                    </div>
                  </div>
              </form>
          </div>
        </div>
        
        </div>
      
    )
  }
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error};
}

SignIn = connect(mapStateToProps, actions)(SignIn)
SignIn = reduxForm({
  form: "signIn",
  fields: ['email',
  'password']}
)(SignIn);

export default SignIn;
