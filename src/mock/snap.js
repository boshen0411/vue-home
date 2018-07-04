const snapList = () => snaps
const snapDetail = () => detail
const sceneList = () => scene
const suc = () => success

export default {
    snapList,
    snapDetail,
    sceneList,
    suc
}

const scene = {
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

const snaps = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": {
        "list": [
            {
                "id": "2017090910232540680",
                "dataType": "动态抓拍",
                "recDTO": {
                    "id": "2017090118222652640",
                    "ethnicity": "黑种人",
                    "location": "深圳",
                    "address": "神恩额",
                    "dateOfBirth": "2017-09-15"
                },
                "name": "张三",
                "idCard": "120224198105141527",
                "deviceDTO": {
                    "deviceId": "15",
                    "name": "None",
                    "longitude": "None",
                    "latitude": "None",
                    "addr": "None"
                },
                "capPicture": "/images/face/3jj91504923805404.jpg",
                "recordPicture": "/images/face/120224198105141527.jpg",
                "score": 99,
                "compareRecordDTOs": [
                    {
                        "recordId":212313123,
                        "image":'image/facecloud/3121312.jpg'
                    },
                    {
                        "recordId":212313123,
                        "image":'image/facecloud/3121312.jpg'
                    }
                ],
                "scenesId": "2017090910212471910",
                "createOn": "2017-09-08T09:39:02.000"
            },
            {
                "id": "2017090910232540681",
                "dataType": "动态抓拍",
                "recDTO": {
                    "id": "2017090118222652640",
                    "ethnicity": "黑种人",
                    "location": "深圳",
                    "address": "神恩额",
                    "dateOfBirth": "2017-09-15"
                },
                "name": "张三",
                "idCard": "120224198105141527",
                "deviceDTO": {
                    "deviceId": "15",
                    "name": "None",
                    "longitude": "None",
                    "latitude": "None",
                    "addr": "None"
                },
                "capPicture": "/images/face/3jj91504923805404.jpg",
                "recordPicture": "/images/face/120224198105141527.jpg",
                "compareRecordDTOs": null,
                "scenesId": "2017090910212471910",
                "createOn": "2017-09-08T09:39:02.000"
            },
            {
                "id": "2017090910232540682",
                "dataType": "动态抓拍",
                "recDTO": {
                    "id": "2017090118222652640",
                    "ethnicity": "黑种人",
                    "location": "深圳",
                    "address": "神恩额",
                    "dateOfBirth": "2017-09-15"
                },
                "name": "张三",
                "idCard": "120224198105141527",
                "deviceDTO": {
                    "deviceId": "15",
                    "name": "None",
                    "longitude": "None",
                    "latitude": "None",
                    "addr": "None"
                },
                "capPicture": "/images/face/3jj91504923805404.jpg",
                "recordPicture": "/images/face/120224198105141527.jpg",
                "compareRecordDTOs": [
                    {
                        "score": 99,
                        "recordId":212313123,
                        "total":12,
                        "image":'image/facecloud/3121312.jpg'
                    },
                    {
                        "score": 99,
                        "recordId":212313123,
                        "total":12,
                        "image":'image/facecloud/3121312.jpg'
                    }
                ],
                "scenesId": "2017090910212471910",
                "createOn": "2017-09-08T09:39:02.000"
            }
        ],
        "total": 3
    }
}

const detail = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": {
        "recordId": "1", //档案id
        "name": "哇哈哈", //姓名
        "idCard": "123456", //身份证号
        "devicename": "宙斯盾", //通道名称
        "deviceId": "1", //通道id
        "score": "75", //比中相似度
        "createOn": "2017-08-01T16:55:02.000", //预警时间
        "sceneId": "1" //场景图,根据场景id,查找场景图,  api/sence/get/scenes
    }
}

const success = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": true
}