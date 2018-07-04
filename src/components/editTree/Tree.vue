<template>
  <ul class="z-tree">
    <template v-for="(child,index) in nodes">
      <tree-node :node="child"
                 :parentList="nodes"
                 :addNode="addChild"
                 :editNode="editNode"
                 :key="index">
      </tree-node>
    </template>
    <add-dialog v-if="showAdd"
                @submit="submitAdd"
                @close="showAdd = false">
    </add-dialog>
    <edit-dialog v-if="showEdit"
                @submit="submitEdit"
                @close="showEdit = false"
                @delete="removeNode"
                :form="curNode">
    </edit-dialog>
  </ul>
</template>
<script>
import TreeNode from './TreeNode'
import AddDialog from './AddDialog'
import EditDialog from './EditDialog'

export default {
  components: {
    TreeNode,
    AddDialog,
    EditDialog
  },
  computed: {
    nodes() {
      return this.$store.getters.treeArr;
    }
  },
  data() {
    return {
      showAdd: false,
      parentPid: null,
      showEdit: false,
      curNode: {},
      parentList: []
    }
  },
  methods: {
    addChild(node) {
      if (!node.id) {
        return this.$message.warning('当前节点无ID，无法添加下级节点')
      }
      this.curNode = node
      this.parentPid = node.id
      this.showAdd = true
    },
    submitAdd(o) {
      if (!o.name) {
        return this.$message.warning("请填写节点名称")
      }
      let exist = this.curNode.list.some(a => a.name === o.name)
      if (exist) {
        return this.$message.warning('节点名称已存在，请检查')
      }
      this.$store.dispatch('template/addTreeBranch', {
        name: o.name,
        state: o.state,
        warningValue: o.warningValue,
        pid: this.parentPid
      }).done(() => {
        this.showAdd = false;
      })
    },
    editNode(node, parent) {
      if (!node.id) {
        return this.$message.warning('当前节点无ID，无法编辑')
      }
      this.curNode = node;
      this.parentList = parent;
      this.showEdit = true;
    },
    submitEdit(o) {
      if (o.name === this.curNode.name && o.state === this.curNode.state && o.warningValue === this.curNode.warningValue) {
        this.$message("节点未改变")
        this.showEdit = false;
        return;
      }
      if (!o.name) {
        this.$message("请填写节点名称")
        return;
      }
      // 检查重复
      let exist = this.parentList.some(a => a.id != this.curNode.id && a.name === o.name)
      if (exist) {
        return this.$message.warning("节点名已存在，请检查")
      }
      // 提交修改
      this.$store.dispatch('template/editBranch', {
        id: this.curNode.id,
        name: o.name,
        state: o.state,
        warningValue: o.warningValue
      }).done(res => {
        this.showEdit = false;
      })
    },
    removeNode() {
      if (['常住人口', '临时人口'].indexOf(this.curNode.name) > -1) {
        return this.$message.warning("该节点不允许删除")
      }
      this.showEdit = false;
      this.$confirm(`此操作将删除${this.curNode.name}及其子节点，是否继续？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).done(() => {
        this.$store.dispatch('template/removeBranch', this.curNode)
      })
    }
  }
}
</script>
