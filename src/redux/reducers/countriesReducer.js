import types from "../actions/types";

const initialState = {
  countries_loading: false,
  countries: [],
  countries_error: "",
  selected_countries: ""
};

const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COUNTRIES_REQUEST:
      return {
        ...state,
        countries_loading: true
      };
    case types.GET_COUNTRIES_SUCCESS:
      let countries_response = action.payload.data.data;
      const countries = countries_response.map(country => country.country);
      return {
        ...state,
        countries_loading: false,
        countries
      };
    case types.GET_COUNTRIES_FAILURE:
      let countries_error = action.payload;
      return {
        ...state,
        countries_loading: false,
        countries_error
      };
    case types.HANDLE_SELECT_COUNTRY:
      console.log(action.payload);
      let selected_country = action.payload;
      return {
        ...state,
        selected_country
      };
    default:
      return state;
  }
};

export default countryReducer;
