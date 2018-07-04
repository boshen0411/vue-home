<template>
	<div class="app-wrapper">
		<!-- navbar -->
		<navbar></navbar>
		<div class="main-container">
			<!-- sidebar -->
			<sidebar class="sidebar-container"
			         :fold="fold"></sidebar>
			<!-- mainbody -->
			<app-main :style="{ marginLeft: fold ? '70px' : '200px' }"></app-main>
		</div>
	</div>
</template>

<script>
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import AppMain from './AppMain'

import { getToken } from 'auth'
import { verifyToken } from 'api/login'

export default {
	name: 'layout',
	components: {
		Sidebar,
		Navbar,
		AppMain
	},
	data() {
		// const w = window.screen.width;
		const w = document.body.clientWidth || document.documentElement.clientWidth;
		return {
			fold: w <= 1300
		}
	},
	created() {
		// 检查本地token是否有效
		let tk = getToken();
		if (tk) {
			verifyToken().done(() => {
				if (!this.$store.getters.treeArr.length) {
					this.$store.dispatch('template/InitialTree')
				}
			})
		}
	}
}
</script>

<style lang="scss">
@import '~style/basic/param';

.app-wrapper {
	height: 100%;
	width: 100%;
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}
}

.main-container {
	position: relative;
	min-height: 100%;
	margin-top: $bar-height;
	transition: margin-left 0.3s ease-out;
}

.el-menu.sidebar-container {
	height: 100%;
	position: fixed;
	top: $bar-height;
	left: 0;
	bottom: 0;
	z-index: 888;
	font-size: 0;
	overflow-y: auto;
	border-radius: 0;
	color: #fff;
	background-color: $color-dark-blue;
	transition: width 0.3s ease-out;
	&:not(.el-menu--collapse) {
		width: 200px;
	}
	&.el-menu--collapse {
		width: 70px;
		overflow: visible;
		>.menu-wrapper>.el-submenu>.el-submenu__title {
			font-size: 0;
			.el-submenu__icon-arrow {
				display: none;
			}
		}
		li {
			position: relative;
			&:hover {
				.tool-tip {
					position: absolute;
					top: 10px;
					left: 80px;
					z-index: 9;
					display: block;
					height: 50px;
					line-height: 50px;
					padding: 0 1em;
					text-align: center;
					font-size: 16px;
					color: #fff;
					background: $color-deep-blue;
					border-radius: 4px;
					&:before {
						content: '';
						position: absolute;
						top: 20px;
						left: -6px;
						border-top: 5px transparent solid;
						border-bottom: 5px transparent solid;
						border-right: 8px $color-deep-blue solid;
					}
				}
			}
		}
	}
	&::-webkit-scrollbar {
		display: none;
	}
	a {
		display: block;
	}
	.png-icon {
		margin-right: 1em;
	}
	.el-menu-item,
	.el-submenu__title {
		height: 70px;
		line-height: 70px;
		font-size: 16px;
		color: #fff;
	}
	.el-submenu__title {
		background-color: #002c6c;
	}
	.el-submenu .el-menu {
		background-color: $color-dark-blue;
	}
	.el-menu-item:hover,
	.el-menu-item.is-active,
	.el-submenu .el-menu-item:hover,
	.el-submenu__title:hover {
		background-color: #015dbc;
	}
}
</style>
