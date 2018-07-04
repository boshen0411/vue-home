<template>
  <div class="z-tree">
    <div class="searchbar">
      <p>
        <svg-icon ico="search"
                  width="20px"
                  height="20px"></svg-icon>
        <input type="text"
               v-model="searchTmp"
               placeholder="请输入内容">

      </p>
      <span @click="search">搜索</span>
    </div>
    <div class="ui-scrollbar">
      <template v-for="(child,index) in nodes">
        <side-branch :node="child"
                     :parentList="nodes"
                     :currentNode="currentNode"
                     :setCurrent="setCurrent"
                     :searchText="searchText"
                     @openParent="child.isOpen=true"
                     :key="index">
        </side-branch>
      </template>
    </div>
  </div>
</template>
<script>
import SideBranch from './SideBranch'

// 定义关闭子节点递归函数
const closeChild = arr => {
  arr.forEach(c => {
    c.isOpen = false;
    if (c.list && c.list.length) {
      closeChild(c.list)
    }
  })
}

export default {
	props: {
		currentNode: {
			type: String
		},
		setCurrent: {
			type: Function
		}
	},
	components: {
		SideBranch
	},
	computed: {
		nodes() {
			return this.$store.getters.treeArr;
		}
	},
	data() {
		return {
			/*
			*searchTmp:暂存的搜索字段
			*searchText: 向下级传递的搜索字段
			*/
			searchTmp: '',
			searchText: ''
		}
	},
	methods: {
		search() {
			if (!this.searchTmp || this.searchText == this.searchTmp) {
				return;
			}
			closeChild(this.nodes)
			// 
			this.searchText = this.searchTmp;
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~style/basic/param';
.z-tree {
  height: 100%;
  .ui-scrollbar {
    height: calc(100% - 74px);
    overflow-y: auto;
  }
}

.searchbar {
  margin-bottom: 30px;
  white-space: nowrap;
  p {
    display: inline-block;
    vertical-align: middle;
    width: 238px;
    height: 40px;
    font-size: 0;
    border-radius: 4px;
    background-color: $color-deep-blue;
  }
  .svg-icon {
    margin: 0 10px;
  }
  input {
    display: inline-block;
    vertical-align: middle;
    width: 198px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background: transparent;
    outline: none 0;
    border: none 0;
    color: #fff;
  }
  span {
    display: inline-block;
    vertical-align: middle;
    padding: 10px 5px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
