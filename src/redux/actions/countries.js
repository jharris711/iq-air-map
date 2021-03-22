import axios from "axios";

import types from "./types";

const key1 = "0d671390-63d9-4cde-8f1c-45f9124045f8"
const key2 = "b509785d-740f-41ba-a74c-f5790e333194"


const getCountriesRequest = () => {
  return {
    type: types.GET_COUNTRIES_REQUEST
  };
};

const getCountriesSuccess = payload => {
  return {
    type: types.GET_COUNTRIES_SUCCESS,
    payload
  };
};

const getCountriesFailure = error => {
  return {
    type: types.GET_COUNTRIES_FAILURE,
    payload: error
  };
};

export const getCountries = () => {
  return dispatch => {
    dispatch(getCountriesRequest());
    axios
      .get("https://api.airvisual.com/v2/countries", {
        params: {
          key: key2
        }
      })
      .then(response => {
        dispatch(getCountriesSuccess(response));
      })
      .catch(error => {
        dispatch(getCountriesFailure(error));
      });
  };
};

export const selectCountry = payload => {
  return {
    type: types.HANDLE_SELECT_COUNTRY,
    payload
  };
};
