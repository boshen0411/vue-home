<template>
    <div class="tree-node"
         :class="`level-${node.level}`">
        <div class="tree-node-ctx">
            <p :style="`padding-left:${(node.level-1)*2}em;`">
                <!-- node-name -->
                <span>
                    <template v-if="isFolder&&node.level>1">
                        <i class="add"
                           v-show="!node.isOpen">
                        </i>
                        <i class="minus"
                           v-show="node.isOpen">
                        </i>
                    </template>
                    <em @click="toggle">
                        {{node.name}}
                    </em>
                </span>
                <span v-if="node.level===1"
                      class="zicon">
                    <!-- 一级类目 -->
                    <i class="edit_sm"
                       @click="editNode(node,parentList)"></i>
                    <svg-icon ico="level1_add"
                              @click.native="addChild">
                    </svg-icon>
                    <!-- NODE:常住、临时人口栏目不可删除 -->
                </span>
                <span v-else
                      class="zicon" @click="editNode(node, parentList)">
                    <!-- 一级以下类目 -->
                    <i class="edit_sm"
                       @click="editNode(node,parentList)"> </i>
                    <i class="add_sm"
                       @click="addChild"
                       v-if="node.level<4"> </i>
                </span>
            </p>
        </div>
        <!-- node-childs -->
        <el-collapse-transition>
            <div class="tree-list"
                 v-show="node.isOpen"
                 v-if="isFolder">
                <div class="tree-wrap">
                    <tree-node v-for="(child,index) in node.list"
                               class="transition-box"
                               :node="child"
                               :parentList="node.list"
                               :addNode="addNode"
                               :editNode="editNode"
                               :key="index">
                    </tree-node>
                </div>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>
import TreeNode from './TreeNode'

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
    name: "TreeNode",
    components: {
        TreeNode
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
        addNode: {
            type: Function
        },
        editNode: {
            type: Function
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
        },
        addChild() {
            if (!this.isFolder) {
                this.$set(this.node, 'list', [])
                this.$set(this.node, 'isOpen', true)
            }
            this.addNode(this.node)
        },
    }
}
</script>

<style lang="scss" scoped>
@import '~style/basic/utils';
@import '~style/basic/param';

.tree-node {
    i:after {
        content: "";
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
    }
    i {
        &.add:after {
            background-image: url('~assets/icons/level2_add.png');
        }
        &.minus:after {
            background-image: url('~assets/icons/level2_minus.png');
        }
        &.edit_sm:after {
            background-image: url('~assets/icons/edit.png');
        }
        &.add_sm:after {
            background-image: url('~assets/icons/level3_add.png');
        }
    }
    .zicon {
        float: right;
        margin-right: 20px;
        visibility: hidden;
    }
}

.tree-new {
    @include clearfix();
    .zicon {
        visibility: visible;
    }
}

.tree-node-ctx {
    width: 100%;
    height: 36px;
    line-height: 36px;
    @include clearfix();
    &:hover {
        .zicon {
            visibility: visible;
        }
    }
    .svg-icon {
        cursor: pointer;
    }
    em {
        display: inline-block;
        vertical-align: middle;
        max-width: 6em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-style: normal;
        margin-right: 5px;
        cursor: pointer;
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


