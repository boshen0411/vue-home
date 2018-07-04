/*
 * @Author: nooldey 
 * @Date: 2017-09-12 18:25:57 
 * @Last Modified by: nooldey
 * @Last Modified time: 2017-09-12 18:28:15
 * 首页
 */

import { post } from 'fetch'

/* B1.首页设备,人口库等总数查询 */
const pullTotal = () => post('/basic/statistic/info')

 /*
 NOTE:本页以下接口均为前端假接口 
 */
const home = args => post('/home/home', args)
const device = args => post('/home/device', args)
const scale = args => post('/home/scale', args)
const people = args => post('/home/people', args)
const warning = args => post('/home/warning', args)

export {
    pullTotal,
    home,
    device,
    scale,
    people,
    warning
}