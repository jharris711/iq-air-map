import { combineReducers } from "redux";

import countriesReducer from "./reducers/countriesReducer";
import geoDataReducer from "./reducers/geoDataReducer";
import statesReducer from "./reducers/statesReducer";

const rootReducer = combineReducers({
  countries: countriesReducer,
  geoData: geoDataReducer,
  states: statesReducer,
});

export default rootReducer;
