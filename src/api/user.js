import api from '@/utils/request'

export const login = data => {
  return api.request({
    url: '/user',
    method: 'get',
    params: data
  })
}

export const registe = data => {
  return api.request({
    url: '/user',
    method: 'post',
    data
  })
}

export const getBSInfo = () => {
  return api.request({
    url: 'getBInfo',
    method: 'get'
  })
}

export const getCusInfo = () => {
  return api.request({
    url: 'getCInfo',
    method: 'get'
  })
}