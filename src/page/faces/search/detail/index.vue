<template>
    <div class="detail-block">
        <div class="info-box">
            <component :is="info"
                       :details='details'
                       @toggle="x => info = x" />
            <face-photo/>
        </div>
        <capture-record :doc="id" @scene="getScene" />
        <scene-map v-if="show"
                   @close="show = false"
                   @detail="show = false"
                   :sceneData="sceneData" />
    </div>
</template>
<script>
import BaseInfo from './components/BaseInfo'
import EditInfo from './components/EditInfo'
import CaptureRecord from './components/CaptureRecord'
import FacePhoto from './components/FacePhoto'

export default {
    components: {
        BaseInfo,
        EditInfo,
        FacePhoto,
        CaptureRecord,
        SceneMap: () => import('./components/SceneMap')
    },
    data() {
        return {
            id: this.$route.query.id,
            info: null,
            show: false,
            sceneData: {}
        }
    },
    computed: {
        details() {
            return this.$store.getters.docDetail;
        }
    },
    beforeMount() {
        if (!this.id) {
            this.$router.push('/faces/search/')
            return;
        } else {
            this.$store.dispatch('document/getDetail', this.id).done(() => {
                this.info = this.$route.query.toggle === 'edit' ? 'EditInfo' : 'BaseInfo'
            })
            // this.$store.dispatch('document/getCapList', {
            //     recordId: this.id,
            //     pageSize: 4
            // })
        }
    },
    methods: {
        getScene(id) {
            this.$store.dispatch('snap/pullDetail', {id}).done(res => {
                this.sceneData = res
                this.show = true;
            })
        }
    }
}
</script>
<style scoped>
.detail-block {
    font-size: 0;
}

.info-box {
    display: inline-block;
    width: calc(100% - 388px);
    vertical-align: top;
}
</style>

