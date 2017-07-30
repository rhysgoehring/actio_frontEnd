import {GET_ALL_EVENTS, CREATE_EVENT} from '../actions/types';
import _ from 'lodash';

export default function(state={}, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return action.payload
    case CREATE_EVENT:
      return {
      
        ...state.concat(action.payload)
      }
  }
    
  return state;
}
