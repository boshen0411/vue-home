<template>
    <div class="device_wrap">
        <p class="input"
           @click.prevent="showMap">
            <span v-for="(item,idx) in list"
                  :key="idx">
                {{item}}
                <i class="el-icon-close"
                   @click.stop="remove(item)"></i>
            </span>
        </p>
        <section class="map"
                 v-show="show">
            <!-- 设备地图 -->
            <div class="content">
                设备：
                <el-cascader :options="servers"
                             filterable
                             @active-item-change="getDevice"
                             @change="setmap"
                             v-model="selected">
                </el-cascader>
                <el-amap class="map-block"
                         :center="map.center"
                         :zoom="map.zoom">
                    <el-amap-marker :position="marker.position"
                                    :events="marker.events"
                                    :visible="marker.visible">
                    </el-amap-marker>
                </el-amap>
                <span class="ts-button" @click="show=false">确定</span>
            </div>
        </section>
    </div>
</template>

<script>
import { getServerList, getDeviceList } from 'api/device'

export default {
    props: ['label', 'value'],
    data() {
        return {
            list: ["123", "1566", "123", "1546", "123", "1646"],
            show: false,
            servers: [],
            selected: null,
            map: {
                zoom: 13,
                center: [113.945943, 22.547741]
            },
            marker: {
                position: [113.945943, 22.547741],
                visible: false,
                events: {
                    click(e) {
                        console.log(e,'mark')
                    }
                }
            }
        }
    },
    beforeMount() {
        this.getServers()
    },
    mounted() {
        if (this.value instanceof Array) {
            this.list = this.value
        }
    },
    methods: {
        remove(item) {
            this.list = this.list.filter(r => r != item)
        },
        showMap() {
            this.show = true;
        },
        setOption(s) {
            this.servers = s.map(item => {
                return {
                    label: item.name,
                    value: item.id,
                    children: []
                }
            })
        },
        setChildren(id, list) {
            let r = list.map(item => {
                return {
                    label: item.name,
                    value: item
                }
            })
            r.unshift({ label: '全部', value: 'all' })
            this.servers.some(item => {
                if (item.value == id) {
                    item.children = r;
                    return true;
                }
            })
        },
        getServers() {
            if (this.$store.getters.servers && this.$store.getters.servers.length) {
                let s = this.$store.getters.servers;
                this.setOption(s)
            } else {
                getServerList().done(res => {
                    this.setOption(res.dtos)
                })
            }
        },
        getDevice(val) {
            let exist = this.servers.some(item => item.value == val[0] && item.children.length)
            if (!exist) {
                getDeviceList(val[0]).done(res => {
                    if (res.total) {
                        this.setChildren(val[0], res.list)
                    }
                })
            }
        },
        setmap() {
            // console.log(this.selected)
            if (this.selected && this.selected[1] != 'all') {
                let info = this.selected[1];
                let pos = [info.longitude,info.latitude];
                this.map.center = pos;
                this.marker.position = pos;
                this.marker.visible = true
            }
        }
    }
}
</script>


<style lang="scss" scoped>
@import '~style/basic/param';

.device_wrap {
    display: inline-block;
    vertical-align: middle;
    .input {
        display: block;
        border-radius: 4px;
        height: 40px;
        min-width: 120px;
        max-width: 350px;
        margin: 0;
        padding: 5px 10px;
        font-size: 12px;
        background-color: #03428e;
        overflow: hidden;
        text-overflow: ellipsis;
        // white-space: nowrap;
        span {
            display: inline-block;
            vertical-align: middle;
            white-space: nowrap;
            margin: 4px;
            padding: 3px 5px;
            background-color: rgba(0, 0, 0, 0.2);
        }
        i {
            display: inline-block;
            vertical-align: middle;
            cursor: pointer;
            padding: 2px 3px;
            color: $color-red;
        }
    }
    .map {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 999;
        background-color: rgba(#ffffff, 0.2);
        .content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            min-width: 300px;
            min-height: 300px;
            padding: 20px;
            background-color: $color-dark-blue;
            color: #fff;
        }
    }
    .map-block {
        margin-top: 20px;
        width: 450px;
        height: 450px;
    }
}
</style>

