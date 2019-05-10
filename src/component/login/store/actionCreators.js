import * as actionTypes from './actionTypes'
import { login } from '@/api/user'
import { message } from 'antd'

const changeUserInfo = data => ({
  type: actionTypes.SAVE_USERINFO,
  data,
})

export const getUserInfo = () => ({
  type: actionTypes.GET_USERINFO,
})

export const saveUserInfo = data => {
  return async dispatch => {
    let res = await login(data)
    console.log('res', res)
    if (res.data.status === 0) {
      localStorage.setItem('token', res.data.data.token)
      dispatch(changeUserInfo(res.data.data))
      window.location.hash = '#/management'
    } else {
      message.error('登录失败')
    }
  }
}
