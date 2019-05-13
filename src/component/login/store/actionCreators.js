import * as actionTypes from './actionTypes'
import { login,getCusInfo } from '@/api/user'
import { message } from 'antd'

const changeUserInfo = data => ({
  type: actionTypes.SAVE_USERINFO,
  data,
})

export const getUserInfo = () => ({
  type: actionTypes.GET_USERINFO,
})

export const updateUserInfo = () => {
  return async dispatch => {
    let res = await getCusInfo()
    if (res.data.status === 0) {
      dispatch(changeUserInfo(res.data.data))
    } else {
      message.error('更新失败')
    }
  }
}

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
