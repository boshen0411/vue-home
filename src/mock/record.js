/*
 * @Author: nooldey 
 * @Date: 2017-08-22 11:42:05 
 * @Last Modified by: nooldey
 * @Last Modified time: 2017-09-19 17:26:24
 */
import Mock from 'mockjs'

const getDoclist = args => {
    return {
        "code": 1000,
        "msg": "Success",
        "subMsg": "请求成功",
        "data": {
            "list": [
                {
                    "id": 1,
                    "number": "1",
                    "tempId": null,
                    "idCard": "1",
                    "validPeriod": "2017/3/22~2034/3/2",
                    "name": "张三",
                    "ethnicity": "黄种人",
                    "nation": "布依族",
                    "gender": "F",
                    "age": 222,
                    "location": "香港",
                    "address": "新街",
                    "dateOfBirth": "1969-08-15",
                    "faceTotal": 8,
                    "state": "Y",
                    "remark": "没有备注"
                },
                {
                    "id": 2,
                    "number": "1",
                    "tempId": null,
                    "idCard": "1",
                    "validPeriod": "2017/3/22~2034/3/2",
                    "name": "张三",
                    "ethnicity": "黄种人",
                    "nation": "布依族",
                    "gender": "F",
                    "age": 222,
                    "location": "香港",
                    "address": "新街",
                    "dateOfBirth": "1969-08-15",
                    "faceTotal": 8,
                    "state": "Y",
                    "remark": "没有备注"
                }
            ],
            "total": 20
        }
    }
}

const createDoc = args => {
    return {
        "code": 1000,
        "msg": "Success",
        "subMsg": "请求成功"
    }
}

const updateDoc = args => {
    return {
        "code": 1000,
        "msg": "Success",
        "subMsg": "请求成功"
    }
}

const deleteDoc = args => {
    return {
        "code": 1000,
        "msg": "Success",
        "subMsg": "请求成功"
    }
}

const getDocdetail = id => {
    return {
        "code": 1000,
        "msg": "Success",
        "subMsg": "请求成功",
        "data": {
            "id": 11,
            "number": "1",
            "tempId": "1000",
            "idCard": "1",
            "validPeriod": "2017-3-22~2034-3-2",
            "name": "张三",
            "ethnicity": "黄种人",
            "nation": "布依族",
            "gender": "F",
            "age": 222,
            "location": "香港",
            "address": "新街",
            "dateOfBirth": "1969-08-15",
            "faceTotal": 8,
            "state": "Y",
            "remark": "没有备注"
        }
    }
}

const getSceneList = args => {
    return {
        "code": 1000,
        "msg": "Success",
        "subMsg": "请求成功",
        "data": {
            "image": "/images/scene/zb4h1504923684715.jpg",
            "recDTOs": [
                {
                    "id": "2017090118222652640",//档案id
                    "idCard": "120224198105141527",//身份证号
                    "name": "张三",
                    "score": 99,    //相似度
                    "dateTime": "2017-09-09T10:23:25.000",
                    "deviceId": "15",//通道编号
                    "deviceName": null  //通道名称
                },
                {
                    "id": "2017090118222652640",
                    "idCard": "120224198105141527",
                    "name": "张三",
                    "score": 99,
                    "dateTime": "2017-09-09T10:23:25.000",
                    "deviceId": "15",
                    "deviceName": null
                }
            ],
            "total": 2
        }
    }
}

const getSyncList = args => {
    return Mock.mock({
        "code": 1000,
        "data": {
            'list|10': [
                {
                    'id|+3': 123,
                    'updateType|1': ['0','1'],
                    'count|100-9999': 0,
                    'startTime': '@date("yyyy-mm-dd HH:MM:SS")',
                    'endTime': '@date("yyyy-mm-dd HH:MM:SS")'
                }
            ],
            'total': 50
        }
    })
}

export default{
    getDoclist,
    getDocdetail,
    createDoc,
    updateDoc,
    deleteDoc,
    getSceneList,
    getSyncList
}