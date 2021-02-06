import request from '@/utils/request'

//配置信息导入
export function getConfigInfoOf(query){
  return request({
    url: '/wmencoder/generate/'+query,
    method: 'get'
  })
}

//生成整机编码
export function getWmCode(query,data){
  return request({
    url: '/wmencoder/generate/'+query,
    method: 'post',
    data: data
  })
}

//可选配置项表单数组处理
export function handleOptional(optionalArry){
  
}