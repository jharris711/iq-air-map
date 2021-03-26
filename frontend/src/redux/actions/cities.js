import axios from 'axios'
import types from '../constants/types'

const key1 = "0d671390-63d9-4cde-8f1c-45f9124045f8"
const key2 = "b509785d-740f-41ba-a74c-f5790e333194"

const getCitiesRequest = () => {
  return {
    type: types.GET_CITIES_REQUEST
  }
}

const getCitiesSuccess = payload => {
  return {
    type: types.GET_CITIES_SUCCESS,
    payload,
  }
}

const getCitiesFailure = payload => {
  return {
    type: types.GET_CITIES_FAILURE,
    payload
  }
}

export const getCities = (state, country) => {
  return dispatch => {
    dispatch(getCitiesRequest())
    const url = "http://api.airvisual.com/v2/cities"
    axios.get(url, {
      params: {
        state,
        country,
        key: key2
      }
    })
      .then(response => {
        dispatch(getCitiesSuccess(response))
      })
      .catch(error => {
        dispatch(getCitiesFailure(error))
      })
  }
}

export const selectCity = payload => {
  return {
    type: types.HANDLE_SELECT_CITY,
    payload
  }
}