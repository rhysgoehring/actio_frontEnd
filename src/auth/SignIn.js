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
              ACTIO
            </h1>
          </header>
          <section />
          <article>
            <div className="container">
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <div className="row">
                  <fieldset className="col-md-offset-4 form-group col-md-4">
                    <label className="aut_label">Email: </label>
                    <Field
                      name="email"
                      type="text"
                      component="input"
                      className="form-control" />
                  </fieldset>
                  <fieldset className="form-group col-md-offset-4 col-md-4">
                    <label className="aut_label">Password:</label>
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
                    <div className="col-md-6 col-md-offset-5 col-xs-offset-3">
                      <button action="submit" className="btn btn-success landing_btn auth_btn">Sign In</button>
                    </div>
                    <div className="col-md-6 col-md-offset-5 col-xs-offset-3">
                      <Link className="btn btn-success landing_btn auth_btn" to="/signup">Sign Up</Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </article>
        </div>
        <div className="marketing_sec_sign_in">
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
