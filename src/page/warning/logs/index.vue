<template>
    <div :class="$style.log_warn">
        <div :class="$style.snapshot_data2">
            <nav :class="$style.horizontal">
                <a
                    :key="k"
                    :class="[ k === tag && $style.active ]"
                    v-for="(v,k) of tags"
                    @click="tag = k"
                >{{ v }}</a>
            </nav>
            <div :class="$style.snapshot2">
                <Comparison v-if="tag === 'comparison'" 
                    :$css="$style"
                    :active.sync="curCompare"
                    @setCurrent="setItem" />
                <Analysis v-else-if="tag === 'analysis'" 
                    :$css="$style"/>
            </div>
        </div>
        <div :class="$style.layout_right">
            <query-field :$css="$style" @search="search"/>
            <div :class="$style.layout_bottom">
                <map-block ref="map" :$css="$style"/>
                <div :class="$style.associated_info2">
                    <nav :class="$style.horizontal">
                        <a
                            :key="k"
                            :class="[ k === tab && $style.active ]"
                            v-for="(v,k) of tabs"
                            @click="tab = k"
                        >{{ v }}</a>
                    </nav>
                    <div :class="$style.association2">
                        <ignore v-if="'ignore' === tab" :remark="remark" :$css="$style"/>
                        <div :class="$style.associate2" v-else>
                            <nav>
                                <a
                                    :key="k"
                                    :class="[ k === info && $style.active ]"
                                    v-for="(v,k) of infos"
                                    @click="info = k"
                                >{{ v }}</a>
                            </nav>
                            <component :id="selected" :is="info" :$css="$style"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Comparison from './components/Comparison';
    import Analysis from './components/Analysis';
    import QueryField from './components/QueryField';
    import MapBlock from './components/MapBlock';
    import Ignore from './components/Ignore';
    import Mac from './components/Mac';
    import Vehicle from './components/Vehicle';
    import Around from './components/Around';

    export default {
        components: { Comparison, Analysis, QueryField, MapBlock, Ignore, Mac, Vehicle, Around },
        data(){
            return {
                tag: 'comparison',
                tags: {
                    comparison: '抓拍比对'
                    // analysis: '数据分析'
                },
                tab: 'associate',
                tabs: {
                    associate: '关联信息',
                    ignore: '忽略信息'
                },
                info: 'around',
                infos: {
                    around: '周围人脸'
                    // mac: 'MAC',
                    // vehicle: '车辆'
                },
                selected: null,
                remark: "",
                curCompare: null
            }
        },
        methods: {
            setItem(o) {
                console.log(o)
                // 设置当前条目对应的忽略信息
                this.remark = o.remark;
                this.selected = o.id;
                this.$refs.map.toggleMap('point', o)
                // 获取当前条目对应的抓拍照片列表
                this.$store.dispatch('warns/getCap',{id: o.sceneId})
            },
            search() {
                this.curCompare = null
                this.$refs.map.toggleMap('heat')
            }
        }
    }
</script>
<style lang="scss" src="./style" module/>
