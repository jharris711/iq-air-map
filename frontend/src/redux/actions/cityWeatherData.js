import axios from 'axios'
import types from '../constants/types'

const key1 = "0d671390-63d9-4cde-8f1c-45f9124045f8"
const key2 = "b509785d-740f-41ba-a74c-f5790e333194"

const getCityWeatherDataRequest = () => {
  return {
    type: types.GET_CITY_WEATHER_DATA_REQUEST
  }
}

const getCityWeatherDataSuccess = payload => {
  return {
    type: types.GET_CITY_WEATHER_DATA_SUCCESS,
    payload,
  }
}

const getCityWeatherDataFailure = payload => {
  return {
    type: types.GET_CITY_WEATHER_DATA_FAILURE,
    payload,
  }
}

export const getCityWeatherData = (city, state, country) => {
  return dispatch => {
    dispatch(getCityWeatherDataRequest())
    const url = 'http://api.airvisual.com/v2/city'
    axios.get(url, {
      params: {
        city, state, country, key: key2
      }
    })
      .then(response => {
        dispatch(getCityWeatherDataSuccess(response))
      })
      .catch(error => {
        dispatch(getCityWeatherDataFailure(error))
      })
  }
}