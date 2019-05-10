import api from '@/utils/request'

export const getOrdersList = () => {
  return api.request({
    url: 'orders',
    method: 'get'
  })
}

export const getOrderDetail = data => {
  return api.request({
    url: `order/${data}`,
    method: 'get',
  })
}

// 租借物品
export const createOrder = data => {
  return api.request({
    url: 'order',
    method: 'post',
    data
  })
}

export const updateOrder = data => {
  return api.request({
    url: 'order',
    method: 'put',
    data
  })
}



export const deleteOrder = data => {
  return api.request({
    url: `order/${data}`,
    method: 'delete',
  })
}

