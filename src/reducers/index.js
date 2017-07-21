import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import {reducer as formReducer}  from 'redux-form';
import eventReducer from './event_reducer';
import userEventReducer from './user_event_reducer';


const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  allEvents: eventReducer,
  userEvents: userEventReducer
});

export default rootReducer;