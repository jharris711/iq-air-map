import { combineReducers } from "redux";
import borderColorReducer from "./reducers/borderColorReducer";

import citiesReducer from "./reducers/citiesReducer";
import cityGeodataReducer from "./reducers/cityGeodataReducer";
import cityWeatherDataReducer from "./reducers/cityWeatherDataReducer";
import stateGeodataReducer from "./reducers/stateGeodataReducer";
import statesReducer from "./reducers/statesReducer";

const rootReducer = combineReducers({
  states: statesReducer,
  stateGeodata: stateGeodataReducer,
  cities: citiesReducer,
  cityGeodata: cityGeodataReducer,
  cityWeatherData: cityWeatherDataReducer,
  borderColor: borderColorReducer,
});

export default rootReducer;
