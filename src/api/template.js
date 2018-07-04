/*
 * @Author: nooldey 
 * @Date: 2017-08-21 11:30:32 
 * @Last Modified by: nooldey
 * @Last Modified time: 2017-08-29 09:21:45
 * @人口模板 API
 */

import { post } from 'fetch'

/* token */
const getTempList = () => post('/temp/query/list')

/* token*,name*,pid,note,state */
const createTemp = args => post('/temp/create/temp',args)

/* token*,id*,name,pid,note,state */
const updateTemp = args => post('/temp/update/temp',args)

/* token,id */
const deleteTemp = id => post('/temp/delete/temp',{ id })

const getTempDetail = id => post('/temp/query/temp/info',{id})

export {
    getTempList,
    createTemp,
    updateTemp,
    deleteTemp,
    getTempDetail
}