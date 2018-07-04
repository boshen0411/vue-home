/*
 * @Author: nooldey 
 * @Date: 2017-08-04 16:35:52 
 * @Last Modified by: nooldey
 * @Last Modified time: 2017-09-19 15:58:41
 * @description: 主页面入口
 */

import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import App from './app'
import store from './store'
import Element from 'Element'
import Expand from 'expand'
import VueAMap from 'vue-amap'
import 'addSvgs'
import loadbar from '@/ProgressBar'
import SvgIcon from '@/SvgIcon'
import { getToken } from './utils/auth'
import Loading from '@/loading/index.js'
import HoverTip from '@/hoverTip/index.js'
import VueResource from 'vue-resource'

import 'mock/index'

Vue.use(Expand)
Vue.use(VueResource)
const bar = Vue.prototype.$bar = new Vue(loadbar).$mount()
document.body.appendChild(bar.$el)

// 注册组件
Vue.component('SvgIcon',SvgIcon)
Vue.use(Element)

// 加載地圖
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
	key: '17b46584e529a422426637a6756c3f19',
	plugin: [ 'Heatmap','Walking' ]
	// plugin: [ 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Heatmap' ]
});


// 注册指令
Vue.directive('loading', Loading)
Vue.directive('hoverTip', HoverTip)

// 路由权限管理部分--start
function hasPermission(routes, route) {
	if (route.name) {
		return routes.indexOf(route)
	} else {
		return true;
	}
}
const whiteList = ['/login']
// 路由权限管理部分--end

Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true
Vue.http.options.xhr = {
  withCredentials: true
}

router.beforeEach((to, from, next) => {
	bar.start()
	if (getToken()) {
		if (to.path === '/login') {
			next({
				path: '/'
			})
		} else {	
			// 登录时生成的路由存放在store和localStorage
			// 进入路由时，判断store.getters.addRouters是否存在路由
			// 存在，则hasPermission判断能否进入
			// 否则，生成路由(根据localStorage)或者登出
			let myroute = localStorage.ROUTES && JSON.parse(localStorage.ROUTES);
			if (store.getters.addRouters.length) {
				if (hasPermission(myroute, to.meta)) {
					next()
				} else {
					next({ path: '/404', query: { noGoBack: true } })
				}
			} else {
				if (myroute && myroute.length) {
					store.dispatch('permission/GenerateRoutes', myroute).then(() => {
						router.addRoutes(store.getters.addRouters)
						next({ ...to})
					}).catch(e => {
						store.dispatch('user/SeLogOut').done(() => {
							next({
								path: '/login'
							})
						})
					})
				} else {
					store.dispatch('user/SeLogOut').done(() => {
						next({
							path: '/login'
						})
					})
				}
			}
		}
	} else {
		if (whiteList.indexOf(to.path) > -1) {
			// 白名单直接访问
			next()
		} else {
			next('/login')
			// bar.finish()
		}
	}
})
router.afterEach(route => {
	bar.finish()
})

// 組件掛載
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')