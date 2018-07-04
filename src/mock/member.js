const qs = require('qs')
const all = args => queryAll[qs.parse(args.body).pageNum || 0]

const roles = () => queryRoles

const suc = () => requestSuc

const one = () => queryOne
// SR2.创建角色
const create = () => createRole
// SR5.查询角色
const role = () => queryRole
// SR9.查询权限列表
const permissions = () => permissionList

export default {
    all,
    roles,
    suc,
    one,
    create,
    role,
    permissions
}

const permissionList = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": [
        {
            "id": "1",
            "menuName": "警情管理",
            "menuIcon": "http://www.img",
            "menuClass": "0",
            "sysPages": [
                {
                    "id": "1",
                    "pageName": "警情管理",
                    "pageIcon": null,
                    "pageClass": null,
                    "pageLink": null,
                    "actions": [
                        {
                            "id": "2",
                            "actionName": "实时警情",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "1",
                            "actionName": "页面",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "3",
                            "actionName": "警情记录",
                            "actionIcon": null,
                            "actionClass": null
                        }
                    ]
                }
            ]
        },
        {
            "id": "4",
            "menuName": "记录管理",
            "menuIcon": null,
            "menuClass": "0",
            "sysPages": [
                {
                    "id": "9",
                    "pageName": "记录回收站",
                    "pageIcon": null,
                    "pageClass": null,
                    "pageLink": null,
                    "actions": [
                        {
                            "id": "27",
                            "actionName": "页面",
                            "actionIcon": null,
                            "actionClass": null
                        }
                    ]
                },
                {
                    "id": "8",
                    "pageName": "记录日志",
                    "pageIcon": null,
                    "pageClass": null,
                    "pageLink": null,
                    "actions": [
                        {
                            "id": "25",
                            "actionName": "页面",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "26",
                            "actionName": "记录查看",
                            "actionIcon": null,
                            "actionClass": null
                        }
                    ]
                }
            ]
        },
        {
            "id": "2",
            "menuName": "数据分析",
            "menuIcon": null,
            "menuClass": "0",
            "sysPages": [
                {
                    "id": "2",
                    "pageName": "警情统计分析",
                    "pageIcon": null,
                    "pageClass": null,
                    "pageLink": null,
                    "actions": [
                        {
                            "id": "8",
                            "actionName": "查看轨迹",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "5",
                            "actionName": "嫌疑人添加",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "7",
                            "actionName": "报警级别设定",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "4",
                            "actionName": "页面",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "6",
                            "actionName": "嫌疑人删除",
                            "actionIcon": null,
                            "actionClass": null
                        }
                    ]
                },
                {
                    "id": "4",
                    "pageName": "检索分析",
                    "pageIcon": null,
                    "pageClass": null,
                    "pageLink": null,
                    "actions": [
                        {
                            "id": "11",
                            "actionName": "页面",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "12",
                            "actionName": "检索条件设置",
                            "actionIcon": null,
                            "actionClass": null
                        }
                    ]
                },
                {
                    "id": "3",
                    "pageName": "异常事件分析",
                    "pageIcon": null,
                    "pageClass": null,
                    "pageLink": null,
                    "actions": [
                        {
                            "id": "9",
                            "actionName": "页面",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "10",
                            "actionName": "分析规则编辑",
                            "actionIcon": null,
                            "actionClass": null
                        }
                    ]
                }
            ]
        },
        {
            "id": "6",
            "menuName": "系统设置",
            "menuIcon": null,
            "menuClass": "0",
            "sysPages": [
                {
                    "id": "12",
                    "pageName": "用户管理",
                    "pageIcon": null,
                    "pageClass": null,
                    "pageLink": null,
                    "actions": [
                        {
                            "id": "34",
                            "actionName": "页面",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "37",
                            "actionName": "编辑用户",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "38",
                            "actionName": "删除用户",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "35",
                            "actionName": "添加用户",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "36",
                            "actionName": "冻结用户",
                            "actionIcon": null,
                            "actionClass": null
                        }
                    ]
                },
                {
                    "id": "14",
                    "pageName": "日志中心",
                    "pageIcon": null,
                    "pageClass": null,
                    "pageLink": null,
                    "actions": [
                        {
                            "id": "43",
                            "actionName": "页面",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "44",
                            "actionName": "删除日志",
                            "actionIcon": null,
                            "actionClass": null
                        }
                    ]
                },
                {
                    "id": "13",
                    "pageName": "角色管理",
                    "pageIcon": null,
                    "pageClass": null,
                    "pageLink": null,
                    "actions": [
                        {
                            "id": "41",
                            "actionName": "编辑角色",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "39",
                            "actionName": "页面",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "40",
                            "actionName": "添加角色",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "42",
                            "actionName": "删除角色",
                            "actionIcon": null,
                            "actionClass": null
                        }
                    ]
                }
            ]
        },
        {
            "id": "3",
            "menuName": "人脸库",
            "menuIcon": null,
            "menuClass": "0",
            "sysPages": [
                {
                    "id": "6",
                    "pageName": "库数据检索",
                    "pageIcon": null,
                    "pageClass": null,
                    "pageLink": null,
                    "actions": [
                        {
                            "id": "20",
                            "actionName": "新建档案",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "21",
                            "actionName": "删除档案",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "19",
                            "actionName": "查看档案",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "18",
                            "actionName": "页面",
                            "actionIcon": null,
                            "actionClass": null
                        }
                    ]
                },
                {
                    "id": "5",
                    "pageName": "库数据管理",
                    "pageIcon": null,
                    "pageClass": null,
                    "pageLink": null,
                    "actions": [
                        {
                            "id": "15",
                            "actionName": "库数据同步",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "13",
                            "actionName": "页面",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "16",
                            "actionName": "库数据编辑",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "14",
                            "actionName": "库结构管理",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "17",
                            "actionName": "预警设置",
                            "actionIcon": null,
                            "actionClass": null
                        }
                    ]
                },
                {
                    "id": "7",
                    "pageName": "库数据更新",
                    "pageIcon": null,
                    "pageClass": null,
                    "pageLink": null,
                    "actions": [
                        {
                            "id": "23",
                            "actionName": "自动更新规则",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "22",
                            "actionName": "页面",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "24",
                            "actionName": "手动更新",
                            "actionIcon": null,
                            "actionClass": null
                        }
                    ]
                }
            ]
        },
        {
            "id": "5",
            "menuName": "设备管理",
            "menuIcon": null,
            "menuClass": "0",
            "sysPages": [
                {
                    "id": "10",
                    "pageName": "服务列表",
                    "pageIcon": null,
                    "pageClass": null,
                    "pageLink": null,
                    "actions": [
                        {
                            "id": "31",
                            "actionName": "服务删除",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "32",
                            "actionName": "控制台",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "28",
                            "actionName": "页面",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "29",
                            "actionName": "服务添加",
                            "actionIcon": null,
                            "actionClass": null
                        },
                        {
                            "id": "30",
                            "actionName": "服务编辑",
                            "actionIcon": null,
                            "actionClass": null
                        }
                    ]
                },
                {
                    "id": "11",
                    "pageName": "设备列表",
                    "pageIcon": null,
                    "pageClass": null,
                    "pageLink": null,
                    "actions": [
                        {
                            "id": "33",
                            "actionName": "页面",
                            "actionIcon": null,
                            "actionClass": null
                        }
                    ]
                }
            ]
        }
    ]
}

