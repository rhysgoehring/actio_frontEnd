import React, {Component} from 'react';
import {Field, reduxForm, initialize} from 'redux-form';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import * as actions from '../actions';
import axios from 'axios';


const ROOT_URL = 'https://actio-backend.herokuapp.com';
// const ROOT_URL= 'http://localhost:8080'

class EditEventForm extends Component {

 handleFormSubmit(values) {
   let newEvent= {
     name : this.refs.name.value,
     cat_id : this.refs.cat_id.value,
     location : this.props.locationValue,
     event_date : this.refs.event_date.value,
     description : this.refs.description.value,
     owner_id : this.props.id,
     skill_level : this.refs.skill_level.value,
     event_pic : this.refs.event_pic.value,
     lat: this.props.lat,
     lng: this.props.lng
   }
   
   axios.patch(`${ROOT_URL}/api/events/${this.props.editId}`, newEvent)
   .then(response => {
     if (response.statusText === 'OK') {
       this.props.getAllEvents().then(() => {
         this.props.getUserEvents(this.props.id).then(() =>{
           browserHistory.push('/home')
         })
       })
     }
   })
   }

   componentDidMount(){
     this.initializeForm();
   }

   initializeForm(){
     if(this.props.selectedEvent){
      
       const initData = {
          'name': this.props.selectedEvent.name,
          'event_date': this.props.selectedEvent.event_date,
          'cat_id':this.props.selectedEvent.cat_id,
          'location':this.props.selectedEvent.location,
          'event_pic':this.props.selectedEvent.event_pic,
          'skill_level':this.props.selectedEvent.skill_level,
          'description':this.props.selectedEvent.description
        }
       this.props.initialize(initData)
     }
   }
  render() {
     const {handleSubmit} = this.props
    return(
      <div className='container newEventForm'>
        <header>
          <h2 className='text-center'><strong>{this.props.selectedEvent.name}</strong></h2>
        </header>
         <form className='center-block' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
           <div className="row">
             <fieldset className="form-group col-md-6">
               <label>Event Title: </label>
               <Field
                 ref="name"
                 name="name"
                 type="text"
                 component="input"
                 className="form-control actField"
                 style={{color:'black'}}
                  />
             </fieldset>
             <fieldset className="form-group col-md-3">
               <label>Event Date: </label>
               <Field
                 ref="event_date"
                 name="event_date"
                 type="text"
                 component="input"
                 style={{color:'black'}}
                 className="form-control actField" />
             </fieldset>
             <fieldset className="form-group col-md-3">
               <label>Category: </label>
               <Field
                 ref="cat_id"
                 name="cat_id"
                 style={{color:'black'}}
                 type="select"
                 component="select"
                 className="form-control actSelect">
                   <option></option>
                   <option value={1}>Basketball</option>
                   <option value={2}>Hiking</option>
                   <option value={3}>Swimming</option>
                   <option value={4}>Climbing</option>
                   <option value={5}>Soccer</option>
                   <option value={6}>Golfing</option>
                 </Field>
             </fieldset>
           </div>
           <div className='row'>
               <fieldset className="form-group col-md-6">
                 <label>Event Picture URL: </label>
                 <Field
                   ref="event_pic"
                   name="event_pic"
                   type="text"
                   component="input"
                   style={{color:'black'}}
                   className="form-control actField" />
               </fieldset>

             </div>
             <div className='row'>
               <fieldset className="form-group col-md-6">
                 <label>Skill Level: </label>
                 <Field
                   ref="skill_level"
                   name="skill_level"
                   type="select"
                   style={{color:'black'}}
                   component="select"
                   className="form-control actSelect">
                     <option></option>
                     <option value="beginner">Beginner</option>
                     <option value="advanced">Advanced</option>
                     <option value="master">Master</option>
                   </Field>
               </fieldset>
               <fieldset className="form-group col-md-6">
                 <label>Description: </label>
                 <Field
                   ref="description"
                   name="description"
                   type="textarea"
                   style={{color:'black'}}
                   component="input"
                   className="form-control actField" />
               </fieldset>
           </div>
           <div className='row'>
             <div className="col-md-2">
               <button action="submit" className="btn newBtn">Edit Event</button>
             </div>
           </div>
         </form>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return ({
    authenticated: state.auth.authenticated,
    email: state.auth.email,
    firstName: state.auth.firstName,
    id: state.auth.id,
    lastName: state.auth.lastName,
    picUrl: state.auth.profPic,
    zip: state.auth.zip,
    selectedEvent: state.allEvents.selectedEvent
  })
}

EditEventForm = connect(mapStateToProps,actions)(EditEventForm)
EditEventForm = reduxForm({
  form: 'editEvent',
  enableReinitialize : true,
  fields: ['name', 'event_date', 'cat_id', 'location', 'event_pic', 'skill_level', 'description']
})(EditEventForm);

export default EditEventForm;
