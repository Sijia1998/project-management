import api from '@/utils/request'

export const login = () => {
  return api.request({
    url: '/user',
    methods: 'get'
  })
}

export const registe = data => {
  return api.request({
    url: '/user',
    methods: 'post',
    data
  })
}

export const getBSInfo = () => {
  return api.request({
    url: 'getBInfo',
    methods: 'get'
  })
}

export const getCusInfo = () => {
  return api.request({
    url: 'getCInfo',
    methods: 'get'
  })
}