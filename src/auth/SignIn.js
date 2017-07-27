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
      <div>
        <div className="container">
          <header>
            <h1 className ="text-center">
              ACTIO
            </h1>
          </header>
          <section />
          <br />
          <br />
          <article>
            <div className="container">
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <div className="row">
                  <fieldset className="form-group col-md-6">
                    <label>Email: </label>
                    <Field
                      name="email"
                      type="text"
                      component="input"
                      className="form-control" />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Password:</label>
                    <Field
                      name="password"
                      type="password"
                      component="input"
                      className="form-control" />
                  </fieldset>
                  {this.renderAlert()}
                </div>
                <div className="row">
                  <div className="col-md-6">
     
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <button action="submit" className="btn btn-success">Sign In</button>
                    </div>
                    <div className="col-md-6">
                      <Link className="btn btn-success" to="/signup">Sign Up</Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </article>
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