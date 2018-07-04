const qs = require('qs')
const getList = args => list
const suc = args => requestSuc
const relatedInf = args => relatedList

export default {
    getList,
    suc
}

const relatedList = {
    "list": [
        {
            "recordId": "2017091018595612720",//档案id
            "capPicture": "/images/face/120224198105141527.jpg"//抓拍图片
        }
    ],
    "total": 3
}

const requestSuc = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": "1"
}

const list = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": {
        "list": [{
            "id": "2017091219265185700",
            "recordId": "2017091514391038820",
            "similarity": 84.0,
            "recordPicture": "/images/face/up1d1505137854865.jpg",
            "warningPicture": "/images/face/zqpl1505215611854.jpg",
            "deviceId": "2",
            "deviceLng": 120.811213,
            "deviceLat": 27.932747,
            "warningTime": "2017-09-12T19:26:52",
            "remark": "000",
            "sceneId": "2017091219265185450",
            "name": null
        }, {
            "id": "2017091218343652670",
            "recordId": "2017091514391038820",
            "similarity": 85.0,
            "recordPicture": "/images/face/up1d1505137854865.jpg",
            "warningPicture": "/images/face/n86z1505212476524.jpg",
            "deviceId": "2",
            "deviceLng": 121.811213,
            "deviceLat": 27.932747,
            "warningTime": "2017-09-12T18:34:37",
            "remark": "忽略预警",
            "sceneId": "2017091218343652440",
            "name": null
        }],
        "total": 2
    }
}