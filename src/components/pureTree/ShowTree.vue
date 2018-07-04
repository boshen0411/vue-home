<template>
  <div class="z-tree">
    <template v-for="(child,index) in nodes">
      <tree-branch :node="child"
                   :parentList="nodes"
                   :current="current"
                   :setCurrent="setCurrent"
                   :key="index">
      </tree-branch>
    </template>
  </div>
</template>
<script>
import TreeBranch from './ShowTreeNode'

export default {
  props: {
        current: String,
        setCurrent: Function
    },
  components: {
    TreeBranch
  },
  computed: {
    nodes() {
      return this.$store.getters.treeArr;
    }
  }
}
</script>