import types from "../actions/types";
import { addToOrRemoveFromArray } from '../../utils'

const initialState = {
  getGeoDataLoading: false,
  geodata: [],
  latitude: 0,
  longitude: 0,
  getGeoDataError: ""
};

const geodataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_GEODATA_REQUEST:
      return {
        ...state,
        getGeoDataLoading: true
      };
    case types.GET_GEODATA_SUCCESS:
      const geodata = Array.from([action.payload.data[0]]);
      return {
        ...state,
        getGeoDataLoading: false,
        geodata
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

export default geodataReducer;
