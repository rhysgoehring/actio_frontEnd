import {GET_EVENT} from '../actions/types';

export default function(state={}, action) {
  switch (action.type) {
    case GET_EVENT:
       return action.payload
  }
    
  return state;
}
