/* 全站公共配置信息项 */

/* 
 * API相关配置
 * 线上地址: 39.108.138.250
 * 本地服务器: 192.168.31.111
 * 本地调试: 192.168.31.152:8080
 * 项目名
 *  * 本地调试: yuanjuren
 *  * 线上及服务器: facecloud
 */
/*
 * 调用方法：
 * ws_url 已添加为vue的原型属性，vue.$wshost即可调用
 * 其他变量引用本文件对应变量即可： import { xxx } from 'config.js'
 */

// const ip = 'localhost:8080'
// const ip = '58.19.230.84:59991'
const ip = '10.0.0.8:9090'
const project = 'yuanjuren'

const host = process.env.NODE_ENV === 'production' ? location.host : ip
const host_name = process.env.NODE_ENV === 'production' ? location.hostname : '10.0.0.220'

const api = `//${host}/${project}/api`

const ws_url = `ws://${host}/${project}`

const cdn_url = `${ location.protocol }//${host}/facecloud-cdn`

const img_url = `http://${host_name}:8081`

export {
    host,
    api,
    cdn_url,
    ws_url,
    img_url
}