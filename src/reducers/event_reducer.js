import {GET_ALL_EVENTS, GET_OWNED_EVENTS} from '../actions/types';
import _ from 'lodash';

export default function(state={}, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return action.payload
    case GET_OWNED_EVENTS:
      return {
        ...state,
        ownedEvents: action.payload
      }
  }
  return state;
}
