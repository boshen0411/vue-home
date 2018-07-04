<template>
    <div class="tree-menu">
        <template v-if="treeEditable">
            <keep-alive>
                <edit-tree class="ui-scrollbar"></edit-tree>
            </keep-alive>
            <p class="edit-btn">
                <span @click="addNow=true"
                      class="ts-button">添加</span>
                <span @click="cancelEdit"
                      class="ts-button">保存</span>
            </p>
        </template>
        <template v-else>
            <keep-alive>
                <tree class="ui-scrollbar"
                      :current="current"
                      :setCurrent="setCurrent"></tree>
            </keep-alive>
            <p class="edit-btn">
                <span @click="toggleView"
                      class="ts-button">编辑</span>
            </p>
        </template>
        <add-dialog v-if="addNow"
                    @submit="submitAdd"
                    @close="addNow = false">
        </add-dialog>
    </div>
</template>

<script>
/*
* @treeArr
* @arguments:
    id: 唯一标识符ID
    name: 标签显示名
    warn: 是否预警标识
    children: 子级菜单
*/
import Tree from '@/pureTree/ShowTree'
import EditTree from '@/editTree/Tree'
import AddDialog from '@/editTree/AddDialog'
export default {
    props: {
        current: String,
        setCurrent: Function
    },
    components: {
        Tree,
        EditTree,
        AddDialog
    },
    data() {
        return {
            treeEditable: false,
            addNow: false
        }
    },
    methods: {
        toggleView() {
            this.treeEditable = true;
        },
        cancelEdit() {
            this.treeEditable = false;
        },
        submitAdd(o) {
            if (!o.name) {
                return this.$message.warning("请填写模块名")
            }
            let nodes = this.$store.getters.treeArr;
            let exist = nodes.some(a => a.name === o.name)
            if (exist) {
                return this.$message.warning("模块名已存在，请检查")
            }
            this.$store.dispatch('template/addTreeBranch', {
                name: o.name,
                state: o.state,
                warningValue: o.warningValue,
                pid: 0
            }).done(() => {
                this.addNow = false
            })
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~style/basic/param';
@import '~style/basic/utils';
.tree-menu {
    // width: 300px;
    // height: calc(100vh - 104px);
    // padding: 20px 10px;
    // font-size: 16px;
    // color: #fff;
    // border-radius: 2px;
    // background-color: $color-dark-blue;
    // user-select: none;
    // -ms-user-select: none;
    // -moz-user-select: none;
    // -webkit-user-select: none;
    height: 100%;
    .ui-scrollbar {
        min-height: calc(100% - 60px);
        overflow-y: auto;
    }
}

.edit-btn {
    text-align: center;
    margin: 8px auto;
    .ts-button {
        font-size: 14px;
        padding: 5px 18px;
        &:first-child {
            margin-right: 10%;
        }
    }
}

.new-tree {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    border-radius: 4px;
    background-color: $color-deep-blue;
    input {
        background: transparent;
        height: 35px;
        line-height: 35px;
        color: #fff;
        outline: none 0;
        border: none 0;
    }
}
</style>
