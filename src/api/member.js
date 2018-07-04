/*
 * @Author: nooldey 
 * @Date: 2017-09-12 18:30:22 
 * @Last Modified by:   nooldey 
 * @Last Modified time: 2017-09-12 18:30:22 
 * 用户管理
 */

import { post } from 'fetch'

// U3.创建用户
const createUser = args => post('/user/create/user', args)
// U4.修改用户信息
const editUser = args => post('/user/update/user', args)
// U5.停用用户
const shutoffUser = args => post('/user/block/user', args)
// U6.删除用户
const delUser = args => post('/user/delete/user', args)
// U7.查询用户列表
const queryAll = args => post('/user/query/all', args)
// U8.查询用户详细信息
const queryOne = args => post('/user/query/userInfo', args)
// U12.启用用户
const launchUser = args => post('/user/start/user', args)
// SR1.查询角色列表
const getRoles = args => post('/user/sysrole/query/list', args)
// SR2.创建角色
const createRole = args => post('/user/create/role', args)
// SR3.编辑角色
const editRole = args => post('/user/update/role', args)
// SR4.停用角色
const stopRole = args => post('/user/stop/role', args)
// SR5.查询角色
const checkRole = args => post('/user/query/role', args)
// SR6.删除角色
const delRole = args => post('/user/delete/role', args)
// SR7.启用角色
const launchRole = args => post('/user/start/role', args)
// SR9.查询权限列表
const permissions = args => post('/user/query/auth/list', args)

export {
    createUser,
    editUser,
    shutoffUser,
    delUser,
    queryAll,
    queryOne,
    launchUser,
    getRoles,
    createRole,
    editRole,
    stopRole,
    checkRole,
    delRole,
    launchRole,
    permissions
}