const createRole = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": {
        "id": "2017092016010998710",
        "roleName": "josh",
        "permission": "*",
        "createdOn": "2017-09-20T16:01:09.987",
        "status": "Y"
    }
}

const queryRole = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": {
        "id": "3",
        "roleName": "临时管理",
        "permission": "1.1.1,1.1.2",
        "createdOn": "2017-09-27T11:40:28.000"
    }
}

const requestSuc = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": true
}

const queryOne = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": {
        "id": "2017082219463907410",
        "username": "root5",
        "role": "1",
        "roleName": "超级管理员",
        "displayName": "web",
        "createdOn": "2017-08-22T19:46:39.000",
        "state": "N",
        "department": "dev",
        "lastLoginTime": "2017-08-22T19:47:07.000"
    }
}

const queryRoles = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": {
        "list": [
            {
                "id": '1',
                "roleName": "超级管理员",
                "permission": "*",
                "createdOn": "2017-08-01T15:32:33.000"
            },
            {
                "id": '2',
                "roleName": "管理",
                "permission": "*",
                "createdOn": "2017-08-02T15:32:52.000"
            },
            {
                "id": '3',
                "roleName": "临时管理",
                "permission": "1.1.1,1.1.2",
                "createdOn": "2017-08-31T10:55:32.000"
            }
        ],
        "total": 3
    }
}

