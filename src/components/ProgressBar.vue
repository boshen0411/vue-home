<template>
    <div :class="$style.progress" :style="style"></div>
</template>

<script>
export default {
    data() {
        return {
            percent: 0,
            show: false,
            canSuccess: true,
            duration: 3000,
            height: '1px',
            color: '#20a0ff',
            failedColor: '#F7BA2A'
        }
    },
    computed: {
        style() {
            return {
                width: `${this.percent}%`,
                height: this.height,
                opacity: +this.show,
                backgroundColor: this.canSuccess ? this.color : this.failedColor
            }
        }
    },
    methods: {
        start() {
            this.show = true
            this.canSuccess = true
            if (this._timer) {
                clearInterval(this._timer)
                this.parent = 0
            }
            this._cut = 1e4 / Math.floor(this.duration)
            this._timer = setInterval(() => {
                this.increase(this._cut * Math.random())
                this.percent > 95 && this.finish()
            }, 1e2)
            return this
        },
        set(x) {
            this.show = true
            this.canSuccess = Math.floor(x)
            return this
        },
        get() {
            return Math.floor(this.percent)
        },
        increase(x) {
            this.percent += Math.floor(x)
            return this
        },
        decrease(x) {
            this.percent -= Math.floor(x)
            return this
        },
        finish() {
            this.percent = 100
            this.hide()
            return this
        },
        pause() {
            clearInterval(this._timer)
            return this
        },
        hide() {
            clearInterval(this._timer)
            this._timer = null
            setTimeout(() => {
                this.show = false
                this.$nextTick(() => {
                    setTimeout(() => this.percent = 0, 2e2)
                })
            }, 5e2)
            return this
        },
        fail() {
            this.canSuccess = false
            return this
        }
    }
}
</script>
<style module>
    .progress {
        position: fixed;
        z-index: 99999;
        top: 0;
        left: 0;
        right: 0;
        width: 0%;
        height: 1px;
        opacity: 1;
        transition: width 0.2s, opacity 0.4s;
    }
</style>

