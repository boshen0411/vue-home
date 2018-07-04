<template>
    <div class="map-wrap">
        <query-field></query-field>
        <el-amap class="map-block"
                 :plugin='plugin'
                 :center="center"
                 :zoom="zoom"
                 :events="events"></el-amap>
    </div>
</template>
<script>
import QueryField from './QueryField'

export default {
    components: {
        QueryField
    },
    data() {
        return {
            zoom: 13,
            center: [113.945943, 22.547741],
            plugin: ['Walking'],
            events: {
                init(o) {
                    /* const marker = new AMap.Marker({
                        position: [113.945943, 22.547741]
                    })
                    marker.setMap(o) */
                    console.log(o)
                    const walking = new AMap.Walking({
                        map: o
                    })
                    walking.search([116.399028, 39.845042], [116.436281, 39.880719]);
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.map-wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
    .map-block {
        flex: 1;
        margin-top: 10px;
        height: 100%;
    }
}
</style>




