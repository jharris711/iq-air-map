import types from '../constants/types'

const initialState = {
  border_color: '',
}


const borderColorReducer = ( state = initialState, action) => {
  const tempToF = action.payload * 9 / 5 + 32
  let border_color
  if (tempToF <= 0 ){
    border_color = '#42a5f5'
  } else if (tempToF <= 32) {
    border_color = '#bbdefb'
  } else if (tempToF <= 55) {
    border_color = '#e6ee9c'
  } else if (tempToF <= 75) {
    border_color = '#ffa726'
  } else {
    border_color = '#f44336'
  }
  switch (action.type) {
    case types.SET_BORDER_COLOR_BY_tempToF:
      return {
        ...state,
        border_color
      }
    default: return state
  }
}

export default borderColorReducer