import types from '../constants/types'

const initialState = {
  cities: [],
  getCitiesLoading: false,
  getCitiesError: "",
  selected_city: ""
}

const citiesReducer = ( state = initialState, action) => {
  switch (action.type) {
    case types.GET_CITIES_REQUEST:
      return {
        ...state,
        getCitiesLoading: true,
      }
    case types.GET_CITIES_SUCCESS:
      const citiesResponse = Array.from(action.payload.data.data)
      const cities = citiesResponse.map(city => city.city)
      return {
        ...state,
        getCitiesLoading: false,
        cities
      }
    case types.GET_CITIES_FAILURE:
      const getCitiesError = action.payload
      return {
        ...state,
        getCitiesLoading: false,
        getCitiesError
      }
    case types.HANDLE_SELECT_CITY:
      const selected_city = action.payload
      return {
        ...state,
        selected_city
      }
    default: return state
  }
}


export default citiesReducer