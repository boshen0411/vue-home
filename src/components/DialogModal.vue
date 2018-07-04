<template>
    <transition name="ui-dialog-fade">
        <div class="ui-dialog-modal">
            <div class="ui-dilog" :style="{width: width, height: height}">
                <slot :close="hide"></slot>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        methods: {
            hide(cb){
                this.$emit('hide')
                'function' == typeof cb && cb()
            }
        },
        props: ['width', 'height']
    }
</script>
<style lang="scss">
    .ui-dialog-fade-enter-active {
        animation: ui-dialog-fade-in .3s
    }

    .ui-dialog-fade-leave-active {
        animation: ui-dialog-fade-out .3s
    }

    @keyframes ui-dialog-fade-in {
        0% {
            transform: translate3d(0,-20px,0);
            opacity: 0
        }
        to {
            transform: translateZ(0);
            opacity: 1
        }
    }

    @keyframes ui-dialog-fade-out {
        0% {
            transform: translateZ(0);
            opacity: 1
        }
        to {
            transform: translate3d(0,-20px,0);
            opacity: 0
        }
    }

    .ui-dialog-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        background: rgba(#000, 0.5);
        overflow: auto;
        .ui-dilog {
            width: 1034px;
            height: 600px;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            font-size: 0;
            background: #fff;
            transition: all .25s;
        }
    }
</style>
