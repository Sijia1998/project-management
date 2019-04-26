import * as actionTypes from './actionTypes'
import { login } from '@/api/user'

const changeUserInfo = data => ({
  type: actionTypes.SAVE_USERINFO,
  data,
})

export const getUserInfo = () => ({
  type: actionTypes.GET_USERINFO,
})

export const saveUserInfo = () => {
  return async dispatch => {
    let res = await login()
    dispatch(changeUserInfo(res.data.data))
  }
}