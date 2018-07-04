<template>
	<div class="query-list">
		<h3>检索条件</h3>
		<ul class="ui-scrollbar list" v-if="list.length">
			<li v-for="i in list"
			    :key="i">
				<span>条件{{i}}</span>
				<i @click="$emit('toggle',i)"></i>
			</li>
		</ul>
		<div class="empty" v-else>
			<p>暂无检索条件</p>
		</div>
		<span class="ts-button"
		      @click="$emit('toggle')">添加</span>
	</div>
</template>

<script>
export default {
	data () {
		return {
			list: [1,2,3,4,5,6]		
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~style/basic/param';

.query-list {
	height: 100%;
	h3 {
		width: 120px;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		text-align: center;
		font-size: 16px;
		border: 1px $color-light-blue solid;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	.ts-button {
		display: block;
		width: 120px;
		margin: 10px auto;
		text-align: center;
		font-size: 15px;
	}
}

.list {
	height: calc(100% - 110px);
	overflow-y: auto;
	margin-top: 20px;
	padding: 0 20px;
	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 36px;
		line-height: 36px;
		font-size: 14px;
	}
	i {
        display: block;
        width: 20px;
        height: 19px;
        background: url('~assets/icons/edit_green-s.png') no-repeat center;
        background-size: contain;
        cursor: pointer;
        &:hover {
            opacity: .8;
        }
    }
}

.empty {
	padding: 10px 0;
	text-align: center;
	font-size: 14px;
	color: #97a8be;
	p {
		margin: 20px 0;
	}
}

</style>


