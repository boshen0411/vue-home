/*
 * @Author: nooldey 
 * @Date: 2017-08-04 16:35:24 
 * @Last Modified by: nooldey
 * @Last Modified time: 2017-09-20 11:05:27
 * @description: 模拟数据主入口文件
 */

import Mock from 'mockjs'
import loginApi from './login'
import tempApi from './template'
import member from './member'
import record from './record'
import device from './device'
import snap from './snap'
import warning from './warning'

// 当前用户
// Mock.mock(/\/user\/login/,'post',loginApi.login)
// Mock.mock(/\/user\/logout/,'post',loginApi.logout)
Mock.mock(/\/user\/upload/,'post',args => {
    return {
        "code": 1000,
        "msg": "Success",
        "subMsg": "请求成功",
        "data": "上传成功"
    }
})
// Mock.mock(/\/temp\/query\/list/,'post',tempApi.getTree)
// Mock.mock(/\/user\/validate\/token/, 'post', loginApi.verityToken)

/* 同步记录 */
// Mock.mock(/\/record\/query\/synRecord/,'post',record.getSyncList)

// 用户管理
// Mock.mock(/\/user\/query\/all/,'post',member.all)
// Mock.mock(/\/sysrole\/query\/list/,'post',member.roles)
// Mock.mock(/\/user\/create\/user/,'post',member.suc)
// Mock.mock(/\/user\/block\/user/,'post',member.suc)
// Mock.mock(/\/user\/delete\/user/,'post',member.suc)
// Mock.mock(/\/user\/query\/userInfo/,'post',member.one)
// Mock.mock(/\/user\/update\/user/,'post',member.suc)
// Mock.mock(/\/user\/sysrole\/query\/list/,'post',member.roles)
// Mock.mock(/\/user\/create\/role/,'post',member.create)
// Mock.mock(/\/user\/update\/role/,'post',member.suc)
// Mock.mock(/\/user\/stop\/role/,'post',member.suc)
// Mock.mock(/\/user\/query\/role/,'post',member.role)  // test
// Mock.mock(/\/user\/delete\/role/,'post',member.suc)
// Mock.mock(/\/user\/start\/role/,'post',member.suc)
// Mock.mock(/\/user\/query\/auth\/list/,'post',member.permissions)

// 人口档案
// Mock.mock(/\/record\/query\/list/,'post',record.getDoclist)
// Mock.mock(/\/record\/add\/person_record/,'post',record.createDoc)
// Mock.mock(/\/record\/update\/person_record/,'post',record.updateDoc)
// Mock.mock(/\/record\/delete\/person_record/,'post',record.deleteDoc)
// Mock.mock(/\/record\/query\/person_record/,'post',record.getDocdetail)

// 设备服务
// Mock.mock(/\/device\/query\/server\/list/,'post',device.getServer)
// Mock.mock(/\/device\/query\/server\/device\/list/,'post',device.getDevice)

// 记录管理
// Mock.mock(/\/cap\/query\/list/,'post',snap.snapList)
// Mock.mock(/\/cap\/get\/record/,'post',snap.snapDetail)
// Mock.mock(/\/cap\/delete\/record/,'post',snap.suc)
// Mock.mock(/\/cap\/scenes\/get/,'post',snap.sceneList)

// 实时预警
// Mock.mock(/\warning\/query\/list/,'post',warning.getList)
// Mock.mock(/\warning\/ignore\/record/,'post',warning.suc)
// Mock.mock(/\warning\/related\/info/,'post', warning.relatedInf)

import home from './home'
// 首页
// 首页图标数据来源，不可解除注释
Mock.mock(/\home\/home/, 'post', home.getHome)
Mock.mock(/\home\/device/, 'post', home.getDevice)
Mock.mock(/\home\/scale/, 'post', home.getScale)
Mock.mock(/\home\/people/, 'post', home.getPeople)
Mock.mock(/\home\/warning/, 'post', home.getWarning)

export default Mock;
