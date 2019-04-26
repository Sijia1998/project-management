import * as actionTypes from './actionTypes'
import { getBSInfo } from '@/api/user'

const getGoodsList = data => ({
  type: actionTypes.GET_GOODSLIST,
  data,
})

export const handleGoodsList = () => {
  return async dispatch => {
    let res = await getBSInfo()
    dispatch(getGoodsList(res.data.data))
  }
}