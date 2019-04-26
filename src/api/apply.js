import api from '@/utils/request'

export const getApplyDetail = data => {
  return api.request({
    url: 'apply',
    method: 'get',
    data
  })
}

export const createApply = data => {
  return api.request({
    url: 'apply',
    method: 'post',
    data
  })
}

export const updateApply = data => {
  return api.request({
    url: 'apply',
    method: 'put',
    data
  })
}



export const deleteApply = data => {
  return api.request({
    url: 'apply',
    method: 'delete',
    data
  })
}

