<template>
    <ul class="ui-scrollbar" :class="$css.list">
        <span>暂无数据</span>
        <!-- <li :key="o" v-for="o of 40">94:65:2d:89:0d:f8</li> -->
    </ul>
</template>
<script>
    export default {
        props: [ '$css' ]
    }
</script>
