<template>
    <section class="player">
        <div class="timer">
            <span>{{ maxStep>1 ? format(timestamp[0]) : '-' }}</span>
            <p>
                <span class="orbit"></span>
                <span class="block">
                    <i :style="{ 'width': 700*percent + 'px' }"></i>
                    <em>{{ format(curTime) }}</em>
                </span>
            </p>
            <span>{{ maxStep>1 ? format(timestamp[maxStep - 1]) : '-' }}</span>
        </div>
        <div class="btns">
            <span @click="go(-1)"></span>
            <span :class="{'active': !play}"
                @click="playSwitch(!play)"
            ></span>
            <span @click="go(1)"></span>
        </div>
    </section>
    <!-- 使用方式参考 -->
    <!-- <player :time.sync="curTime"
        :timestamp="[1504074655949,1504077655949]"></player> -->
</template>

<script>
// time为当前时间戳
// timestamp 需以时间戳的方式按序传入起始时间
export default {
    props: {
        time: {
            type: [String, Number],
            default: 0
        },
        timestamp: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            play: false,    // 播放/暂停
            step: 0,        // 当前时间点
            timer: null     // 计时器
        }
    },
    computed: {
        maxStep() {
            return this.timestamp && this.timestamp.length || 0
        },
        curTime() {
            // 此变量仅用于展示
            // 具体修改当前使用事件的方法是操作$emit('update:time')
            let time = this.time;
            const max = this.timestamp[this.maxStep - 1]
            const min = this.timestamp[0]
            if (time < min) {
                time = min
            } else if (time >= max){
                time = max
            }
            this.$emit('update:time',time)
            return time
        },
        percent() {
            const max = this.timestamp[this.maxStep - 1]
            const min = this.timestamp[0]
            const time = this.time > min ? this.time : min
            const total = max - min
            const past = time -min
            const percent = past / total
            return percent || 0
        }
    },
    methods: {
        playSwitch(flag) {
            this.play = flag
            if (flag) {
                const max = this.timestamp[this.maxStep - 1]
                const min = this.timestamp[0]
                // 限制时间戳取值
                const timer = () => {
                    let val = this.time + 1000
                    if (this.time >= max) {
                        val = max
                        this.playSwitch(!this.play)
                    } else if (this.time < min) {
                        val = min + 1000
                    }
                    this.$emit('update:time', val)
                }
                // 使用/停用计时器
                if (this.time < max) {
                    this.timer = setInterval(timer, 1000)
                } else {
                    this.playSwitch(!this.play)
                }
            } else {
                clearInterval(this.timer)
            }
        },
        go(val) {
            // 根据步骤
            let step = this.step + val;
            const min = this.step === 0 && val < 0
            const max = this.step === this.maxStep - 1 && val > 0
            if (min) step = 0
            if (max) step = this.maxStep - 1
            this.step = step
            this.playSwitch(false)
            this.$emit('update:time', this.timestamp[this.step])
        },
        format(sec, gap = '-') {
            let date = new Date(sec)
            const pref = k => k > 9 ? k : '0' + k
            const yy = date.getFullYear()
            const mm = pref(date.getMonth() + 1)
            const dd = pref(date.getDate())
            const h = pref(date.getHours())
            const m = pref(date.getMinutes())
            const s = pref(date.getSeconds())
            // 格式化，默认如：2017-08-30 15:56:38
            const time = `${yy}${gap}${mm}${gap}${dd} ${h}:${m}:${s}`
            return time
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~style/basic/param';
.player {
    height: 120px;
    padding-top: 17px;
    background: $color-dark-blue;
    text-align: center;
    span {
        font-size: 14px;
        color: #fff;
    }
    .timer {
        display: inline-block;
        text-align: left;
        > span,> p {
            vertical-align: top;
        }
        > p {
            position: relative;
            margin: 0 10px;
            display: inline-block;
            width: 712px;
            height: 44px;
            padding-top: 8px;
        }
        > span {
            line-height: 20px;
        }
    }
    .orbit {
        position: absolute;
        top: 8px;
        left: 0;
        display: inline-block;
        width: 100%;
        height: 4px;
        border-radius: 100px;
        background: #d8d8d8;
    }
    .block {
        position: relative;
        vertical-align: top;
        display: inline-block;
        text-align: right;
        > i {
            position: relative;
            display: block;
            width: 0;
            min-width: 0;
            max-width: 700px;
            height: 4px;
            border-radius: 100px;
            background: $color-sky-blue;
            line-height: 12px;
            position: relative;
            transition: width 0.3s;
            &::after {
                content: '';
                position: absolute;
                top: 50%;
                right: 0;
                transform: translate(100%, -50%);
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: $color-sky-blue;
            }
        }
        > em {
            position: absolute;
            top: 18px;
            right: 0;
            transform: translateX(50%);
            font-style: normal;
            white-space: nowrap;
        }
    }
    .btns {
        margin-top: 14px;
        user-select: none;
        > span {
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border-width: 2px;
            border-style: solid;
            cursor: pointer;
            & + span {
                margin-left: 14px;
            }
            &:nth-last-of-type(1), &:nth-last-of-type(3) {
                border-color: $color-light-blue;
                background: url('~assets/icons/faster.png') no-repeat 5px center;
                background-size: 18px 12px;
            }
            &:nth-last-of-type(3) {
                transform: rotate(180deg);
            }
            &:nth-last-of-type(2) {
                border-color: #FB5346;
                background: url('~assets/icons/pause.png') no-repeat center;
                background-size: 10px 13px;
                transition: all 0.3s;
                &.active {
                    border-color: #14e4b6;
                    background: url('~assets/icons/play.png') no-repeat 10px center;
                    background-size: 10px 14px;
                }
            }
        }
    }
}
</style>
