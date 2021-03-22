import axios from "axios";

import types from "./types";

const getGeoDataRequest = () => {
  return {
    type: types.GET_GEODATA_REQUEST
  };
};

const getGeoDataSuccess = payload => {
  return {
    type: types.GET_GEODATA_SUCCESS,
    payload
  };
};

const getGeoDataFailure = payload => {
  return {
    type: types.GET_GEODATA_FAILURE,
    payload
  };
};

export const getGeoData = country => {
  return dispatch => {
    dispatch(getGeoDataRequest());
    const url = {
      base: "https://nominatim.openstreetmap.org",
      api: `/search?q=${country}`,
      args: "&polygon_geojson=1&format=json"
    };
    axios
      .get(`${url.base}${url.api}${url.args}`)
      .then(response => {
        dispatch(getGeoDataSuccess(response));
      })
      .catch(error => {
        console.log(error);
        dispatch(getGeoDataFailure(error));
      });
  };
};
