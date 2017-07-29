import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, GET_ALL_EVENTS, GET_USER_EVENTS, GET_OWNED_EVENTS} from './types';


// const ROOT_URL = 'https://actio-backend.herokuapp.com';
const ROOT_URL = 'http://localhost:8080';

export function signinUser({ email, password }) {
  return function(dispatch) {

    axios.post(`${ROOT_URL}/api/signin`, { email, password })
    .then(response => {
        console.log('response.data', response.data)

        const currentUser = response.data.currentUser
        const token = response.data.token
        dispatch(
          {
            type: AUTH_USER,
            payload: currentUser
          }
        )
        localStorage.setItem('token', token);
        browserHistory.push('/home')
    })
    .catch(() => {
      dispatch(authError('Bag Login Info'))
    })
  }
}

export function signupUser({firstName, lastName, password, email, zip, profilePicUrl}) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/users/`, { firstName,lastName,password, email, zip, profilePicUrl})
      .then(response => {
        console.log('response', response)
        const currentUser = response.data.currentUser
        console.log('$$$signedUpUser: ', currentUser)
        const token = response.data.token
        dispatch(
          {
            type: AUTH_USER,
            payload: currentUser
          }
        )

        localStorage.setItem('token', token);
        browserHistory.push('/home')
      })
      .catch(response => dispatch(authError()))
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signOutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  }
}

export function getAllEvents() {
  return function(dispatch){
    axios.get(`${ROOT_URL}/api/events`)
      .then(response => {
        console.log('allevents repsonse.data', response.data);
        dispatch({
          type: GET_ALL_EVENTS,
          payload: response.data
        })

      })
  }
}

export function getUserEvents(id){
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/users/${id}/events`).then(response => {
      dispatch({
        type: GET_USER_EVENTS,
        payload: response.data
      })
    })
    .catch(err => console.log(err))
  }
}

export function getOwnedEvents(id){
  return function(dispatch){
    axios.get(`${ROOT_URL}/api/users/${id}/owned`).then(response =>{
      dispatch({
        type: GET_OWNED_EVENTS,
        payload:response.data
      })
    }).catch(err=> console.log(err))
  }
}