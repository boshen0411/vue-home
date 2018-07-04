<template>
    <div :class="$css.ranking_block">
        <div :class="$css.plate_title">
            <h3> 业务排行榜</h3>
            <a :class="$css.more">更多</a>
        </div>
        <div v-show="jsonStyle === 'json_cir'" :class="$css.chartCir">
            <div ref="chartCir"/>
        </div>
        <div v-show="jsonStyle === 'json_loop'" :class="$css.ranking_box">
            <div :class="$css.tab">
                <dl :class="$css.type">
                    <dt v-for="(tab, idx) in dataTabs" :key="idx"
                        :class="[curDataTab === idx && $css.active]" 
                        @click="selectData(idx)"
                    >{{ tab }}</dt>
                </dl>
                <el-select :class="$css.select" v-model="district" placeholder="地区">
                    <el-option
                        :key="o.label"
                        v-for="o of options"
                        :label="o.label"
                        :value="o.value"
                    >
                    </el-option>
                </el-select>
            </div>
            <div :class="$css.ranking">
                <div :class="$css.chart" ref="chart"/>
                <div>
                    <dl :class="$css.analysis">
                        <dd>
                            <span>排名</span>
                            <span>周环比</span>
                        </dd>
                        <dt>
                            <span>1 抓拍</span>
                            <span :class="$css.green">2%</span>
                        </dt>
                        <dt>
                            <span>2 车载</span>
                            <span :class="$css.red">2%</span>
                        </dt>
                        <dt>
                            <span>3 手持</span>
                            <span :class="$css.green">2%</span>
                        </dt>
                        <dt>
                            <span>4 人证</span>
                            <span :class="$css.red">2%</span>
                        </dt>
                        <dt>
                            <span>5 其他</span>
                            <span :class="$css.red">2%</span>
                        </dt>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import json_loop from '../_json/loop';
import json_cir from '../_json/circle';

export default {
    props: {
        $css: {},
        dataList: {
            type: Array,
            default: []
        },
        jsonStyle: {
            type: String,
            default: 'json_loop'
        },
        curDataTab: {
            type: Number,
            default: 0
        }
    },
    data(){
        return {
            district: null,
            options: [
                {
                    label: '深圳',
                    value: '深圳'
                },
                {
                    label: '北京',
                    value: '北京'
                },
                {
                    label: '上海',
                    value: '上海'
                }
            ],
            instance: null,
            dataTabs: ['全部','抓拍','车载','手持','人证','其他'],
            // dataExtent: [{
            //     name: ''
            // }]
        }
    },
    watch: {
        dataList(){
            Promise.all([
                import(/* webpackChunkName: 'echarts' */ 'echarts/lib/echarts'),
                import(/* webpackChunkName: 'echarts_pie' */ 'echarts/lib/chart/pie'),
                import(/* webpackChunkName: 'echarts_tooltip' */ 'echarts/lib/component/tooltip'),
                import(/* webpackChunkName: 'echarts_grid' */ 'echarts/lib/component/grid')
            ]).then(r => {
                this.initChart(r[0])
            }).catch(e => {
                // console.log(e)
                this.$message.error('数据加载失败！')
            })
        }
    },
    methods: {
        getJSON(list) {
            if (this.jsonStyle === 'json_loop') {
                return json_loop(list)
            } else if (this.jsonStyle === 'json_cir') {
                return json_cir(list)
            }
        },
        initChart(e){
            this.instance && this.instance.clear()
            const dom = this.jsonStyle === 'json_cir' ? this.$refs.chartCir : this.$refs.chart
            this.instance = e.init(dom)
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
        },
        selectData(idx) {
            if (this.curDataTab === idx) return
            this.$emit('update:curDataTab', idx)
            this.$emit('getData', idx)
        }
    }
}
</script>
