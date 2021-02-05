import request from '@/utils/request'

// 查询铲斗类型列表
export function listDou(query) {
  return request({
    url: '/machine/dou/list',
    method: 'get',
    params: query
  })
}

// 查询铲斗类型详细
export function getDou(maId) {
  return request({
    url: '/machine/dou/' + maId,
    method: 'get'
  })
}

// 新增铲斗类型
export function addDou(data) {
  return request({
    url: '/machine/dou',
    method: 'post',
    data: data
  })
}

// 修改铲斗类型
export function updateDou(data) {
  return request({
    url: '/machine/dou',
    method: 'put',
    data: data
  })
}

// 删除铲斗类型
export function delDou(maId) {
  return request({
    url: '/machine/dou/' + maId,
    method: 'delete'
  })
}

// 导出铲斗类型
export function exportDou(query) {
  return request({
    url: '/machine/dou/export',
    method: 'get',
    params: query
  })
}