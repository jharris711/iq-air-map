import axios from 'axios'

import types from './types'


const getCityGeodataRequest = () => {
  return {
    type: types.GET_CITY_GEODATA_REQUEST
  }
}

const getCityGeodataSuccess = payload => {
  return {
    type: types.GET_CITY_GEODATA_SUCCESS,
    payload
  }
}

const getCityGeodataFailure = payload => {
  return {
    type: types.GET_CITY_GEODATA_FAILURE,
    payload
  }
}

export const getCityGeodata = ( city, state, country ) => {
  return dispatch => {
    dispatch(getCityGeodataRequest())
    const url = "https://nominatim.openstreetmap.org/search"
    axios.get(url, {
      params: {
        city, 
        state, 
        country,
        polygon_geojson: 1,
        format: "json"
      }
    })
      .then(response => {
        dispatch(getCityGeodataSuccess(response))
      })
      .catch(error => {
        dispatch(getCityGeodataFailure(error))
      })
  }
}