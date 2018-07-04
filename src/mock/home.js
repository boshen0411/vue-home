const getHome = args => home
const getDevice = args => device
const getScale = args => scale
const getPeople = args => people
const getWarning = args => warning
const suc = () => requestSuc

export default {
    getHome,
    getDevice,
    getScale,
    getPeople,
    getWarning,
    suc
}

const requestSuc = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": true
}

const home = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": {
        "list": [
            { date: '11-01', warn: 23, snap: 21, event: 25 },
            { date: '11-02', warn: 22, snap: 26, event: 22 },
            { date: '11-03', warn: 24, snap: 21, event: 23 },
            { date: '11-04', warn: 23, snap: 21, event: 25 },
            { date: '11-05', warn: 23, snap: 21, event: 25 },
            { date: '11-06', warn: 23, snap: 21, event: 25 },
            { date: '11-07', warn: 23, snap: 21, event: 25 }
        ]
    }
}

const device = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": {
        "list": [
            { date: '11-01', amount: 21, percent: 8 },
            { date: '11-02', amount: 18, percent: 11 },
            { date: '11-03', amount: 11, percent: 14 },
            { date: '11-04', amount: 23, percent: 20 },
            { date: '11-05', amount: 10, percent: 18 },
            { date: '11-06', amount: 15, percent: 12 },
            { date: '11-07', amount: 11, percent: 19 }
        ]
    }
}

const scale = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": {
        "list": [
            { date: '11-11', amount: 13, percent: 21 },
            { date: '11-12', amount: 12, percent: 26 },
            { date: '11-13', amount: 14, percent: 21 },
            { date: '11-14', amount: 13, percent: 21 },
            { date: '11-15', amount: 13, percent: 21 },
            { date: '11-16', amount: 13, percent: 21 },
            { date: '11-17', amount: 13, percent: 21 }
        ]
    }
}

const people = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": {
        "list": [
            { date: '11-11', amount: 10, percent: 19 },
            { date: '11-12', amount: 17, percent: 13 },
            { date: '11-13', amount: 13, percent: 26 },
            { date: '11-14', amount: 12, percent: 24 },
            { date: '11-15', amount: 17, percent: 18 },
            { date: '11-16', amount: 10, percent: 20 },
            { date: '11-17', amount: 15, percent: 23 }
        ]
    }
}

const warning = {
    "code": 1000,
    "msg": "Success",
    "subMsg": "请求成功",
    "data": {
        "list": [
            { date: '11-11', amount: 8, percent: 19 },
            { date: '11-12', amount: 13, percent: 14 },
            { date: '11-13', amount: 17, percent: 21 },
            { date: '11-14', amount: 20, percent: 25 },
            { date: '11-15', amount: 14, percent: 10 },
            { date: '11-16', amount: 21, percent: 18 },
            { date: '11-17', amount: 10, percent: 20 }
        ]
    }
}