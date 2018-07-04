/*
 * @Author: nooldey 
 * @Date: 2017-08-04 08:58:59 
 * @Last Modified by: nooldey
 * @Last Modified time: 2017-09-14 15:44:13
 * @discription: 路由定义
 */

import Vue from 'vue'
import Router from 'vue-router'
import Layout from 'view/layout/Layout'

Vue.use(Router)

const pipe = x => () => import(`~/${x}/index`)

// 固定路由
export const constantRouterMap = [
	{
		path: '/login',
		component: pipe('login'),
		hidden: true
	},
	{
		path: '/404',
		component: pipe('error/404'),
		hidden: true
	}
]

export default new Router({
	routes: constantRouterMap
	// mode: 'history'
})

// 动态路由
export const asyncRouterMap = [
	{
		path: '/',
		// name: '首页',
		hidden: true,
		component: Layout,
		children: [
			{
				path: '/',
				name: '首页',
				component: pipe('home')
			}
		]
	},
	{
		path: '/warning',
		name: '警情管理',
		icon: 'warning',
		component: Layout,
		children: [
			{
				path: 'realtime',
				name: '实时警情',
				component: pipe('warning/realtime')
			},
			{
				path: 'logs',
				name: '警情记录',
				component: pipe('warning/logs')

			}
		]
	},
	// {
	// 	path: '/analysis',
	// 	name: '数据分析',
	// 	icon: 'locus',
	// 	component: Layout,
	// 	children: [
	// 		{
	// 			path: 'exceptions',
	// 			name: '异常事件分析',
	// 			component: pipe('analysis/exceptions')
	// 		},
	// 		{
	// 			path: 'warns',
	// 			noDropdown: true,
	// 			component: () => import('@/RouterView'),
	// 			children: [
	// 				{
	// 					path: '',
	// 					name: '警情统计分析',
	// 					component: pipe('analysis/warns/index')
	// 				},
	// 				{
	// 					path: 'rule',
	// 					name: '报警级别列表',
	// 					hidden: true,
	// 					component: pipe('analysis/warns/rule')
	// 				}
	// 			]
	// 		},
	// 		{
	// 			path: 'search',
	// 			name: '检索分析',
	// 			component: pipe('analysis/search')
	// 		}
	// 	]
	// },
	{
		path: '/faces',
		name: '人脸库',
		icon: 'people',
		component: Layout,
		children: [
			{
				path: 'search',
				// name: '库数据检索',
				noDropdown: true,
				component: () => import('@/RouterView'),
				children: [
					{
						path: '',
						name: '库数据检索',
						component: pipe('faces/search/home')
					},
					{
						path: 'detail',
						name: '档案查看',
						hidden: true,
						component: pipe('faces/search/detail')
					},
					{
						path: 'add',
						name: '档案新增',
						hidden: true,
						component: pipe('faces/search/add')
					}
				]
			},
			{
				path: 'manage',
				name: '库数据管理',
				component: pipe('faces/manage')
			}
			// {
			// 	path: 'update',
			// 	name: '库数据更新',
			// 	component: pipe('faces/update')
			// }
		]
	},
	{
		path: '/record',
		name: '记录管理',
		icon: 'snap',
		component: Layout,
		children: [
			{
				path: 'logs',
				name: '记录日志',
				component: pipe('record/logs')
			},
			{
				path: 'contrast',
				name: '比中日志',
				component: pipe('record/prop')
			},
			{
				path: 'recycle',
				name: '记录回收站',
				component: pipe('record/recycle')
			}
		]
	},
	{
		path: '/device',
		name: '设备管理',
		icon: 'equipment',
		component: Layout,
		children: [
			{
				path: 'services',
				name: '服务与设备',
				component: pipe('device/services')
			}
		]
	},
	{
		path: '/system',
		name: '系统设置',
		icon: 'member',
		component: Layout,
		children: [
			{
				path: 'member',
				// name: '用户管理',
				noDropdown: true,
				component: () => import('@/RouterView'),
				children: [
					{
						path: 'list',
						name: '用户管理',
						component: pipe('system/member/list')
					},
					{
						path: 'modify',
						name: '新建/编辑用户',
						hidden: true,
						component: pipe('system/member/modify')
					}
				]
			},
			{
				path: 'role',
				noDropdown: true,
				component: () => import('@/RouterView'),
				children: [
					{
						path: 'list',
						name: '角色管理',
						component: pipe('system/role/list')
					},
					{
						path: 'modify',
						name: '新建/编辑角色',
						hidden: true,
						component: pipe('system/role/modify')
					}
				]
			}
			// {
			// 	path: 'log',
			// 	name: '日志中心',
			// 	component: pipe('system/log')
			// }
		]
	},
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
]