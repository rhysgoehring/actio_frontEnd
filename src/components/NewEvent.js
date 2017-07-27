import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../actions';


class NewEvent extends Component {
 
  
  render() {
     const {handleSubmit, fields: {title, date, category, picUrl, usersNeeded}} = this.props
    return(
      <div className='container'>
        <header>
          <h2 className='text-center'>{this.props.firstName}'s New Event</h2>
        </header>
         <div className='container'>
           <form>
             <div className="row">
               <fieldset className="form-group col-md-6">
                 <label>Event Title: </label>
                 <Field
                   name="title"
                   type="text"
                   component="input"
                   className="form-control" />
               </fieldset>
               <fieldset className="form-group col-md-3">
                 <label>Event Date: </label>
                 <Field
                   name="date"
                   type="text"
                   component="input"
                   className="form-control" />
               </fieldset>
               <fieldset className="form-group col-md-3">
                 <label>Category: </label>
                 <Field
                   name="category"
                   type="select"
                   component="select"
                   className="form-control">
                     <option></option>
                     <option value="basketball">Basketball</option>
                     <option value="hiking">Hiking</option>
                     <option value="swimming">Swimming</option>
                     <option value="climbing">Climbing</option>
                     <option value="soccer">Soccer</option>
                     <option value="golfing">Golfing</option>
                   </Field>
               </fieldset>
             </div>
             <div className='row'>
               <div className='col-md-6'>
                 <fieldset className="form-group">
                   <label>Event Picture URL: </label>
                   <Field
                     name="picUrl"
                     type="text"
                     component="input"
                     className="form-control" />
                 </fieldset>
                 <fieldset className="form-group col-md-6">
                   <label>Participants Needed: </label>
                   <Field
                     name="usersNeeded"
                     type="select"
                     component="select"
                     className="form-control">
                       <option></option>
                       <option value={1}>1</option>
                       <option value={2}>2</option>
                       <option value={3}>3</option>
                       <option value={4}>4</option>
                       <option value={5}>5</option>
                       <option value={6}>6</option>
                       <option value={7}>7</option>
                       <option value={8}>8</option>
                       <option value={9}>9</option>
                       <option value={11}>11</option>
                       <option value={12}>12</option>
                       <option value={13}>13</option>
                       <option value={14}>14</option>
                     </Field>
                 </fieldset>
               </div>
             </div>
               <div className="row">
                 <div className="col-md-6">
                   <button action="submit" className="btn btn-success">Create Event</button>
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
    email: state.auth.email,
    firstName: state.auth.firstName,
    id: state.auth.id,
    lastName: state.auth.lastName,
    picUrl: state.auth.profPic,
    zip: state.auth.zip
  })
}

NewEvent = connect(mapStateToProps,actions)(NewEvent)
NewEvent= reduxForm({
  form: 'newEvent',
  fields: ['title', 'date', 'category', 'usersNeeded', 'picUrl']
})(NewEvent);

export default NewEvent;