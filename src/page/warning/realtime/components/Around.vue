<template>
    <ul class="ui-scrollbar" :class="$css.around">
        <span v-if="!cap.list || !cap.list.length">暂无数据</span>
        <template>
            <li :key="idx" v-for="(o,idx) in cap.list">
                <router-link :to="'/faces/search/detail?id=' + o.recordId" target="_blank">{{ o.recordId }}</router-link>
                <img :src="img_url + o.capPicture">
                <p>抓拍照片</p>
            </li>
            <span class="ts-button" @click="getMore" v-show="cap.total && cap.total>cap.list.length">加载更多</span>
        </template>
    </ul>
</template>
<script>
    import { img_url } from '../../../../config'
    export default {
        props: [ '$css','id' ],
        data() {
            return {
                curPage: 0,
                img_url: img_url
            }
        },
        computed: {
            cap() {
                return this.$store.getters.warningCaps
            }
        },
        methods: {
            getMore() {
                this.curPage += 1;
                this.$store.dispatch('warning/getMoreCap',{
                    id: this.id,
                    pageNum: this.curPage
                }).catch(() => {
                    this.curPage -= 1;
                })
            }
        }
    }
</script>
