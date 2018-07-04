import { api } from '../config'
import qs from 'qs';
import axios from 'axios'
import { getToken,removeToken } from 'auth'
import { Message } from 'element-ui'
import { reason } from './reason'

axios.defaults.baseURL = api;
axios.defaults.timeout = 5e3;

const pipe = p => {
    return new Promise((reslove, reject) => p.then(o => {
        const r = o.data;
        //  r.code == 1000 ? reslove(r.data) : reject(r.code);
        if (r.code === 1000) {
            reslove(r.data)
        } else {
            if (r.code === 4101) {
                removeToken();
                localStorage.removeItem('ROUTES');
                Message({
                    message: "认证失败，请重新登录",
                    type: 'error',
                    duration: 1500,
                    onClose: () => {
                        location.reload()
                    }
                })
            } else {
                let t = '操作失败';
                t = reason(r.code)
                Message.error(t)
            }
            reject(r.code)
        }
    }).catch(e => {
        let str = "请求失败";
        if (e.toString().includes('timeout of')) {
            str = "请求超时"
        }
        Message.error(str)
        reject()
    }))
};

const post = (url, arg = {}) => {
    const token = getToken();
    if (!token) {
        return;
    }
    return pipe(axios.post(url, qs.stringify({...arg,token})));
}
const get = (url, arg = {}) => {
    const token = getToken();
    if (!token) {
        return;
    }
    return pipe(axios.get(arg ? url + '?' + qs.stringify({...arg, token}) : url));
}
const put = (url, arg = {}) => {
    const token = getToken();
    if (!token) {
        return;
    }
    return pipe(axios.put(url, qs.stringify({...arg, token})));
}
const del = (url, arg = {}) => {
    const token = getToken();
    if (!token) {
        return;
    }
    return pipe(axios.delete(url, {
        params: { ...arg, token }
    }));
}
const postForm = (url, args = {}) => {
    const token = getToken();
    if (!token) {
        return;
    }
    const o = new FormData();
    const arg = { ...args,token }
    Object.keys(arg).forEach(k => {
        if (arg[k] instanceof Array) {
            arg[k].forEach(v => {
                o.append(k,v)
            })
        } else {
            o.append(k, arg[k])
        }
    });
    return pipe(axios.post(url, o, {
        'Content-Type': 'multipart/form-data'
    }));
};

/* 带进度获取的form提交 */
const stepForm = (url, args = {},fn) => {
    const token = getToken();
    if (!token) {
        return;
    }
    const o = new FormData();
    const arg = { ...args,token }
    Object.keys(arg).forEach(k => {
        if (arg[k] instanceof Array) {
            arg[k].forEach(v => {
                o.append(k,v)
            })
        } else {
            o.append(k, arg[k])
        }
    });
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        timeout: null,
        onUploadProgress: function(e) {
            fn && fn(Math.round(e.loaded * 100 / e.total))
        }
    }
    return pipe(axios.post(url, o, config));
};

const noToken = (url, arg) => pipe(axios.post(url, qs.stringify(arg)));

export {
    post,
    get,
    put,
    del,
    postForm,
    stepForm,
    noToken
}