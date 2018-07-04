/**
 * 抓拍比中 api
 */
import { post } from 'fetch'

// Cp1.删除抓拍记录
const capRemove = o => post('/cap/delete/record', o)
// 批量删除抓拍记录
const capsRemove = o => post('/cap/delete/caps', o)
// 恢复、批量恢复
const capsRecovery = o => post('/cap/recovery/caps', o)
// Cp5.查询抓拍列表
const capList = o => post('/cap/query/list', o)
// S1.查询场景图
const sceneDetail = o => post('/cap/scenes/get',o)

export { capList, capRemove, sceneDetail }
