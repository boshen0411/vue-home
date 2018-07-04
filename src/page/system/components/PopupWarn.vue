<template>
    <section v-if="show" class="container">
        <div class="content">
            <figure>
                <img v-if="type == 'del'"
                    :src="require('assets/icons/del_red.png')"
                    alt="warn"
                >
                <img v-if="type == 'shut'"
                    :src="require('assets/icons/shut.png')" 
                    alt="warn"
                >
                <img v-if="type == 'launch'"
                    :src="require('assets/icons/launch.png')" 
                    alt="warn"
                >
            </figure>
            <p class="message" v-html="message"></p>
            <div class="btns">
                <span @click="$emit('confirm',store)">确定</span>
                <span @click="close">关闭</span>
            </div>
        </div>
    </section>
</template>

<script>
// 每次打开弹框时，需要传入参数type、message、store(可不传)
// 每次打开弹框时，都会将数据存储到data.store中
// 每次关闭弹框时，都会清空data.store
// 每次点击确定时，都会将data.store通过提交confirm事件传回去
export default {
    data() {
        return {
            type: '',
            message: '',
            show: false,
            store: ''
        }
    },
    methods: {
        open(data) {
            const { type, message, store } = data
            this.type = type;
            this.message = message;
            if (store) this.store = store;
            this.show = true;
        },
        close() {
            this.show = false;
            this.message = '';
            this.store = '';
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~style/basic/param';

.container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
    > div {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 400px;
        border-radius: 4px;
        background: #fff;
    }
}

.content {
    padding-top: 56px;
    padding-bottom: 20px;
    figure {
        height: 80px;
        text-align: center;
        overflow: hidden;
        img {
            vertical-align: top;
            display: inline-block;
            width: 80px;
            height: 80px;
        }
    }
    .message {
        margin-top: 42px;
        text-align: center;
        font-size: 18px;
        line-height: 1;
        color: #333;
    }
    .btns {
        margin-top: 72px;
        text-align: center;
        > span {
            vertical-align: top;
            display: inline-block;
            width: 120px;
            height: 40px;
            border-radius: 4px;
            border: 1px solid $color-light-blue;
            line-height: 40px;
            font-size: 18px;
            color: $color-light-blue;
            cursor: pointer;
            &:nth-of-type(1) {
                background: $color-light-blue;
                color: #fff;
            }
            & + span {
                margin-left: 30px;
            }
        }
    }
}
</style>

