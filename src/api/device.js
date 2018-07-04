/*
 * @Author: nooldey 
 * @Date: 2017-08-24 15:34:31 
 * @Last Modified by: nooldey
 * @Last Modified time: 2017-09-12 18:25:48
 * 设备服务
 */

import { post } from 'fetch'

/* DS1.创建比对服务 */
const createServer = args => post('/device/create/server',args)

/* DS2.同步数据 */
const syncServer = serverId => post('/device/synchro/device/data',{serverId})

/* DS3.获取服务列表 */
const getServerList = () => post('/device/query/server/list', {})

/* DS5.获取设备列表 */
const getDeviceList = serverId => post('/device/query/server/device/list', {
    serverId,
    pageSize: 100
})

/* DS6.删除设备服务 */
const deleteServer = args => post('/device/delete/server', args)

export {
    getServerList,
    getDeviceList,
    syncServer,
    createServer,
    deleteServer
}