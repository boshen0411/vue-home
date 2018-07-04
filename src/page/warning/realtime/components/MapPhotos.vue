<template>
    <div :class="$css.archives_block">
        <span v-if="!list.length">暂无数据</span>
        <template v-else>
            <p :class="$css.current">
                <router-link to="/">1523659</router-link>
                <img src="https://i.loli.net/2017/09/06/59afaacabd5c9.png">
                <span>档案照片</span>
            </p>
            <div :class="$css.archives_wrap">
                <i
                    :class="[ index && $css.cursor ]"
                    @click="prev"
                ></i>
                <div :class="$css.archives">
                    <ul :style="slideX">
                        <li :key="i" v-for="(o,i) of photo">
                            <router-link to="/">1523659</router-link>
                            <figure>
                                <img src="https://i.loli.net/2017/09/06/59afaacabd5c9.png">
                                <figcaption>相似度：8</figcaption>
                            </figure>
                            <time>2017-08-01<br>10:02:20</time>
                        </li>
                    </ul>
                </div>
                <i
                    :class="[ index < photo.length - 1 && $css.cursor ]"
                    @click="next"
                ></i>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        $css: {},
    },
    data() {
        return {
            photo: Array(20),
            index: 0,
            list: []
        }
    },
    computed: {
        left(){
            return this.index > 0 ? 'arrow_left_blue' : 'arrow-left_not_clickable';
        },
        right(){
            return this.index < this.photo.length -1 ? 'arrow_right_blue' : 'arrow-right_not_clickable';
        },
        slideX(){
            const x = `translateX(-${ this.offset * this.index }px)`
            return {
                transform: x,
                '-ms-transform': x
            }
        }
    },
    methods: {
        prev(){
            this.index > 0 && this.index--;
        },
        next(){
            if (this.index < this.photo.length -1) {
                this.index++;
            }
        },
    }
}
</script>

<style lang='scss' scoped>

</style>