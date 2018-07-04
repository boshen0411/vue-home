<template>
    <el-amap class="map-block"
             :plugin='plugin'
             :center="center"
             :zoom="zoom"
             :events="events">
    </el-amap>
</template>
<script>
export default {
    data() {
        return {
            zoom: 15,
            center: [113.945943, 22.547741],
            plugin: ['Walking'],
            events: {
                init(o) {
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
.map-block {
    flex: 1;
    height: 100%;
    width: 100%;
}
</style>
