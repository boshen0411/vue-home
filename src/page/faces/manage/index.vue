<template>
	<div class="sync-wrap">
		<div class="tab-btns">
			<span v-for="(tab,idx) in tabs"
			      :key="idx"
			      :class="{active:tab.id===currentTab}"
			      @click="switchTab(tab.id)">
				{{tab.name}}</span>
		</div>
		<div class="row-wrapper">
			<section class="col-left">
				<tree-bar :current="currentNode" :setCurrent="setCurrent"></tree-bar>
			</section>
			<component class="col-right" :current="currentNode" :is="currentTab"></component>
		</div>
	</div>
</template>

<script>
import Database from './components/DataBase'
import Fromfile from './components/FromFiles'
import TreeBar from './components/treeBar'

export default {
	components: {
		Database,
		Fromfile,
		TreeBar,
	},
	data() {
		return {
			currentNode: "",
			tabs: [
				{
					id: "Database",
					name: '公安局'
				},
				{
					id: "Fromfile",
					name: '文件导入'
				}],
			currentTab: 'Database'
		}
	},
	methods: {
		switchTab(id) {
			if (this.currentTab == id) return;
			this.currentTab = id;
		},
		setCurrent(id) {
            if (this.currentNode == id) {
                return;
            };
            this.currentNode = id;
        },
	}
}
</script>

<style lang="scss" scoped>
@import '~style/basic/param';
.col-left {
	min-height: calc(100vh - 168px);
	padding: 20px 10px;
	font-size: 14px;
	color: #fff;
	border-radius: 2px;
	background-color: $color-dark-blue;
	user-select: none;
	-ms-user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;
}

.col-right {
	min-height: calc(100vh - 168px);
	padding: 20px 20px 30px 20px;
	background-color: $color-dark-blue;
}

.tab-btns {
	margin-bottom: 20px;
	color: #fff;
	font-size: 18px;
	border-bottom: 2px solid $color-deep-blue;
	span {
		display: inline-block;
		width: 120px;
		height: 58px;
		line-height: 58px;
		text-align: center;
		cursor: pointer;
		&.active {
			position: relative;
			color: #41baff;
			cursor: default;
			&::after {
				content: "";
				display: block;
				width: 120px;
				height: 2px;
				position: absolute;
				left: 0;
				bottom: -2px;
				background-color: #41baff;
			}
		}
	}
}
</style>

