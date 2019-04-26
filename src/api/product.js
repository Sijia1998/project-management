import api from '@/utils/request'

export const addProduct = data => {
  return api.request({
    url: 'product',
    method: 'post',
    data
  })
}

export const getProductDetail = data => {
  return api.request({
    url: 'product',
    method: 'get',
    data
  })
}