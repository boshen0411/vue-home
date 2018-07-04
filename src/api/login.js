/*
 * @Author: nooldey 
 * @Date: 2017-09-12 18:27:27 
 * @Last Modified by: nooldey
 * @Last Modified time: 2017-09-18 09:23:49
 * 登录相关
 */


import { noToken, post } from 'fetch'

/* U1.登录接口 */
const login = (username, password) =>  noToken('/user/login',{ username, password })

/* U2.登出接口 */
const logout = () => post('/user/logout', {})

/* U10.修改用户密码 */
const editPassword = args => post('/user/update/password', args)

/* U11.验证TOKEN */
const verifyToken = () => post('/user/validate/token',{})

export {
    login,
    logout,
    editPassword,
    verifyToken
}