<template>
    <input type="text" placeholder="请输入" v-model="txt" @change="renew">
</template>

<script>
export default {
    props: ['value', 'label'],
    data() {
        return {
            txt: null
        }
    },
    mounted () {
        this.txt = this.value
    },
    methods: {
        renew() {
            this.$emit('update:value', this.txt)
        }
    }
}
</script>

