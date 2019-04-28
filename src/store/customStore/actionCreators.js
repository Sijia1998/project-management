import * as actionTypes from './actionTypes'
import { getProductList } from '@/api/product'
import { getOrdersList } from '@/api/order'
import { getApplysList } from '@/api/apply'

const saveProductList = data => ({
  type: actionTypes.SAVE_GOODSLIST,
  data,
})
const saveOrderList = data => ({
  type: actionTypes.SAVE_ORDERLIST,
  data,
})
const saveApplyList = data => ({
  type: actionTypes.SAVE_APPLYLIST,
  data,
})

export const handleProduct = () => {
  return async dispatch => {
    let res = await getProductList()
    dispatch(saveProductList(res.data.data))
  }
}
export const handleOrder = () => {
  return async dispatch => {
    let res = await getOrdersList()
    dispatch(saveOrderList(res.data.data))
  }
}

export const handleApplyList = () => {
  return async dispatch => {
    let res = await getApplysList()
    dispatch(saveApplyList(res.data.data))
  }
}

