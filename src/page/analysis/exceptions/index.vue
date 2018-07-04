<template>
  <div>
      <component :is='current' @getRule='getRuleDetail' @toggle='toggle'></component>
  </div>
</template>

<script>
import SearchPage from './components/Search'
import Rules from './components/Rules'
import EditRule from './components/EditRule'

export default {
    components: {
        SearchPage,
        Rules,
        EditRule
    },
    data () {
        return {
            current: 'SearchPage',
            editRule: null
        }
    },
    methods: {
        toggle(t) {
            if (this.current === t) return;
            this.current = t;
        },
        getRuleDetail(id) {
            if (this.editRule != id) {
                this.editRule = id;
                /* 获取规则详情 */

            }
            this.current = 'EditRule'
        }
    }
}
</script>