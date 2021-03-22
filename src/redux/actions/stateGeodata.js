import axios from 'axios'

import types from './types'


const getStateGeoDataRequest = () => {
  return {
    type: types.GET_STATE_GEODATA_REQUEST
  }
}

const getStateGeoDataSuccess = payload => {
  return {
    type: types.GET_STATE_GEODATA_SUCCESS,
    payload
  }
}

const getStateGeoDataFailure = payload => {
  return {
    type: types.GET_STATE_GEODATA_FAILURE,
    payload
  }
}

export const getStateGeoData = state => {
  return dispatch => {
    dispatch(getStateGeoDataRequest())
    const url = "https://nominatim.openstreetmap.org/search"
    axios.get(url, {
      params: {
        state,
        polygon_geojson: 1,
        format: "json"
      }
    })
      .then(response => {
        dispatch(getStateGeoDataSuccess(response))
      })
      .catch(error => {
        dispatch(getStateGeoDataFailure(error))
      })
  }
}