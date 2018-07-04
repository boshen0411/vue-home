<template>
    <div class="row-wrapper">
        <template v-if="current=='home'">
            <div class="col-left">
                <query-list @toggle="goRule" />
            </div>
            <div class="col-right">
                <query-result :snap="results"
                              @itemLocus="locus"
                              @pushItem="getDetail" />
            </div>
        </template>
        <template v-else-if="current=='rule'">
            <!-- 编辑/新增规则 -->
            <edit-rule @toggle="current='home'"
                       :id="currentRule" />
        </template>
        <template v-else-if="current=='locus'">
            <locus-map @close="current='home'" />
        </template>

        <scene-map v-if="showMap"
                   @close="showMap = false"
                   :sceneData="sceneData" />
    </div>
</template>

<script>
import QueryList from './components/QueryList'
import QueryResult from './components/QueryResult'
import EditRule from './components/EditRule'
import LocusMap from './components/map'

export default {
    components: {
        QueryList,
        QueryResult,
        EditRule,
        LocusMap,
        SceneMap: () => import('./components/SceneMap')
    },
    data() {
        return {
            current: 'home',
            showMap: false,
            sceneData: {},
            currentRule: null,
            results: {
                list: [
                    {
                        No: '201254785',
                        type: '身份认证',
                        id: '2017090118222655740',
                        name: '张一',
                        identity: '431001199001011452',
                        deviceID: 'FS2547-AD587144',
                        time: Date.now(),
                        similar: 9,
                        bornDate: Date.now(),
                        bornPlace: '广东省深圳市南山区东方科技大厦',
                        race: '白种人',
                        longtitude: '123.45678',
                        latitude: '123.45678',
                        devicePos: '广东省深圳市龙岗区布吉街道'
                    },
                    {
                        No: '201254785',
                        type: '身份认证',
                        id: '2017090118222655740',
                        name: '张二',
                        identity: '431001199001011452',
                        deviceID: 'FS2547-AD587144',
                        time: Date.now(),
                        similar: 8,
                        bornDate: Date.now(),
                        bornPlace: '广东省深圳市南山区东方科技大厦',
                        race: '黄种人',
                        longtitude: '123.45678',
                        latitude: '123.45678',
                        devicePos: '广东省深圳市龙岗区布吉街道'
                    },
                    {
                        No: '201254785',
                        type: '身份认证',
                        id: '2017090118222655740',
                        name: '张三',
                        identity: '431001199001011452',
                        deviceID: 'FS2547-AD587144',
                        time: Date.now(),
                        similar: 7,
                        bornDate: Date.now(),
                        bornPlace: '广东省深圳市南山区东方科技大厦',
                        race: '黑种人',
                        longtitude: '123.45678',
                        latitude: '123.45678',
                        devicePos: '广东省深圳市龙岗区布吉街道'
                    }
                ],
                total: 3
            }
        }
    },
    methods: {
        goRule(id) {
            if (id) {
                this.currentRule = id;
                // 进入编辑
            } else {
                this.currentRule = null;
                // 进入新增
            }
            this.current = 'rule'
        },
        locus(id) {
            // console.log(id)
            this.current = 'locus'
        },
        getDetail(o) {
            this.$store.dispatch('snap/pullDetail', o).done(res => {
                this.sceneData = res
                this.showMap = true;
            })
        },
    }
}
</script>


<style lang="scss" scoped>
@import '~style/basic/param';
.row-wrapper {
    height: calc(100vh - 88px);
}

.col-left,
.col-right {
    background-color: $color-dark-blue;
}
</style>
