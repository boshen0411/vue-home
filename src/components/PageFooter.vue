<template>
	<section class="page-footer-box" v-show="total > 1 && !loading">
		<div class="page-footer">
			<span class="arrow" :class="{'inval': cur <= 1}" @click="turn(cur-1)">&lt;</span>
			<span v-for="n in left" key="n" @click="turn(n,'left')" :key="n">{{ n }}</span>
			<span class="active">{{ cur }}</span>
			<span v-for="n in right" key="n" @click="turn(n,'right')" :key="n">{{ n }}</span>
			<span class="arrow" :class="{'inval': cur >= total}" @click="turn(cur-0+1)">&gt;</span>
		</div>
		<div class="jump">跳至<input type="text" v-model.number="jumpPage" @keydown.enter="turn(jumpPage)">页</div>
	</section>
</template>

<script>
export default {
	props: {
		total: {	// 总页数
			type: [String, Number],
			default: 0
		},
		cur: {		// 当前页码
			type: [String, Number],
			default: 1
		},
		loading: {
			type: [String, Number, Boolean],
			default: false
		}
	},
	data () {
		return {
			jumpPage: 1
		}
	},
	computed: {
		left () {
			const cur = Number(this.cur);
			let left = [];
			if (cur > 1) {
				if (cur <= 4) {
					for( let i = 1; i < this.cur; i++ ) {
						left.push(i);
					}
				} else {
					left = [1,'...'];
					left.push(cur - 2);
					left.push(cur - 1);
				}
			}
			return left;
		},
		right () {
			const total = this.total;
			const cur = Number(this.cur);
			let right = [];
			if (total - cur > 0) {
				if (total - cur < 4) {
					for(let i = cur + 1; i <= total; i ++) {
						right.push(i);
					}
				} else {
					right = ['...',total];
					right.unshift(cur + 2);
					right.unshift(cur + 1);
				}
			}
			return right;
		}
	},
	methods: {
		turn (page,type = '') {	// 翻页
			let to = '';
			if (page < 1 || page > this.total) return;
			if (page == '...') {
				const index = this[type].indexOf('...');
				if (type == 'left') {
					to = this.left[index + 1] - 1;
				} else {
					to = this.right[index - 1] + 1;
				}
			} else {
				to = page;
			}
			this.$emit('update:cur',to);	// 变更当前页码
			this.$router.push({			// 跳转到指定页面
                path: this.$route.path,
                query: {...this.$route.query,page: to}
            })
			this.$emit('turnPage',to);		// 翻页时触发的函数
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~style/basic/param';
$lightGray: #d3dce6;

.page-footer-box {
	width: 100%;
	text-align: center;
	font-size: 0;
}

.page-footer {
	vertical-align: top;
	display: inline-block;
	text-align: center;
	font-size: 0;
	overflow: hidden;
	border-radius: 2px;
	span {
		vertical-align: top;
		display: inline-block;
		min-width: 28px;
		height: 28px;
		padding: 0 3px;
		background: #fff;
		border: 1px solid transparent;
		text-align: center;
		line-height: 28px;
		font-size: 13px;
		color: #333;
		cursor: pointer;
		user-select: none;
		& + span {
			border-left: 1px solid $lightGray;
		}
		&.inval {
			color: $lightGray;
			cursor: default;
		}
		&:not(.active):not(.inval):hover {
			border: 1px solid $color-light-blue;
			color: $color-light-blue;
		}
		&.active {
			background: $color-light-blue;
			color: #fff;
			cursor: default;
		}
		&.arrow {
			font-family: 'simsun';
		}
	}
}

.jump {
	margin-left: 10px;
	vertical-align: top;
	display: inline-block;
	line-height: 28px;
	font-size: 13px;
	color: #fff;
	> input {
		margin: 0 6px;
		vertical-align: top;
		display: inline-block;
		width: 34px;
		height: 28px;
		border-radius: 2px;
		background: #fff;
		border: 1px solid $lightGray;
		text-align: center;
		line-height: 28px;
		font-size: 13px;
		color: #333;
	}
}
</style>