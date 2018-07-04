/*
 * @Author: nooldey 
 * @Date: 2017-08-28 17:14:36 
 * @Last Modified by: nooldey
 * @Last Modified time: 2017-09-26 14:31:52
 * 人口同步
 */


import { post,postForm,stepForm } from 'fetch'

/* R6.同步人口档案数据 */
// const syncDocument = args => postForm('/record/synchronous_data',args)

/* R7.选择同步人口档案数据 */
// const syncProgress = () => post('/record/select/synchronous_data')

/* R9.保存同步信息 */
const saveDocument = args => postForm('/record/save/synInfo',args)

/* R11.手动同步人口档案数据 */
const handleSync = args => post('/record/hand/synchronous_data',args)

/* 上传文件导入 */
const uploadSync = (args,fn) => stepForm('/api/record/add/person_record_zip',args,fn)

/* 查询同步记录 */
const syncRecord = args => post('/record/query/synRecord',args)

/* 提交自动同步任务 */
const autoSync = args => post('/auto/syn/population',args)

export {
    // syncDocument,
    // syncProgress,
    saveDocument,
    handleSync,
    uploadSync,
    syncRecord,
    autoSync
}