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


  handleFormSubmit(values){
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
  componentDidMount(){
    this.handleInitialize();
  }

  handleInitialize(){
    const initData = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      zip: this.props.zip,
      profilePicUrl: this.props.profilePic
    }

    this.props.initialize(initData)
  }
  render() {
    const {handleSubmit, showPreview, fields: { firstName, lastName, email, password, zip, profilePicUrl, about}} = this.props;

    return (
      <div className="container">
        <header>
          <h1 className="text-center prof_title">
            ACTIO
          </h1>
        </header>
          <div className="container">
            <form initialValues={{firstName:'hello'}}onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div className="row">
                <div className="col-md-6">
                  <fieldset className="form-group">
                    <label>First Name</label>
                    <Field
                      name="firstName"
                      type="text"
                      component="input"
                      className="form-control actField"
                      value={this.props.firstName} />
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
                    <label>Tell us About Yourself</label>
                    <Field
                      name="about"
                      type="text"
                      component="textarea"
                      className="form-control actArea" />
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
                  {this.renderAlert()}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <fieldset className="form-group actField">
                      <label>New Profile Picture URL</label>
                      <Field
                        name="profilePicUrl"
                        ref = "picUrl"
                        type="url"
                        component="input"
                        className="form-control actField"
                        // onChange={}
                        />
                    </fieldset>
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
Profile = reduxForm({
  form: "updateProfile",
  enableReinitialize : true,
  fields: ['firstName','lastName','email','password','zip', 'profilePicUrl', 'about']})(Profile);

export default Profile
