import { getCityWeatherData } from '../actions/cityWeatherData'
import types from '../constants/types'

const initialState= {
  city_weather_data: [],
  getCityWeatherDataLoading: false,
  getCityWeatherDataError: '',
}

const cityWeatherDataReducer = ( state = initialState, action) => {
  switch (action.type) {
    case types.GET_CITY_WEATHER_DATA_REQUEST:
      return {
        ...state,
        getCityWeatherDataLoading: true
      }
    case types.GET_CITY_WEATHER_DATA_SUCCESS:
      const city_weather_data = [action.payload.data.data]
      return {
        ...state,
        getCityWeatherDataLoading: false,
        city_weather_data
      }
    case types.GET_CITY_WEATHER_DATA_FAILURE:
      return {
        ...state,
        getCityWeatherDataLoading: false,
        getCityWeatherDataError: action.payload,
      }
    default: return state
  }
}

export default cityWeatherDataReducer