<template>
    <div :class="$css.scroll_wrap">
        <span v-if="!list.length" :class="$css.empty">暂无数据</span>
        <template v-else>
            <ul class="ui-scrollbar" :class="$css.comparison2">
                <li :key="o.id" v-for="o of list" :class="[ active === o.id && $css.active ]" @click="setCurrent(o)">
                    <p :class="$css.title">
                        <label>抓拍报警</label>
                        <time>{{o.warningTime | format}}</time>
                    </p>
                    <div :class="$css.detail">
                        <figure>
                            <img :src="img_url + o.recordPicture">
                            <figcaption>档案照片</figcaption>
                        </figure>
                        <p>
                            <router-link :to="'/faces/search/detail?id=' + o.recordId" target="_blank">{{ o.recordId }}</router-link>
                            <span>相似度：{{ o.similarity }}</span>
                        </p>
                        <figure>
                            <img :src="img_url + o.warningPicture">
                            <figcaption>抓拍照片</figcaption>
                        </figure>
                    </div>
                </li>
            </ul>
            <div v-if='total' :class="$css.pagination">
                <p>{{ step }}</p>
                <el-select
                    :class="$css.selector"
                    v-model="paginate"
                    size="mini"
                    @change="toggle"
                >
                    <el-option
                        v-for="i in options"
                        :key="i"
                        :label="'第' + i + '页'"
                        :value="i"
                    >
                    </el-option>
                </el-select>
                <p>共 {{ total }} 条</p>
            </div>
        </template>
    </div>
</template>
<script>
    import { queryList } from 'api/warning';
    import { img_url } from '../../../../config'
    export default {
        props: [ '$css', 'active' ],
        data(){
            return {
                page: 0,
                options: null,
                paginate: '第1页',
                img_url: img_url
            }
        },
        computed: {
            step(){
                const x = this.page * 10 + 1
                const y = Math.min(10 * (this.page + 1), this.total)
                return `第 ${ x } ~ ${ y } 条`
            },
            list(){
                return this.$store.state.warns.list
            },
            total(){
                const z = this.$store.state.warns.total
                this.options = Math.ceil(z / 10)
                return z
            }
        },
        methods: {
            pull(){
                /* queryList({
                    pageNum: this.page
                }).done(o => {
                    this.options = Math.ceil(o.total / 10)
                    this.list = o.list;
                    this.total = o.total;
                }) */
                this.$store.dispatch('warns/getList', { pageNum: this.page })
            },
            toggle(x){
                if (x != this.page + 1){
                    this.page = x - 1;
                    this.pull();
                }
            },
            setCurrent(o) {
                this.$emit('update:active',o.id);
                this.$emit('setCurrent',o)
            }
        }
    }
</script>
