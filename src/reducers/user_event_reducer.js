import {GET_USER_EVENTS, GET_OWNED_EVENTS} from '../actions/types';


export default function(state = {}, action) {
  switch (action.type) {
    case GET_USER_EVENTS:
      return {
      ...state,
      myEvents: action.payload
    }
    case GET_OWNED_EVENTS:
      return {
        ...state,
        ownedEvents: action.payload
      }
    }
      return state;
}
