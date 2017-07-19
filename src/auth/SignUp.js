import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import {Link} from 'react-router';

class SignUp extends Component {
  
  handleFormSubmit(values){
    console.log(values)
    this.props.signupUser(values);
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
    if (!this.refs.picUrl){
      console.log('no pic url')
    } else {
    let picUrl = this.refs.picUrl.value
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
    const {handleSubmit, showPreview, fields: { firstName, lastName, email, password, zip, profilePicUrl}} = this.props;
    
    return (
      <div className="container">
        <header>
          <h1 className="text-center">
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
                <div className="col-md-6">
                  <fieldset className="form-group">
                    <label>First Name</label>
                    <Field
                      name="firstName"
                      type="text"
                      component="input"
                      className="form-control" />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Last Name</label>
                    <Field
                      name="lastName"
                      type="text"
                      component="input"
                      className="form-control" />
                  </fieldset>
                  <br />
                  <fieldset className="form-group">
                    <label>Email</label>
                    <Field
                      name="email"
                      type="email"
                      component="input"
                      className="form-control" />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Zip Code</label>
                    <Field
                      name="zip"
                      type="text"
                      component="input"
                      className="form-control" />
                      {Field.error}
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Password</label>
                    <Field
                      name="password"
                      type="password"
                      component="input"
                      className="form-control" />
                      {Field.error}
                  </fieldset>
                  {this.renderAlert()}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <fieldset className="form-group">
                      <label>Profile Picture URL</label>
                      <Field
                        name="profilePicUrl"
                        ref = "picUrl"
                        type="url"
                        component="input"
                        className="form-control"
                        onChange={()=> this.showPreview()}/>
                    </fieldset>
                    {this.showPreview()}
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-6">
                  <button action="submit" className="btn btn-success">Sign Up</button>
                </div>
                <div className="col-md-6">
                  <Link to="/signin">Sign In</Link>
                </div>
              </div>
            </form>
          </div>
        </article>
      </div>
      
    )
  }
}


function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}
SignUp = connect(mapStateToProps, actions)(SignUp)
SignUp = reduxForm({
  form: "signUp",
  fields: ['firstName','lastName','email','password','zip', 'profilePicUrl']})(SignUp);

export default SignUp;