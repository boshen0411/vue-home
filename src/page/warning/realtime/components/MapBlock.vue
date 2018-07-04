<template>
    <div :class="$css.map_block">
        <el-amap
            :class="[ show && $css.amap ]"
            :center="center"
            :zoom="zoom"
            :resizeEnable="true"
            :events="events"
        >
            <template v-if="multPoints.windows">
                <el-amap-info-window v-for="(window, idx) in multPoints.windows" :key="idx"
                    :position="window.position" 
                    :content="window.content" 
                    :visible="window.visible" 
                    :events="window.events(idx)"
                    :closeWhenClickMap="true"
                    :isCustom="true" />
                <el-amap-marker v-for="(marker, idx) in multPoints.markers" :key="idx" 
                    :position="marker.position" 
                    :events="marker.events(idx)"
                    :visible="marker.visible" 
                    :draggable="marker.draggable" />
            </template>
        </el-amap>
        <map-photos v-if="show" :$css="$css"/>
    </div>
</template>
<script>
/**
 * 參考文檔
 * https://elemefe.github.io/vue-amap/#/zh-cn/introduction/install
 * http://lbs.amap.com/api/javascript-api/example/layers/heatmap
 */
export default {
    components: {
        MapPhotos: () => import('./MapPhotos')
    },
    props: {
        $css: {},
        show: {
            type: Boolean,
            default: false
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    data(){
        return {
            zoom: 9,
            center: [120.811213, 27.932747],
            events: {
                init: this.heat
            },
            points: [],
            offset: 90,
            heatmap: null,
            multPoints: {},
        }
    },
    watch: {
        list(val) {
            console.log(val)
            if (!val.length) {
                return;
            }
            this.createHeatPoints(val)
            this.createMultPoints(val)
        }
    },
    created() {
        this.initCenter = this.initCenter()
    },
    methods: {
        heat(map){
            map.plugin(["AMap.Heatmap"], () => {
                this.heatmap = new AMap.Heatmap(map, {
                    radius: 25,
                    opacity: [0, 0.8]
                });
            });
        },
        initCenter() {
            // 该函数只会执行依次，初始化中心到第一条记录的坐标
            let center = null;
            return position => {
                if (position && position.length && !center) {
                    this.center = position
                    center = position
                }
            }
        },
        initHeatData(list) {
            list = list.map(item => {
                return {
                    lng: item.deviceLng,
                    lat: item.deviceLat,
                    count: 1
                }
            })
            return list
        },
        toggleMap(type, curPoint) {
            if (type === 'heat') {
                this.multPointsHiden()
                this.heatmap && this.heatmap.show()
            } else if (type === 'point') {
                this.heatmap.hide();
                this.multPointsHiden()
                const idx = this.list.indexOf(curPoint)
                const cur = this.multPoints.markers[idx]
                cur.visible = true
                this.center = cur.position
            } else {
                this.heatmap.hide();
                this.multPointsHiden()
            }
        },
        createHeatPoints(list) {
            if (list && list.length && this.heatmap) {
                this.points = this.initHeatData(list)
                this.heatmap.setDataSet({ data: this.points, max: 10 })
            }
        },
        createMultPoints(list) {
            // 创建窗体和标记点
            let windows = []
            let markers = []
            list.forEach(item => {
                const position = [item.deviceLng, item.deviceLat]
                const content = 'XXXXXXXXXXXXXXXXXXX'
                const full = this.initData(position, content)
                windows.push(full.window)
                markers.push(full.marker)
            })
            // 将地图重新定位到第一个坐标上，只会执行一次
            this.initCenter(markers[0].position)
            this.multPoints = {
                windows,
                markers
            }
        },
        infoWindowHtml({ content }) {
            return `
                <section class="map-window-blue">
                    <p>
                        <span>F101-126547</span>
                        <span>安全摄像头</span>
                    </p>
                    <p>
                        <span>设备位置</span><br />
                        ${content}
                    </p>
                    <div>查看场景图</div>
                </section>
            `
        },
        initData(position, content) {
            // 标记点和窗体的对象属性
            const window = {
                position, 
                content: this.infoWindowHtml({content}),
                visible: false,
                // visible: true,
                events: idx => {
                    return {
                        close: () => {
                            this.multPoints.windows[idx].visible = false
                        }
                    }
                }
            }
            const marker = {
                position, 
                visible: false,
                // visible: true,
                events: idx => {
                    return {
                        click: () => {
                            // 暂时不显示消息弹框
                            // this.multPoints.windows[idx].visible = true;
                        }
                    }
                }
            }
            return { window, marker }
        },
        multPointsHiden() {
            const mp = this.multPoints
            for(let type in mp) {
                mp[type].forEach(item => {
                    item.visible = false
                })
            }
        }
    }
}
</script>
