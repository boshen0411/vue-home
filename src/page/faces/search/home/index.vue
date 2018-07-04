<template>
  <div class="row-wrapper">
    <section class="col-left">
      <!-- <side-tree
                 :currentNode="current"
                 :setCurrent="setCurrent"></side-tree> -->
      <tree-bar :current="currentNode" :setCurrent="setCurrent"></tree-bar>
    </section>
    <operate class="col-right" :current.sync="currentNode" ref="ope"></operate>
  </div>
</template>

<script>
import TreeBar from './components/treeBar'
export default {
  components: {
    sideTree: () => import('@/searchTree/SideTree'),
    operate: () => import('./components/Operate'),
    TreeBar
  },
  mounted() {
    // this.$router.push(this.$route.path)
  },
  data() {
    return {
      currentNode: sessionStorage.getItem('current') || ""
    }
  },
  methods: {
    setCurrent(id) {
        this.$refs.ope.globalFlag = false
        if (this.currentNode == id) {
            return;
        };
        this.$router.push('/faces/search')
        this.currentNode = id;
        window.sessionStorage.setItem('current', id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~style/basic/param';

.col-left {
  min-height: calc(100vh - 88px);
  padding: 20px 10px;
  font-size: 16px;
  background-color: $color-dark-blue;
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}
</style>
