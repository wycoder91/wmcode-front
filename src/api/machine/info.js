import request from '@/utils/request'

// 查询基础信息列表
export function listInfo(query) {
  return request({
    url: '/machine/info/list',
    method: 'get',
    params: query
  })
}

// 查询基础信息详细
export function getInfo(maId) {
  return request({
    url: '/machine/info/' + maId,
    method: 'get'
  })
}

// 新增基础信息
export function addInfo(data) {
  return request({
    url: '/machine/info',
    method: 'post',
    data: data
  })
}

// 修改基础信息
export function updateInfo(data) {
  return request({
    url: '/machine/info',
    method: 'put',
    data: data
  })
}

// 删除基础信息
export function delInfo(maId) {
  return request({
    url: '/machine/info/' + maId,
    method: 'delete'
  })
}

// 导出基础信息
export function exportInfo(query) {
  return request({
    url: '/machine/info/export',
    method: 'get',
    params: query
  })
}