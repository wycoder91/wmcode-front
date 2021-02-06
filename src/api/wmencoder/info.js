import request from '@/utils/request'

// 查询整机编码列表
export function listInfo(query) {
  return request({
    url: '/wmencoder/info/list',
    method: 'get',
    params: query
  })
}

// 查询整机编码详细
export function getInfo(coderId) {
  return request({
    url: '/wmencoder/info/' + coderId,
    method: 'get'
  })
}

// 新增整机编码
export function addInfo(data) {
  return request({
    url: '/wmencoder/info',
    method: 'post',
    data: data
  })
}

// 修改整机编码
export function updateInfo(data) {
  return request({
    url: '/wmencoder/info',
    method: 'put',
    data: data
  })
}

// 删除整机编码
export function delInfo(coderId) {
  return request({
    url: '/wmencoder/info/' + coderId,
    method: 'delete'
  })
}

// 导出整机编码
export function exportInfo(query) {
  return request({
    url: '/wmencoder/info/export',
    method: 'get',
    params: query
  })
}
