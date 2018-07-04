<template>
    <div :class="$css.tendency_block">
        <div :class="$css.plate_title">
            <h3>预警增长趋势</h3>
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
        <div :class="$css.tendency">
            <div :class="$css.chart" ref="chart"/>
            <section>
                <dl :class="$css.period">
                    <dt>今日</dt>
                    <dt :class="$css.active">本周</dt>
                    <dt>本月</dt>
                </dl>
                <p :class="$css.analysis">
                    <big>15</big>
                    <em>10%</em>
                    <span>同比上月</span>
                </p>
            </section>
        </div>
    </div>
</template>
<script>
import json_bar from '../_json/line';
import json_lineBar from '../_json/lineBar';
import json_dbLine from '../_json/dbLine';

export default {
    props: {
        $css: {},
        dataList: {
            type: Array,
            default: []
        },
        jsonStyle: {
            type: String,
            default: 'json_bar'
        },
        curType: {
            type: String,
            default: null
        }
    },
    data(){
        return {
            start: null,
            end: null,
            instance: null
        }
    },
    watch: {
        dataList() {
            Promise.all([
                import(/* webpackChunkName: 'echarts' */ 'echarts/lib/echarts'),
                import(/* webpackChunkName: 'echarts_line' */ 'echarts/lib/chart/line'),
                import(/* webpackChunkName: 'echarts_bar' */ 'echarts/lib/chart/bar'),
                import(/* webpackChunkName: 'echarts_legendScroll' */ 'echarts/lib/component/legendScroll'),
                import(/* webpackChunkName: 'echarts_grid' */ 'echarts/lib/component/grid'),
                import(/* webpackChunkName: 'echarts_tooltip' */ 'echarts/lib/component/tooltip'),
                import(/* webpackChunkName: 'echarts_axisPointer' */ 'echarts/lib/component/axisPointer')
            ]).then(r => {
                this.initChart(r[0])
            }).catch(e => {
                this.$message.error('数据加载失败！')
                // console.log(e)
            })
        }
    },
    methods: {
        getJSON(list) {
            if (this.jsonStyle === 'json_bar') {
                return json_bar(list)
            } else if (this.jsonStyle === 'json_lineBar') {
                let color;
                switch(this.curType) {
                    case 'device':
                        color = '#41BAFF'
                        break;
                    case 'scale':
                        color = '#50E3C2'
                        break;
                    case 'people':
                        color = '#F7AC30'
                        break;
                    case 'warn':
                        color = '#F76B30'
                        break;
                }
                return json_lineBar(list, color)
            } else if (this.jsonStyle === 'json_dbLine') {
                return json_dbLine(list)
            }
        },
        initChart(e){
            this.instance && this.instance.clear()
            this.instance = e.init(this.$refs.chart)
            this.instance.setOption(this.getJSON(this.dataList))
            // 限制浏览器大小变化时canvas重新渲染频率，事件节流
            let resize = time => {
                let timer
                return () => {
                    if (timer) clearTimeout(timer)
                    timer = setTimeout(() => {
                        this.instance.resize({
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
            resize();
        }
    }
}
</script>
