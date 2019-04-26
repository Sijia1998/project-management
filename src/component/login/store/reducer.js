import * as actionTypes from './actionTypes'
const defaultState = {
  // email: "",
  // phone: "",
  // token: "",
  // userName: "",
  // userPic: "",
  // userType: ""
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USERINFO:
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}