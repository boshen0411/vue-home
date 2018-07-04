<template>
    <div class="row-wrapper">
        <div class="col-left">
            <!-- 人物列表 -->
            <personage/>
        </div>
        <div class="col-right">
            <!-- 右侧窗体 -->
            <component :is="current" :put="put"></component>
        </div>
        <preview v-if="show" :o="pics" @close="show = false"/>
    </div>
</template>

<script>
import Personage from './components/Personage'
import MainMap from './components/MainMap'
import PersonQuery from './components/PersonQuery'
import Locus from './components/Locus'
import Preview from './components/Preview';

export default {
    components: {
        Personage,
        MainMap,
        PersonQuery,
        Preview,
        Locus
    },
    computed: {
        current() {
            return this.$store.getters.locusCurrent
        }
    },
    data() {
        return {
            show: false,
            pics: null
        }
    },
    methods: {
        put(o){
            this.pics = o
            this.show = true
        }
    }
}
</script>


<style lang="scss" scoped>
@import '~style/basic/param';
.row-wrapper {
    height: calc(100vh - 88px);
}

.col-left {
    width: 200px;
    background-color: $color-dark-blue;
}
</style>
