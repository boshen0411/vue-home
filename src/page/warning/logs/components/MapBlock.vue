<template>
    <div :class="$css.map_block2">
        <el-amap
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
                    :closeWhenClickMap="true" />
                <el-amap-marker v-for="(marker, idx) in multPoints.markers" :key="idx" 
                    :position="marker.position" 
                    :events="marker.events(idx)"
                    :visible="marker.visible" 
                    :draggable="marker.draggable" />
            </template>
        </el-amap>
    </div>
</template>
<script>
    export default {
        props: [ '$css' ],
        data(){
            return {
                zoom: 8,
                center: [120.811213, 27.932747],
                events: {
                    init: this.heat
                },
                // points: require('../_json/heat'),
                index: 0,
                offset: 90,
                photo: Array(20),
                multPoints: {}
            }
        },
        computed: {
            list() {
                return this.$store.state.warns.list
            },
            points(){
                return this.pipe(this.$store.state.warns.list) || []
            }
        },
        watch: {
            points(){
                if  (this.points && this.points.length && this.heatmap){
                    this.heatmap.setDataSet({ data: this.points, max: 10 });
                    this.sort(this.points);
                }
                this.createMultPoints(this.list)
            }
        },
        methods: {
            toggleMap(type, curPoint) {
                if (type === 'heat') {
                    this.multPointsHiden()
                    this.heatmap.show()
                } else if (type === 'point') {
                    this.heatmap.hide();
                    this.multPointsHiden()
                    const idx = this.list.indexOf(curPoint)
                    this.multPoints.markers[idx].visible = true
                } else {
                    this.heatmap.hide();
                    this.multPointsHiden()
                }
            },
            heat(map){
                map.plugin(["AMap.Heatmap"], () => {
                    this.heatmap = new AMap.Heatmap(map, {
                        radius: 25,
                        opacity: [0, 0.8]
                    });

                    this.heatmap.setDataSet({ data: this.points, max: 100 });
                });
            },
            pipe(r){
                const p = []
                if (r && r.length){
                    r.forEach(o => {
                        if (o.deviceLng && o.deviceLat) {
                            const i = p.findIndex(v => (o.deviceLng == v.lng && o.deviceLat == v.lat))
                            if (i < 0){
                                p.push({
                                    lng: o.deviceLng,
                                    lat: o.deviceLat,
                                    count: 1
                                })
                            }
                            else {
                                p[i].count += 1
                            }
                        }
                    })
                }
                return p
            },
            sort(r){
                if (r && r.length){
                    const o = r.sort((a,b) => a.count < b.count)[0];
                    this.center = [ o.lng, o.lat ]
                }
            },
            createMultPoints(list) {
                // 创建窗体和标记点
                let windows = []
                let markers = []
                list.forEach(item => {
                    const position = [item.deviceLng, item.deviceLat]
                    const content = '哈哈哈'
                    const full = this.initData(position, content)
                    windows.push(full.window)
                    markers.push(full.marker)
                })
                this.multPoints = {
                    windows,
                    markers
                }
            },
            initData(position, content) {
                // 标记点和窗体的对象属性
                const window = {
                    position, 
                    content: `
                        <div style="color: red">${content}</div>
                    `,
                    visible: false,
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
                    events: idx => {
                        return {
                            click: () => {
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
