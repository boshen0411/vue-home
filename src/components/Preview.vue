<template>
    <dialog-modal v-show="show">
        <template scope="props">
            <div :class="$style.preview">
                <ul :style="{ width: size }">
                    <li v-for="(item, idx) in imgs" :key="idx">
                        <img :src="item.image | cdn">
                    </li>
                </ul>
                <button @click="show = false">关闭</button>
            </div>
        </template>
    </dialog-modal>
</template>
<script>
import DialogModal from '@/DialogModal';

export default {
    components: { DialogModal },
    data(){
        return {
            show: false,
            wid: 143,
            imgs: []
        }
    },
    computed: {
        size(){
            const x = this.imgs.length
            if (x > 8){
                return this.wid * 5 + 'px'
            }
            else if (0 == x % 4 || 7 == x){
                return this.wid * 4 + 'px'
            }
            return this.wid * 3 + 'px'
        }
    },
    methods: {
        open(imgs) {
            this.imgs = imgs || []
            if (this.imgs.length) {
                this.show = true
            } else {
                this.$message.warning('暂无图片')
            }
        }
    }
}
</script>
<style lang="scss" module>
@import '~style/basic/param';
    .preview {
        padding: 20px;
        ul {
            min-width: 430px;
            max-width: 715px;
            text-align: center;
        }
        li {
            display: inline-block;
            width: 143px;
            padding: 10px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        button {
            display: block;
            width: 80px;
            height: 40px;
            margin: 20px auto 0 auto;
            font-size: 16px;
            color: #fff;
            border-radius: 4px;
            background-color: $color-light-blue;
            cursor: pointer;
            &:hover {
                opacity: .8;
            }
        }
    }
</style>
