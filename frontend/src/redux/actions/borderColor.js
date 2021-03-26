import types from '../constants/types'


export const setBorderColorByTemp = temp => {
  return {
    type: types.SET_BORDER_COLOR_BY_TEMP,
    payload: temp,
  }
}