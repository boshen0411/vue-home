<template>
    <div v-show="show" class="Loading">
        <span>
            <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none"/>
            </svg>
        </span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false
        }
    },
    methods: {
        open() {
            this.show = true
        },
        close() {
            this.show = false
        }
    }
}
</script>

<style>
.circular {
    width: 50px;
    height: 50px;
    animation: loading-rotate 2s linear infinite
}
.path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: #20a0ff;
    stroke-linecap: round
}
@keyframes loading-rotate {
    100% {
        transform: rotate(360deg)
    }
}
@keyframes loading-dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0
    }
    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -40px
    }
    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -120px
    }
}
</style>


<style lang="scss" scoped>

.Loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    > span {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: inline-block;
    }
}
</style>
