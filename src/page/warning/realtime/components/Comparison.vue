<template>
    <div :class="$css.snapshot">
        <span v-if="!list.length " :class="$css.empty">暂无数据</span>
        <template v-else>
            <ul class="ui-scrollbar" :class="$css.comparison">
                <li
                    :class="[ active === o.id && $css.active ]"
                    :key="o.id"
                    v-for="o of list"
                    @click="$emit('setCurrent',o)"
                >
                    <p :class="$css.title">
                        <label>抓拍报警</label>
                        <time>{{ o.warningTime}}</time>
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
            <button @click="refresh" v-if="show">刷新</button>
        </template>
    </div>
</template>
<script>
    import { img_url } from '../../../../config'
    export default {
        data() {
            return {
                img_url: img_url
            }
        },
        props: [ '$css', 'show', 'list', 'active', 'refresh' ]
    }
</script>
