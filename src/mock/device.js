const getServer = () => servers
const getDevice = () => devices


const servers = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": {
        "dtos": [{
            "id": "2017082818425279510",
            "name": "服务1",
            "state": "Y",
            "port": "22",
            "serviceIp": "192.168.33.1"
        }, {
            "id": "2017082818434537130",
            "name": "服务1",
            "state": "Y",
            "port": "22",
            "serviceIp": "192.168.33.1"
        }, {
            "id": "2017082818480597410",
            "name": "服务1",
            "state": "Y",
            "port": "22",
            "serviceIp": "192.168.33.1"
        }],
        "total": 3
    }
}

const devices = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": {
        "list": [{
            "id": "1", //设备ID
            "name": "宙斯盾", //设备名称
            "ip": "192.168.31.143", //ip
            "port": "22", //port
            "url": "www.google",
            "longitude": "113.945943", //经度
            "latitude": "22.547741", //纬度
            "addr": "琼州海峡", //位置名称
            "serverId": "2017082818425279510", //设备服务id
            "remark": "设备1", //备注
            "createdOn": "2017-08-15T15:18:58.000" //创建时间
        }, {
            "id": "2",
            "name": "天眼",
            "ip": "123.12.23.12",
            "port": "25",
            "url": "www.oracle",
            "longitude": "113.945943",
            "latitude": "22.547741",
            "addr": "台湾海峡",
            "serverId": "2017082818425279510",
            "remark": "设备坏了",
            "createdOn": "2017-08-01T15:20:13.000"
        }],
        "total": 3
    }
}

export default {
    getServer,
    getDevice
}