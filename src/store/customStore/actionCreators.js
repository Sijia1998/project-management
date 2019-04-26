import * as actionTypes from './actionTypes'
import { getCusInfo } from '@/api/user'

const getOwnInfo = data => ({
  type: actionTypes.GET_GOODSLIST,
  data,
})

export const handleOwnInfo = () => {
  return async dispatch => {
    let res = await getCusInfo()
    dispatch(getOwnInfo(res.data.data))
  }
}