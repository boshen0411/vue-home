<template>
    <div :class="$css.snapshot">
        <span v-if="!list.length" :class="$css.empty">暂无数据</span>
        <template v-else>
            <ul class="ui-scrollbar" :class="$css.analysis">
                <li :key="o" v-for="o of 20">
                    <span>数据分析</span>
                    <time>2017-10-08 10:00:50</time>
                </li>
            </ul>
            <button @click="refresh">刷新</button>
        </template>
    </div>
</template>
<script>
    export default {
        props: [ '$css' ],
        data() {
            return {
                list: []
            }
        },
        methods: {
            refresh() {
                this.$message.warning('暂无数据')
            }
        }
    }
</script>
