/*
 * @Author: nooldey 
 * @Date: 2017-08-21 12:01:24 
 * @Last Modified by: nooldey
 * @Last Modified time: 2017-09-18 09:24:27
 * 人脸库-人口档案
 */

import { post,postForm } from 'fetch'

/* R1.创建人口档案 */
const createDoc = args => postForm('/record/add/person_record',args)

/* R2.修改人口档案 */
const updateDoc = args => postForm('/record/update/person_record',args)

/* R3.删除个人档案 */
const deleteDoc = id => post('/record/delete/person_record',{ id })

// 批量删除个人档案
const deleteDocs = ids => post('/record/delete/person_record/byIds',{ ids })

/* R4.查询个人详细档案信息 */
const getDocDetail = id => post('/record/query/person_record',{ id })

/* R5.查询个人档案列表 */
const getDocList = args => post('/record/query/list',args)

/* R5.根据人脸照片查询个人档案列表 */
const getDocListByface = args => post('/record/query/list',args)

/* R8.删除照片 */
const deleteImg = id => post('/record/delete/picture',{ id })

/* R10.库数据检索(查找档案id对应的抓拍记录) */
const getDocCap = args => post('/record/query/cap',args)

export {
    getDocList,
    getDocDetail,
    getDocListByface,
    getDocCap,
    createDoc,
    updateDoc,
    deleteDoc,
    deleteDocs,
    deleteImg
}