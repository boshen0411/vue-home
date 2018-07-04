<template>
    <div :class="$style.server_data">
        <h3 :class="$style.title">服务数据大盘</h3>
        <ul :class="$style.server">
            <li>
                <!-- @click="sync" -->
                <p @click="sync">同步数据</p>
            </li>
            <li>
                <p>服务器设备数<br>
                    <big>{{totalDev}}</big>
                </p>
            </li>
            <li>
                <!-- :href="link | toLink" target="_blank" -->
                <a @click="ser">服务器控制台</a>
            </li>
        </ul>
        <div :class="$style.equip">
            <div :class="$style.list">
                <h3 :class="$style.title">设备列表</h3>
                <dl class="ui-scrollbar">
                    <dt v-for="(s,idx) in deviceList"
                        :key="idx"
                        :class="[current && s.id==current && $style.active]"
                        @click="pickDevice(s.id)" class="over">{{s.name}}</dt>
                </dl>
            </div>
            <div :class="$style.detail">
                <h3 :class="$style.title">设备详情</h3>
                <nav :class="$style.tagbar">
                    <span v-for="(tag,idx) in tags"
                          :key="idx"
                          :class="[tag.id == curTag && $style.active]"
                          @click="switchTag(tag.id)">
                        {{tag.name}}
                    </span>
                </nav>
                <component :class="$style.devicebox" :is="curTag"
                           :details="details"></component>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['link'],
    data() {
        return {
            details: {},
            current: null,
            tags: [
                { name: '设备位置', id: 'Dlocation' },
                { name: '实时影像', id: 'Dvideo' },
                { name: '设备信息', id: 'Dinfo' }
            ],
            curTag: 'Dlocation'
        }
    },
    components: {
        Dlocation: () => import('./device_location'),
        Dvideo: () => import('./device_video'),
        Dinfo: () => import('./device_info')
    },
    computed: {
        deviceList() {
            if (this.$store.getters.devices.length) {
                this.details = this.$store.getters.devices[0];
                this.current = this.$store.getters.devices[0].id;
            }
            return this.$store.getters.devices
        },
        curServer() {
            return this.$store.getters.currentServer
        },
        totalDev() {
            return this.$store.getters.totalDev
        }
    },
    filters: {
        toLink(x) {
            if (/^http(s)?\:.+?/.test(x)) {
                return x
            } else {
                return 'http://' + x
            }
        }
    },
    methods: {
        pickDevice(id) {
            if (this.current == id) {
                return
            }
            this.current = id;
            let t = this.deviceList.filter(dv => dv.id == id)
            this.details = t[0]
        },
        ser() {
            this.$message.warning('内网模式下无法连接到该服务器')
        },
        sync() {
            this.$message.warning('内网模式下无法同步数据')
            // if (!this.curServer) {
            //     return this.$message.warning("请先选择要同步的服务")
            // }
            // this.$confirm("即将从选定服务器上同步数据，是否继续？", '同步数据', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).done(() => {
            //     this.$store.dispatch('device/syncFromServer')
            //     this.$notify.success({
            //         title: '提示',
            //         message: '同步数据成功！'
            //     })
            // })
        },
        switchTag(id) {
            if (this.curTag == id) return;
            this.curTag = id;
        }
    },
    mounted() {
        console.log(this.$store.state.device)
    }
}
</script>
<style lang="scss" module>
@import '~style/basic/param';

.server_data {
    display: inline-block;
    width: calc(100% - 310px);
    height: 100%;
    margin-left: 10px;
    vertical-align: top;
    color: #fff;
    background: $color-dark-blue;
}

h3.title {
    width: 120px;
    height: 40px;
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    border: 1px $color-light-blue solid;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.server {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    padding: 0 10px;
    font-size: 0;
    li {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        max-width: 250px;
        width: 30%;
        height: 120px;
        border: solid 1px $color-light-blue;
        p {
            padding-left: 30px;
            font-size: 20px;
        }
        &:first-child {
            cursor: pointer;
            &:before {
                content: url('assets/icons/server_sync.png');
                width: 70px;
                height: 60px;
            }
        }
        &:nth-child(2) {
            &:before {
                content: url('assets/icons/equip_count.png');
                width: 72px;
                height: 54px;
            }
            p {
                font-size: 16px;
                color: #c7c6c6;
            }
            big {
                color: #fff;
                font-size: 30px;
            }
        }
        a {
            display: flex;
            align-items: center;
            font-size: 20px;
            &:before {
                content: url('assets/icons/server_equip.png');
                width: 66px;
                height: 66px;
                margin-right: 20px;
            }
            &:hover {
                opacity: .8;
            }
        }
    }
}

.equip {
    height: calc(100vh - 278px);
    padding: 0 10px 20px 10px;
    .list,
    .detail {
        display: inline-block;
        vertical-align: top;
        font-size: 14px;
        background-color: #002c6c;
        border: solid 1px #0965d0;
        overflow: hidden;
        .title {
            border-top: none 0;
        }
    }
    .list {
        width: 20%;
        height: 100%;
        text-align: center;
        dl {
            height: calc(100% - 50px);
            margin-top: 10px;
            overflow-y: auto;
        }
    }
    dt {
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        &.active,
        &:hover {
            background-color: $color-light-blue;
        }
    }
}

.detail {
    width: calc(80% - 10px);
    height: 100%;
    margin-left: 10px;
}

.tagbar {
    display: flex;
    align-items: center;
    height: 40px;
    margin-top: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid $color-deep-blue;
    span {
        display: inline-block;
        width: 120px;
        height: 100%;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
    }
    .active {
        position: relative;
        color: #41baff;
        cursor: default;
        &:after {
            content: "";
            display: block;
            width: 120px;
            height: 2px;
            position: absolute;
            left: 0;
            bottom: -12px;
            background-color: #41baff;
        }
    }
}
.devicebox {
    padding: 20px;
}
</style>
<style type="text/css" scoped>
    .over {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        width: 100%;
    }
</style>