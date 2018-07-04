<template>
    <div :class="$style.realtime_warn">
        <div :class="$style.snapshot_data">
            <nav :class="$style.horizontal">
                <a
                    :key="k"
                    :class="[ k === tag && $style.active ]"
                    v-for="(v,k) of tags"
                    @click="tag = k"
                >{{ v }}</a>
            </nav>
            <comparison
                v-if="'comparison' == tag"
                :$css="$style"
                :show="!!selected"
                :list="list"
                :refresh="createSocket"
                :active.sync="selected"
                @setCurrent="setItem"
            />
            <analysis v-else :$css="$style"/>
            <!-- <div :class="$style.snapshot">
                <comparison
                    v-if="'comparison' == tag"
                    :$css="$style"
                    :list="list"
                    :stop="stop"
                />
                <analysis v-else :$css="$style"/>
            </div>
            <button @click="refresh" v-if="!ws">刷新</button> -->
        </div>
        <map-block ref="map" :$css="$style" :show="'analysis' === tag" :list="list"/>
        <div :class="$style.associated_info">
            <nav :class="$style.horizontal">
                <a
                    :key="k"
                    :class="[ k === tab && $style.active ]"
                    v-for="(v,k) of tabs"
                    @click="tab = k"
                >{{ v }}</a>
            </nav>
            <div :class="$style.association">
                <div :class="$style.opera" v-if="'opera' === tab">
                    <button v-if="selected" @click="dialog = true">忽略预警</button>
                </div>
                <div :class="$style.associate" v-else>
                    <nav>
                        <a
                            :key="k"
                            :class="[ k === info && $style.active ]"
                            v-for="(v,k) of infos"
                            @click="info = k"
                        >{{ v }}</a>
                    </nav>
                    <component :is="info" :id="selected" :$css="$style"/>
                </div>
            </div>
        </div>
        <ignore-dialog v-if="dialog" @submit="ignore" @close="dialog = false"/>
    </div>
</template>
<script>
import Comparison from './components/Comparison';
import Analysis from './components/Analysis';
import MapBlock from './components/MapBlock';
import Mac from './components/Mac';
import Vehicle from './components/Vehicle';
import Around from './components/Around';
import { getToken } from 'auth';

export default {
    components: {
        Comparison,
        Analysis,
        MapBlock,
        Mac,
        Vehicle,
        Around,
        IgnoreDialog: () => import('@/IgnoreDialog')
    },
    data(){
        return {
            tag: 'comparison',
            tags: {
                comparison: '抓拍比对'
                // analysis: '数据分析'
            },
            tab: 'associate',
            tabs: {
                associate: '关联信息',
                opera: '操作'
            },
            info: 'around',
            infos: {
                around: '周围人脸',
                mac: 'MAC',
                vehicle: '车辆'
            },
            dialog: false,
            ws: null,
            list: [],
            selected: null
        }
    },
    created(){
        this.stop()
        this.createSocket()
        window.addEventListener('beforeunload', () => this.stop())
    },
    beforeRouteLeave(a,b,next){
        this.stop()
        next()
    },
    methods: {
        createSocket(){
            const ws = new WebSocket(`${ this.$wshost }/websocket/${ getToken() }`);
            ws.onopen = () => {
                // this.$notify.success({
                //     title: '提示',
                //     message: '服务连接成功！'
                // }) 
                ws.send('')
            }
            // 获取到data后一秒后获取当前值赋值
            let limit = time => {
                let flag = true
                let val = null
                let beforeIds = []
                let curIds = []
                let self = this
                return data => {
                    if (!flag) return;
                    flag = false
                    data = JSON.parse(data)
                    curIds = data && data.length && data.map(item => item.id)
                    curIds = curIds || []
                    setTimeout(() => {
                        let same = false
                        if (curIds.length === beforeIds.length) {
                            same = beforeIds.some(item => {
                                return curIds.indexOf(item) > 0
                            })
                        }
                        if (!same) {
                            beforeIds = curIds
                            self.list = data
                        }
                        flag = true
                    }, time)
                }
            }
            limit = limit(300)
            ws.onmessage = e => {
                limit(e.data)
            }
            /* ws.onerror = () => this.$notify.error('连接出错！')
            ws.onclose = () => this.$notify.warning({
                title: '提示',
                message: '连接已关闭！'
            }) */
            this.ws = ws
            this.selected && (this.selected = null)
            this.$nextTick(() => {
                this.$refs.map.toggleMap('heat')
            })
        },
        stop(){
            if (this.ws){
                this.ws.close(
                    // this.$notify.warning({
                    //     title: '提示',
                    //     message: '连接已关闭！'
                    // })
                )
                this.ws = null
            }
        },
        ignore(rm){
            let arg = {
                id: this.selected,
                remark: rm
            }
            this.$store.dispatch('warning/promptItem', arg).then(this.createSocket);
            this.dialog = false;
        },
        setItem(o) {
            console.log(o)
            this.stop();
            if (this.selected === o.id) return;
            this.selected = o.id;
            // this.$refs.map.toggleMap('point', o)
            // 获取当前条目对应的抓拍列表
            this.$store.dispatch('warning/getCap',{id: o.sceneId})
            // this.$store.dispatch('warning/getCap',{id:'2017091217123406610'})
        }
    }
}
</script>
<style lang="scss" src="./style" module/>
