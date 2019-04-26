import * as actionTypes from './actionTypes'
const defaultState = {
  products: [],
  orders: [],
  apply: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_GOODSLIST:
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}