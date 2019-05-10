import api from '@/utils/request'

// 添加物品
export const addProduct = data => {
  return api.request({
    url: 'product',
    method: 'post',
    data
  })
}
// 删除物品
export const deleteProduct = data => {
  return api.request({
    url: `product/${data}`,
    method: 'delete',
  })
}

// 获取物品列表
export const getProductList = () => {
  return api.request({
    url: 'products',
    method: 'get'
  })
}

// 查看物品详情
export const getProductDetail = data => {
  return api.request({
    url: 'product',
    method: 'get',
    params: data
  })
}

// 租借物品
export const rentProduct = data => {
  return api.request({
    url: 'order',
    method: 'post',
    data
  })
}