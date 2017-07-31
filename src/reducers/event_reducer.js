import {GET_ALL_EVENTS, CREATE_EVENT, GET_EVENT} from '../actions/types';
import _ from 'lodash';

export default function(state={}, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return action.payload
    case GET_EVENT:
       return { ...state, selectedEvent: action.payload}
    case CREATE_EVENT:
      return [...state, action.payload]
      
  }
    
  return state;
}
