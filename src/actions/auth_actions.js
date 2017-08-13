import axios from 'axios';
import {browserHistory} from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';


const ROOT_URL = 'https://actio-backend.herokuapp.com';
// const ROOT_URL= 'http://localhost:8080'

export const signinUser = ({ email, password }) => async(dispatch) => {
  const res = await axios.post(`${ROOT_URL}/api/signin`, { email, password })
  console.log('res', res.data)
  if(res.data !== false) {
    const currentUser = res.data.currentUser
    const token = res.data.token
    dispatch({type: AUTH_USER, payload: currentUser})
    browserHistory.push('/home')
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
  } else {
    dispatch(authError('Bag Login Info'))
  }
  
  // return function(dispatch) {
  //   axios.post(`${ROOT_URL}/api/signin`, { email, password })
  //   .then(response => {
  //       const currentUser = response.data.currentUser
  //       const token = response.data.token
  //       dispatch(
  //         {
  //           type: AUTH_USER,
  //           payload: currentUser
  //         }
  //       )
  //       localStorage.setItem('token', token);
  //       localStorage.setItem('currentUser', JSON.stringify(currentUser))
  //       browserHistory.push('/home')
  //   })
  //   .catch(() => {
  //     dispatch(authError('Bag Login Info'))
  //   })
  // }
}

export function signupUser({firstName, lastName, password, email, zip, profilePicUrl}) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/users/`, { firstName,lastName,password, email, zip, profilePicUrl})
      .then(response => {
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
      .catch(response => dispatch(authError()))
  }
}

export function updateUser(id, values) {
  return function(dispatch) {
    axios.put(`${ROOT_URL}/api/users/${id}`, values)
      .then(response => {
        const currentUser = response.data[0];
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        dispatch({
          type:AUTH_USER,
          payload:currentUser
        })
        browserHistory.push('/home')
      })
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