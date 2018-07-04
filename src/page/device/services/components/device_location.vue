<template>
    <div class="map-warpper">
        <el-amap :center="pos"
                 :zoom="map.zoom">
                 <el-amap-marker
                 :position="pos"
                 :events="marker.events"
                 :visible="marker.visible">
                 </el-amap-marker>
        </el-amap>
    </div>
</template>
<script>
export default {
    props: ['details'],
    data() {
        return {
            map: {
                zoom: 13,
                // center: []
            },
            marker: {
                // position: [],
                visible: false,
                events: {
                    click(e) {
                        console.log(e,'mark')
                    }
                }
            }
        }
    },
    computed: {
        pos() {
            if (!this.details.longitude || !this.details.latitude) {
                return [0,0]
            } else {
                this.marker.visible = true;
                return [parseFloat(this.details.longitude).toFixed(4),parseFloat(this.details.latitude).toFixed(4)]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.map-warpper {
    // width: 450px;
    // height: 450px;
    width: 100%;
    height: calc(100% - 100px);
}
</style>
