import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import {Link} from 'react-router';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      imgUrl: this.props.profilePic
    }
  }
  
  handleChange = () => {
    console.log('this.refs.picUrl', this.refs.picUrl);
    this.setState({
      imgUrl: this.refs.picUrl.value
    })
  }
  
  handleFormSubmit(values){
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
    const {handleSubmit} = this.props;

    return (
      <div>
        <div className="container">
          <header>
            <h1 className="text-center main_title">
              A C T I O
            </h1>
          </header>
          <section />
          <br />
          <br />
        
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
                        className="form-control actField" />
                    </fieldset>
                    <fieldset className="form-group">
                      <label>Last Name</label>
                      <Field
                        name="lastName"
                        type="text"
                        component="input"
                        className="form-control actField" />
                    </fieldset>
                    <br />
                    <fieldset className="form-group">
                      <label>Email</label>
                      <Field
                        name="email"
                        type="email"
                        component="input"
                        className="form-control actField" />
                    </fieldset>
                    <fieldset className="form-group">
                      <label>Zip Code</label>
                      <Field
                        name="zip"
                        type="text"
                        component="input"
                        className="form-control actField" />
                        {Field.error}
                    </fieldset>
                    <fieldset className="form-group">
                      <label>Password</label>
                      <Field
                        name="password"
                        type="password"
                        component="input"
                        className="form-control actField" />
                        {Field.error}
                    </fieldset>
                    {this.renderAlert()}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <fieldset className="form-group">
                        <label>Profile Picture URL (click below input to see preview)</label>
                        <Field
                          name="profilePicUrl"
                          ref = "picUrl"
                          type="url"
                          component="input"
                          className="form-control actField"
                          onBlur={()=> this.handleChange()}/>
                      </fieldset>
                      {this.showPreview()}
                    </div>
                  </div>
                </div>
                <br />
                <div className="row authBtnRow">
                  <div className="col-md-6">
                    <button action="submit" style={{color:'black'}} className="btn auth_btn">Sign Up</button>
                  </div>
                  <div className="col-md-6">
                    <Link style={{textDecoration: 'none', color: 'black'}} className="btn auth_btn" to="/signin">Sign In</Link>
                  </div>
                </div>
              </form>
            </div>
        </div>
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
