<template>
    <dialog-modal @hide="$emit('close')">
        <template scope="props">
            <div :class="$style.preview">
                <ul :style="{ width: size }">
                    <li :key="x" v-for="x of o.faceTotal">
                        <img src="https://i.loli.net/2017/08/21/599aaed571551.png">
                    </li>
                </ul>
                <button @click="props.close">关闭</button>
            </div>
        </template>
    </dialog-modal>
</template>
<script>
    import DialogModal from '@/DialogModal';

    export default {
        props: [ 'o' ],
        components: { DialogModal },
        data(){
            return {
                wid: 143
            }
        },
        computed: {
            size(){
                const x = this.o.faceTotal
                if (x > 8){
                    return this.wid * 5 + 'px'
                }
                else if (0 == x % 4 || 7 == x){
                    return this.wid * 4 + 'px'
                }
                return this.wid * 3 + 'px'
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
            padding: 10px;
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