const queryAll = [
    {
        "code": 1000,
        "msg": "Success",
        "subMsg": "请求成功",
        "data": {
            "list": [
                {
                    "id": "1",
                    "username": "root",
                    "role": "1",
                    "roleName": "超级管理员",
                    "displayName": "市委书记",
                    "createdOn": "2017-08-08T16:31:10.000",
                    "state": "Y",
                    "department": "文化部",
                    "lastLoginTime": "2017-08-23T09:34:33.000"
                },
                {
                    "id": "2017082210034780350",
                    "username": "root6",
                    "role": "2",
                    "roleName": "管理",
                    "displayName": "乘务长",
                    "createdOn": "2017-08-22T10:03:48.000",
                    "state": "N",
                    "department": "铁道部",
                    "lastLoginTime": null
                },
                {
                    "id": "2017082219463907410",
                    "username": "root5",
                    "role": "1",
                    "roleName": "超级管理员",
                    "displayName": "web",
                    "createdOn": "2017-08-22T19:46:39.000",
                    "state": "N",
                    "department": "abc",
                    "lastLoginTime": "2017-08-23T12:08:05.000"
                },
                {
                    "id": "2017082219482298470",
                    "username": "root1",
                    "role": "1",
                    "roleName": "超级管理员",
                    "displayName": "web",
                    "createdOn": "2017-08-22T19:48:23.000",
                    "state": "N",
                    "department": "dev",
                    "lastLoginTime": "2017-08-23T10:38:44.000"
                },
                {
                    "id": "2017082219482661940",
                    "username": "root2",
                    "role": "1",
                    "roleName": "超级管理员",
                    "displayName": "web",
                    "createdOn": "2017-08-22T19:48:27.000",
                    "state": "N",
                    "department": "dev",
                    "lastLoginTime": null
                },
                {
                    "id": "2017082219483055310",
                    "username": "root3",
                    "role": "1",
                    "roleName": "超级管理员",
                    "displayName": "web",
                    "createdOn": "2017-08-22T19:48:31.000",
                    "state": "N",
                    "department": "dev",
                    "lastLoginTime": "2017-08-23T11:10:12.000"
                },
                {
                    "id": "2017082309483108220",
                    "username": "root4",
                    "role": "2",
                    "roleName": "管理",
                    "displayName": "web",
                    "createdOn": "2017-08-23T09:48:31.000",
                    "state": "N",
                    "department": "dev",
                    "lastLoginTime": "2017-08-22T11:22:30.000"
                },
                {
                    "id": "2017082312085627110",
                    "username": "someone",
                    "role": "1",
                    "roleName": "超级管理员",
                    "displayName": "b",
                    "createdOn": "2017-08-23T12:08:56.000",
                    "state": "N",
                    "department": "a",
                    "lastLoginTime": null
                }
            ],
            "total": 10
        }
    },{
        "code": 1000,
        "msg": "Success",
        "subMsg": "请求成功",
        "data": {
            "list": [
                {
                    "id": "2017082312104386490",
                    "username": "ceshi1",
                    "role": "1",
                    "roleName": "超级管理员",
                    "displayName": "bb",
                    "createdOn": "2017-08-23T12:10:44.000",
                    "state": "N",
                    "department": "aa",
                    "lastLoginTime": null
                },
                {
                    "id": "2017082312142845800",
                    "username": "a",
                    "role": "1",
                    "roleName": "超级管理员",
                    "displayName": "d",
                    "createdOn": "2017-08-23T12:14:28.000",
                    "state": "N",
                    "department": "c",
                    "lastLoginTime": null
                }
            ],
            "total": 10
        }
    }
]