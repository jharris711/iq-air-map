import types from '../constants/types'


const initialState = {
  state_geodata: [],
  getStateGeoDataLoading: false,
  getStateGeoDataError: "",
}

const stateGeodataReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case types.GET_STATE_GEODATA_REQUEST:
      return {
        ...state,
        getStateGeoDataLoading: true,
      }
    case types.GET_STATE_GEODATA_SUCCESS:
      const state_geodata = action.payload.data
      console.log(state_geodata)
      return {
        ...state,
        getStateGeoDataLoading: false,
        state_geodata
      }
    case types.GET_STATE_GEODATA_FAILURE:
      const getStateGeoDataError = action.payload
      return {
        ...state,
        getStateGeoDataLoading: false,
        getStateGeoDataError
      }
    default: return state
  }
}


export default stateGeodataReducer