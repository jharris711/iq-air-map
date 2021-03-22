import types from '../actions/types'

const initialState = {
  city_geodata: [],
  getCityGeodataLoading: false,
  getCityGeodataError: ""
}


const cityGeodataReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case types.GET_CITY_GEODATA_REQUEST:
      return {
        ...state,
        getCityGeodataLoading: true
      }
    case types.GET_CITY_GEODATA_SUCCESS:
      const city_geodata = action.payload.data
      return {
        ...state,
        getCityGeodataLoading: false,
        city_geodata
      }
    case types.GET_CITY_GEODATA_FAILURE:
      const getCityGeodataError = action.payload
      return {
        ...state,
        getCityGeodataLoading: false,
        getCityGeodataError
      }
    default: return state
  }
}

export default cityGeodataReducer