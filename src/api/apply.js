import api from '@/utils/request'

export const getApplysList = ()=>{
  return api.request({
    url:'applys',
    method:'get'
  })
}

export const getApplyDetail = data => {
  return api.request({
    url: 'apply',
    method: 'get',
    params:{
      data
    }
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

