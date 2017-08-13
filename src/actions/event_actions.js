import axios from 'axios';
import { GET_ALL_EVENTS, GET_USER_EVENTS, GET_OWNED_EVENTS, CREATE_EVENT, GET_EVENT, DELETE_EVENT,CHANGE_CAT_FILTER,CHANGE_SKILL_FILTER } from './types';

const ROOT_URL = 'https://actio-backend.herokuapp.com';
// const ROOT_URL= 'http://localhost:8080'

export function getAllEvents() {
  return function(dispatch){
    return axios.get(`${ROOT_URL}/api/events`)
      .then(response => {
        dispatch({
          type: GET_ALL_EVENTS,
          payload: response.data
        })

      })
  }
}

export function getUserEvents(id){
  return function(dispatch) {
    return axios.get(`${ROOT_URL}/api/users/${id}/events`).then(response => {
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

export function createEvent(newEvent) {
  return function(dispatch) {
    return axios.post(`${ROOT_URL}/api/events`, newEvent).then(response => {
      dispatch({
        type: CREATE_EVENT,
        payload: response.data
      })
    }).catch(err=> console.log(err))
  }
}

export function getEvent(id){
  return function(dispatch){
    return axios.get(`${ROOT_URL}/api/events/${id}`).then(response => {
     dispatch({
       type: GET_EVENT,
       payload: response.data
     })
    }).catch(err => console.log('err', err))
  }
 }

export function deleteEvent(id){
  return function(dispatch){
    return axios.delete(`${ROOT_URL}/api/events/${id}`)
      .then((data) => {
        axios.get(`${ROOT_URL}/api/events`)
        .then((response) =>{
          dispatch({
            type: DELETE_EVENT,
            payload: response.data
          })
        })
      })
    }
}

export function changeCatFilter(filter){
  return function(dispatch){
    dispatch({
      type: CHANGE_CAT_FILTER,
      filterType: filter
    })
  }
}

export function changeSkillFilter(filter){
  return function(dispatch){
    dispatch({
      type: CHANGE_SKILL_FILTER,
      filterType: filter
    })
  }
}