import request from '@/utils/request'

//配置信息导入
export function searchConfigInfo(query,data){
  return request({
    url: '/wmencoder/info/'+query,
    method: 'post',
    data: data
  })
}
