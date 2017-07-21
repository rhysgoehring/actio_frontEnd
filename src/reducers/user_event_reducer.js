import _ from 'lodash';
import {GET_USER_EVENTS} from '../actions/types';


export default function(state = {}, action) {
  switch (action.type) {
    case GET_USER_EVENTS:
      return action.payload;
   }
      return state;
}
