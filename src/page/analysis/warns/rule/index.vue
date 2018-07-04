<template>
  <div>
      <component :is='current' @getRule='getRuleDetail' @toggle='toggle'></component>
  </div>
</template>

<script>
import Rules from './components/Rules'
import EditRule from './components/EditRule'

export default {
    components: {
        Rules,
        EditRule
    },
    data () {
        return {
            current: 'Rules',
            editRule: null
        }
    },
    methods: {
        toggle(t) {
            if (this.current === t) return;
            this.current = t;
        },
        getRuleDetail(id) {
            this.editRule = id;
            // console.log('编辑规则：',id)            
            this.current = 'EditRule'
        }
    }
}
</script>