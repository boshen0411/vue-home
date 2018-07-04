<template>
    <div :class="$style.locus_wrap">
        <div :class="$style.tab_btns">
            <span v-for="(tab,idx) in tabs"
                  :key="idx"
                  :class="[tab.id === currentTag && $style.active]"
                  @click="switchTab(tab.id)">
                  {{tab.name}}
            </span>
            <p>轨迹时间段：
                <el-date-picker
                    :class="$style.picker"
                    v-model="timeRange"
                    type="datetimerange"
                    placeholder="选择时间范围">
                </el-date-picker>
            </p>
        </div>
        <div :class="$style.map_wrap">
            <component :is="currentTag"></component>
        </div>
    </div>
</template>

<script>
import Realtime from './TabLocus/Realtime'
import History from './TabLocus/History'

export default {
    components: {
      Realtime,
      History  
    },
    data() {
        return {
            tabs: [
                {
                    id: "realtime",
                    name: '实时轨迹'
                },
                {
                    id: "history",
                    name: '历史轨迹'
                }
            ],
            currentTag: 'realtime',
            timeRange: []
        }
    },
    methods: {
        switchTab(id) {
            if (this.currentTag == id) return;
            this.currentTag = id;
        }
    }
}
</script>

<style lang="scss" module>
 @import '~style/basic/param';

 .locus_wrap,.map_wrap {
     display: flex;
     flex-direction: column;
     height: 100%;
 }
.tab_btns {
    margin-bottom: 20px;
    color: #fff;
    font-size: 18px;
    border-bottom: 2px solid $color-deep-blue;
    position: relative;
    > span {
        display: inline-block;
        width: 120px;
        height: 58px;
        line-height: 58px;
        text-align: center;
        cursor: pointer;
        &.active {
            position: relative;
            color: #41baff;
            cursor: default;
            &:after {
                content: "";
                display: block;
                width: 120px;
                height: 2px;
                position: absolute;
                left: 0;
                bottom: -2px;
                background-color: #41baff;
            }
        }
    }
    > p {
        position: absolute;
        top: 0;
        right: 0;
        line-height: 60px;
        font-size: 14px;
    }
}
.picker {
    width: 417px;
    height: 30px;
    vertical-align: middle;
    border-radius: 4px;
    // background-color: $color-deep-blue;
    input {
        display: block;
        width: 100%;
        height: 100%;
        padding: 0 10px;
        color: #fff;
        border: none;
        background: $color-deep-blue !important;
        cursor: pointer;
    }
    i {
        font-size: 15px;
        color: #fff;
        &:before {
            content: "\E611";
        }
    }
}
</style>
