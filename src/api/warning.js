import { post,postForm } from 'fetch'

// RW1.获取预警列表
const queryList = args => post('/warning/query/list',args)

// RW2.同时忽略多个预警
const ignoreMulti = id => postForm('/warning/ignore/record',{ id })

// RW4.忽略单个预警
const ignoreItem = args => post('/warning/ignore/warning',args)

// RW5.获取单个预警对应抓拍照片列表
const getWarnCap = args => post('/warning/related/info',args)

export {
    queryList,
    ignoreMulti,
    ignoreItem,
    getWarnCap
}