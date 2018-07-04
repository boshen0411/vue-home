<template>
    <ul class="ui-scrollbar" :class="$css.list">
        <span v-if="!list.length">暂无数据</span>
        <template v-else>
            <li :key="o" v-for="o of 40">94:65:2d:89:0d:f8</li>
        </template>
    </ul>
</template>
<script>
    export default {
        props: [ '$css' ],
        data() {
            return {
                list: []
            }
        }
    }
</script>
