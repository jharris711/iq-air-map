import types from "../actions/types";
import { addToOrRemoveFromArray } from '../../utils'

const initialState = {
  getGeoDataLoading: false,
  geoData: [],
  latitude: 0,
  longitude: 0,
  getGeoDataError: ""
};

const geoDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_GEODATA_REQUEST:
      return {
        ...state,
        getGeoDataLoading: true
      };
    case types.GET_GEODATA_SUCCESS:
      const geoData = Array.from([action.payload.data[0]]);
      return {
        ...state,
        getGeoDataLoading: false,
        geoData
      };
    case types.GET_GEODATA_FAILURE:
      const getGeoDataError = action.payload;
      return {
        ...state,
        getGeoDataLoading: false,
        getGeoDataError
      };
    default:
      return state;
  }
};

export default geoDataReducer;
