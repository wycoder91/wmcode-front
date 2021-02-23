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

//查询optional表中category字段最大值
export function getOptionalMaxCategory(query){
  return request({
    url: '/wmencoder/generate/'+query,
    method: 'get'
  })
}

//判断数组特定字符重复性
function ArrReInfoIndex(arr,val){
  var arr=(typeof arr!="object")? [arr] : arr;
  for (var i = 0; i < arr.length; i++) {
  if (arr[i] == val) return i;
  }
  return -1;
}

//删除重复字符
export function removeArrReInfo(arr,val) {
  var arr=(typeof arr!="object")? [arr] : arr;
  var index=0;
  while ((index = ArrReInfoIndex(arr,val)) != -1) {
    arr.splice(index, 1);
  }
  return arr;
}
