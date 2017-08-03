import {CHANGE_CAT_FILTER, CHANGE_SKILL_FILTER} from '../actions/types';

export default function(state={}, action) {
  switch(action.type){
    case CHANGE_CAT_FILTER:
      return {...state, categoryFilter: action.filterType}
    case CHANGE_SKILL_FILTER:
      return {...state, skillFilter: action.filterType}
  }

  return state;
}
