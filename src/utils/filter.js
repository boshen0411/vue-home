/**
 * vue 全局filter
 */
 // 日期格式化

 import { cdn_url } from '../config'

const format = (s, c = '-', n = 19) => {
    if ('string' !== typeof s){
        return s
    }
    const x = new Date(+new Date(s) + 288e5).toJSON().substr(0,n).replace('T',' ').replace(/-/g, c)
    return x
}

// cdn
const cdn = u => {
    if (!u) {
        return require('assets/temp/defaultpro.png')
    }
    if (/^http(s)?\:.+?/.test(u)) {
        return u
    } else {
        return `${ cdn_url }/${ u }`;
    }
}

// 性別
const gender = x => ({ M: '男', F: '女' }[x] || '')

/**
 * 數字分割，如：1234567890 --> 1,234,567,890
 * @param {*} x 數字或字符春
 * @param {*} s 分隔符，默認,
 */
const split = (x = '', s) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, s || ',')
}

export default {
    format,
    cdn,
    gender,
    split
}
