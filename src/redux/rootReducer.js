import { combineReducers } from "redux";

import countriesReducer from "./reducers/countriesReducer";
import geodataReducer from "./reducers/geodataReducer";
import stateGeodataReducer from "./reducers/stateGeodataReducer";
import statesReducer from "./reducers/statesReducer";

const rootReducer = combineReducers({
  countries: countriesReducer,
  geodata: geodataReducer,
  states: statesReducer,
  stateGeodata: stateGeodataReducer,
});

export default rootReducer;
