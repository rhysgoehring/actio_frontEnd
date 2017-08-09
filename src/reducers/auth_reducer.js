import {AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        error: '',
        authenticated: true,
        email: action.payload.email,
        firstName: action.payload.first_name,
        id: action.payload.id,
        lastName: action.payload.last_name,
        zip: action.payload.zip,
        profPic: action.payload.profile_pic,
        about: action.payload.about || null

      };
    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        email: null,
        firstName: null,
        id: null,
        lastName: null,
        zip: null,
        profPic: null,
        about: null
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      };
  }

  return state;
}