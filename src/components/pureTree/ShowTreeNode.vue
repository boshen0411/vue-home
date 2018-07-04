<template>
    <div :class="`level-${node.level}`">
        <div class="tree-node-ctx"
             :class="{active:node.id===current}"
             @click.prevent="toggle">
            <p :style="`padding-left:${(node.level-1)*2}em;`" style="position: relative">
                <span>{{node.name}}</span>
                <span v-if="node.name === '布控人口'" class="zicon" @click.stop="warn(node)" style="position:absolute;right: 20px">
                    <svg-icon height="22px"
                              ico="warning"
                              >
                    </svg-icon>
                </span>
                <span v-if="node.level>1"
                      class="zicon"  @click="warn(node)">
                    <svg-icon height="22px"
                              ico="warning"
                              v-if="node.state=='Y'">
                    </svg-icon>
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
                    <tree-branch class="transition-box"
                                 v-for="(child,index) in node.list"
                                 :node="child"
                                 :parentList="node.list"
                                 :current="current"
                                 :setCurrent="setCurrent"
                                 :key="index">
                    </tree-branch>
                </div>
            </div>
        </el-collapse-transition>
        <warn-tree-node v-if="showWarn"
                @close="showWarn = false"
                :form="node">
        </warn-tree-node>
    </div>
</template>

<script>
import TreeBranch from './ShowTreeNode'
import WarnTreeNode from './WarnDialog'

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
    name: "TreeBranch",
    data() {
        return {
            showWarn: false
        }
    },
    components: {
        TreeBranch,
        WarnTreeNode
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
        current: {
            type: String,
            required: true
        },
        setCurrent: {
            type: Function,
            required: true
        }
    },
    computed: {
        isFolder() {
            return this.node.list && this.node.list.length
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
        warn(node) {
            if (node.state=='Y' || node.name === '布控人口') {
                this.showWarn = true
            };
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~style/basic/utils',
'~style/basic/param';

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
        .svg-icon {
            margin-right: 12px;
        }
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


