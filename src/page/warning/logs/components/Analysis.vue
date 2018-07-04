<template>
    <div :class="$css.scroll_wrap">
        <span v-if="!list.length" :class="$css.empty">暂无数据</span>
        <template v-else>
            <ul class="ui-scrollbar" :class="$css.analysis2">
                <li :key="o" v-for="o of 20">
                    <span>数据分析</span>
                    <time>2017-10-08 10:00:50</time>
                </li>
            </ul>
            <div :class="$css.pagination">
                <p>第 1 ~ 3 条</p>
                <el-select
                    :class="$css.selector"
                    v-model="page"
                    size="mini"
                >
                    <el-option
                        v-for="o in options"
                        :key="o.value"
                        :label="'第' + o.label + '页'"
                        :value="o.value"
                    >
                    </el-option>
                </el-select>
                <p>共 254 条</p>
            </div>
        </template>
    </div>
</template>
<script>
    export default {
        props: [ '$css' ],
        data(){
            return {
                page: '第 1 页',
                options: [
                    { label: '1', value: '1' },
                    { label: '2', value: '2' }
                ],
                list: []
            }
        }
    }
</script>
