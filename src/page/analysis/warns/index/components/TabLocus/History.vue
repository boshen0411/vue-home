<template>
    <section :class="$style.historyTrjy">
        <realtime :class="$style.historyMap"></realtime>
        <player :time.sync="curTime"
            :timestamp="timeRange"></player>
    </section>
</template>

<script>
export default {
    components: {
        Realtime: () => import('./Realtime'),
        Player: () => import('./Player')
    },
    data() {
        return {
            curTime: 0,
            timeRange: [1504074655949,1504074660949,1504074665949,1504074670949]
        }
    }
}
</script>

<style lang="scss" module>
.historyTrjy {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    .historyMap {
        margin-left: 0;
        width: 100%;
        // height: calc(100vh - 304px);
    }
}
</style>
