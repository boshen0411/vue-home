<template>
    <div :class="`level-${node.level}`">
        <div class="tree-node-ctx"
             :class="{active:(node.id===currentNode||isMatched)}"
             @click="toggle">
            <p :style="`padding-left:${(node.level-1)*2}em;`">
                <span> {{node.name}} </span>
                <span v-if="node.level>1" class="zicon">
                    <svg-icon v-if="isFolder"
                              :ico="node.isOpen? 'el-icon-arrow-up': 'el-icon-arrow-down'">
                    </svg-icon>
                </span>
            </p>
        </div>
        <el-collapse-transition>
            <div class="tree-list"
                 v-if="isFolder"
                 v-show="node.isOpen">
                <div class="tree-wrap">
                    <side-branch class="transition-box"
                                 v-for="(child,index) in node.list"
                                 :node="child"
                                 :parentList="node.list"
                                 :currentNode="currentNode"
                                 :setCurrent="setCurrent"
                                 :searchText="searchText"
                                 @openParent="openMe"
                                 :key="index">
                    </side-branch>
                </div>
            </div>
        </el-collapse-transition>
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
    name: "SideBranch",
    components: {
        SideBranch
    },
    props: {
        node: {
            type: Object,
            required: true
        },
        parentList: {
            type: Array,
            required: true
        },
        currentNode: {
            type: String
        },
        setCurrent: {
            type: Function
        },
        searchText: {
            type: String
        }
    },
    data () {
        return {
            isMatched: false
        }
    },
    computed: {
        isFolder() {
            return this.node.list && this.node.list.length
        }
    },
    watch: {
        searchText(val) {
            if (!val || !this.node) return;
            if (this.node.name.indexOf(val) > -1) {
                // 设置标志
                this.setCurrent()
                this.isMatched = true;
                // 展开所从上级
                if (this.node.level > 1) {
                    this.$emit('openParent')
                }
            } else {
                this.isMatched = false;
            }
        }
    },
    methods: {
        toggle() {
            if (this.isFolder) {
                this.node.isOpen = !this.node.isOpen;
                // 根据当前节点开合进行其他节点开合
                if (this.node.isOpen) {
                    this.parentList.forEach(c => {
                        if (c.id != this.node.id) {
                            c.isOpen = false;
                            if (c.list && c.list.length) {
                                closeChild(c.list)
                            }
                        }
                    })
                } else {
                    closeChild(this.parentList)
                }
            }
            this.setCurrent(this.node.id)
        },
        openMe() {
            this.node.isOpen = true;
            if (this.node.level > 1) {
                this.$emit('openParent')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~style/basic/utils','~style/basic/param';;

.tree-node-ctx {
    width: 100%;
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    @include clearfix();
    &.active,
    &:hover {
        background-color: $color-light-blue!important;
    }
    .zicon {
        float: right;
        margin-right: 20px;
    }
}

.level-1 {
    >.tree-node-ctx {
        margin-bottom: 10px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        border-radius: 4px;
        background-color: $color-deep-blue;
    }
    >.tree-list {
        >.tree-wrap {
            margin-bottom: 10px;
            padding-top: 10px;
            padding-bottom: 10px;
            font-size: 14px;
            border-radius: 4px;
            background-color: #002c6c;
        }
    }
}
</style>


