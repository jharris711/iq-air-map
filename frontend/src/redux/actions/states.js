import axios from 'axios'
import types from '../constants/types'

const key1 = "0d671390-63d9-4cde-8f1c-45f9124045f8"
const key2 = "b509785d-740f-41ba-a74c-f5790e333194"

const getStatesRequest = () => {
  return {
    type: types.GET_STATES_REQUEST
  }
}

const getStatesSuccess = payload => {
  return {
    type: types.GET_STATES_SUCCESS,
    payload
  }
}

const getStatesFailure = payload => {
  return {
    type: types.GET_STATES_FAILURE,
    payload
  }
}

export const getStates = country => {
  return dispatch => {
    dispatch(getStatesRequest())
    axios.get("http://api.airvisual.com/v2/states", {
      params: {
        country,
        key: key2
      }
    })
      .then(response => {
        dispatch(getStatesSuccess(response))
      })
      .catch(error => {
        dispatch(getStatesFailure(error))
      })
  }
}

export const selectState = payload => {
  return {
    type: types.HANDLE_SELECT_STATE,
    payload
  }
}