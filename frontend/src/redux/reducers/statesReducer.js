import types from '../constants/types'

const initialState = {
  states: [],
  getStatesLoading: false,
  getStatesError: '',
  selected_state: ''
}

const statesReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case types.GET_STATES_REQUEST:
      return {
        ...state,
        getStatesLoading: true
      }
    case types.GET_STATES_SUCCESS:
      const stateResponse = Array.from(action.payload.data.data)
      const states = stateResponse.map(state => state.state)
      console.log("STATES", states)
      return {
        ...state,
        getStatesLoading: false,
        states
      }
    case types.GET_STATES_FAILURE:
      const getStatesError = action.payload
      return {
        ...state,
        getStatesLoading: false,
        getStatesError
      }
    case types.HANDLE_SELECT_STATE:
      const selected_state = action.payload
      return {
        ...state,
        selected_state,
      }
    default:
      return state
  }
}

export default statesReducer