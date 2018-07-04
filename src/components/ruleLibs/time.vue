<template>
    <el-date-picker
                    type="date"
                    v-model="val"
                    @change="renew"
                    :editable="false"
                    placeholder="出生日期" />
</template>

<script>
export default {
  props: ['value','label'],
  mounted () {
    this.val = this.value;
  },
  data () {
      return {
          val: null
      }
  },
  methods: {
      renew(val) {
          this.$emit('update:value', val)
      }
  }
}
</script>
