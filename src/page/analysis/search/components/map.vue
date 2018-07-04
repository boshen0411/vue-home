<template>
    <div class="map-wrap">
        <el-amap class="map-block"
                 :plugin='plugin'
                 :center="center"
                 :zoom="zoom"
                 :events="events"></el-amap>
                 <div class="btns">
                     <span class="ts-button" @click="$emit('close')">返回</span>
                 </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            zoom: 13,
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
.map-wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    .map-block {
        width: 100%;
        height: calc(100% - 60px);
    }
    .btns {
        height: 40px;
        margin: 10px auto;
        text-align: center;
        span {
            vertical-align: middle;
        }
    }
}
</style>




