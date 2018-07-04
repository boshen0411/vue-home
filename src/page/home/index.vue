<template>
    <div :class="$style.home_block">
		<amount :$css="$style" 
			:curType.sync="curType"
			:total="total" 
			@getList="getList"/>
		<div :class="$style.statistics">
			<tendency :$css="$style" 
				:dataList="lineList"
				:jsonStyle="lineStyle"
				:curType = "curType"/>
			<ranking :$css="$style" 
				:dataList="cirList"
				:jsonStyle="cirStyle"
				@getData="cirDefaultData"
				:curDataTab.sync="cirDataTab"/>
		</div>
		<activity :$css="$style" 
			:curvesList="curvesList"/>
    </div>
</template>
<script>
import Amount from './components/Amount';
import Tendency from './components/Tendency';
import Ranking from './components/Ranking';
import Activity from './components/Activity';
import { pullTotal, home, device, scale, people, warning } from 'api/home'

export default {
	components: {
		Amount,
		Tendency,
		Ranking,
		Activity
	},
	data() {
		return {
			total: {},
			curType: null,
			lineList: [],
			cirList: [],
			curvesList: [],
			lineStyle: '',
			cirStyle: '',
			cirDataTab: 0
		}
	},
	created(){
		pullTotal().done(o => this.total = o)
	},
	mounted() {
		this.getList()
	},
	methods: {
		getList(type) {
			if (!type) {
				home({}).then(({list}) => {
					this.lineStyle = 'json_bar'
					this.lineList = list
					this.cirDataTab = 0
					this.cirList = [
						{name:'抓拍', value:100},
						{name:'车载', value:200},
						{name:'手持', value:70},
						{name:'人证', value:50},
						{name:'其他', value:126}
					]
					this.cirStyle = 'json_loop'
				})
			} else if (type === 'device') {
				device({}).then(({list}) => {
					this.lineStyle = 'json_lineBar'
					this.lineList = list
					this.cirList = [
						{name:'龙湾镇', value:38},
						{name:'龙水镇', value:10},
						{name:'瑶溪镇', value:20},
						{name:'灵昆镇', value:28},
						{name:'其他', value:6}
					]
					this.cirStyle = 'json_cir'
				})
			} else if (type === 'scale') {
				scale({}).then(({list}) => {
					this.lineStyle = 'json_lineBar'
					this.lineList = list
					this.cirList = [
						{name:'常住', value:30},
						{name:'流动1', value:16},
						{name:'流动2', value:11},
						{name:'流动3', value:16},
						{name:'临时', value:16}
					]
					this.cirStyle = 'json_cir'
				})
			} else if (type === 'people') {
				people({}).then(({list}) => {
					this.lineStyle = 'json_dbLine'
					this.lineList = list
					this.cirList = [
						{name:'无嫌疑', value:30},
						{name:'一般嫌疑', value:13},
						{name:'高度嫌疑', value:22},
						{name:'危险', value:10},
						{name:'通缉', value:20}
					]
					this.cirStyle = 'json_cir'
				})
			} else if (type === 'warn') {
				warning({}).then(({list}) => {
					this.lineStyle = 'json_lineBar'
					this.lineList = list
					this.cirList = [
						{name:'龙湾镇', value:30},
						{name:'龙水镇', value:10},
						{name:'瑶溪镇', value:5},
						{name:'灵昆镇', value:8},
						{name:'其他', value:36}
					]
					this.cirStyle = 'json_cir'
				})
			}
		},
		cirDefaultData(idx) {
			if (idx === 0) {
				this.cirList = [
					{name:'抓拍', value:100},
					{name:'车载', value:200},
					{name:'手持', value:70},
					{name:'人证', value:50},
					{name:'其他', value:126}
				]
			} else if (idx === 1) {
				this.cirList = [
					{name:'龙湾镇', value:38},
					{name:'龙水镇', value:10},
					{name:'瑶溪镇', value:20},
					{name:'灵昆镇', value:28},
					{name:'其他', value:6}
				]
			} else if (idx === 2) {
				this.cirList = [
					{name:'龙湾镇', value:28},
					{name:'龙水镇', value:15},
					{name:'瑶溪镇', value:10},
					{name:'灵昆镇', value:8},
					{name:'其他', value:19}
				]
			} else if (idx === 3) {
				this.cirList = [
					{name:'龙湾镇', value:18},
					{name:'龙水镇', value:20},
					{name:'瑶溪镇', value:5},
					{name:'灵昆镇', value:8},
					{name:'其他', value:16}
				]
			} else if (idx === 4) {
				this.cirList = [
					{name:'龙湾镇', value:33},
					{name:'龙水镇', value:10},
					{name:'瑶溪镇', value:8},
					{name:'灵昆镇', value:6},
					{name:'其他', value:16}
				]
			} else if (idx === 5) {
				this.cirList = [
					{name:'龙湾镇', value:33},
					{name:'龙水镇', value:12},
					{name:'瑶溪镇', value:26},
					{name:'灵昆镇', value:27},
					{name:'其他', value:4}
				]
			}
		}
	}
}
</script>
<style lang="scss" src="./style" module/>
