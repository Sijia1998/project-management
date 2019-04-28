import * as actionTypes from './actionTypes'
const defaultState = {
  products: [],
  orders: [],
  apply: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_GOODSLIST:
      return Object.assign({}, state, {
        products: action.data
      })
    case actionTypes.SAVE_ORDERLIST:
      return Object.assign({}, state, {
        orders: action.data
      })
    case actionTypes.SAVE_APPLYLIST:
      return Object.assign({}, state, {
        apply: action.data
      })
    default:
      return state
  }
}