import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import {reducer as formReducer}  from 'redux-form';


const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer
});

export default rootReducer;