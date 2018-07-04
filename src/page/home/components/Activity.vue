<template>
    <div :class="$css.activity_block">
        <div :class="$css.plate_title">
            <h3>活动发布</h3>
            <p>
                <el-date-picker
                    :class="$css.picker"
                    type="date"
                    v-model="start"
                    :editable="false"
                    placeholder="选择日期"
                />&emsp;至&emsp;
                <el-date-picker
                    :class="$css.picker"
                    type="date"
                    v-model="end"
                    :editable="false"
                    placeholder="选择日期"
                />
            </p>
        </div>
        <div :class="$css.activity">
            <div :class="$css.chart" ref="chart"/>
            <section>
                <dl :class="$css.period">
                    <dt>今日</dt>
                    <dt :class="$css.active">本周</dt>
                    <dt>本月</dt>
                </dl>
                <div>
                    <p :class="$css.analysis">
                        <span>累计事件</span>
                        <big>120</big>
                        <em :class="$css.green">10%</em>
                        <span>同比上月</span>
                    </p>
                    <p :class="$css.analysis">
                        <span>本周新事件</span>
                        <big>13</big>
                        <em :class="$css.red">10%</em>
                        <span>同比上月</span>
                    </p>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import json from '../_json/curves';

export default {
    props: [ '$css' ],
    data(){
        return {
            start: null,
            end: null
        }
    },
    mounted(){
        Promise.all([
            import(/* webpackChunkName: 'echarts' */ 'echarts/lib/echarts'),
            import(/* webpackChunkName: 'echarts_line' */ 'echarts/lib/chart/line'),
            import(/* webpackChunkName: 'echarts_tooltip' */ 'echarts/lib/component/tooltip'),
            import(/* webpackChunkName: 'echarts_title' */ 'echarts/lib/component/title'),
            import(/* webpackChunkName: 'echarts_grid' */ 'echarts/lib/component/grid')
        ]).then(r => {
            this.initChart(r[0])
        }).catch(e => {
            this.$message.error('数据加载失败！')
        })
    },
    methods: {
        initChart(e){
            const instance = e.init(this.$refs.chart)
            instance.setOption(json)
            // 限制浏览器大小变化时canvas重新渲染频率，事件节流
            let resize = time => {
                let timer
                return () => {
                    if (timer) clearTimeout(timer)
                    timer = setTimeout(() => {
                        instance.resize({
                            width: 'auto',
                            height: 'auto'
                        })
                    },time)
                }
            }
            resize = resize(100)
            window.addEventListener('resize', () => {
                resize()
            })
        }
    }
}
</script>
