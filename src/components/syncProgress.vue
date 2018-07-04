<template>
    <div class="progress-wrap" v-show="(percent > 0 || percent === 0) && percent/100 < 1">
        <div class="progress" @click="toggleList">
            <p class="bk"></p>
            <p class="pg"
               :style="`width:${percent}%`">
                <i></i>
            </p>
        </div>
        <transition name="fade">
            <div class="sync_list" v-show="showList && syncList && syncList.length">
                <h3>同步列表</h3>
                <ul class="ui-scrollbar">
                    <li v-for="(item,idx) in syncList" :key="idx">
                        <p>
                            <i class="el-icon-close" @click="stopSync(item)"></i>
                        </p>
                        同步中：{{item.tableName}}
                        <p class="range">
                            <span>
                                <i :style="`flex-basis:${bitPg(item.progress)}`"></i>
                            </span>
                            {{bitPg(item.progress)}}
                        </p>
                        <p class="time">
                            预估完成时间：{{item.time}}
                        </p>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
import { getToken } from 'auth'

export default {
    data() {
        return {
            showList: false,
            syncList: null,
            percent: null,
            ws: null
        }
    },
    mounted () {
        this.getSyncList()
    },
    methods: {
        bitPg(p) {
            return parseFloat(p * 100).toFixed(2) + '%'
        },
        toggleList() {
            this.showList = !this.showList;
        },
        getSyncList() {
            this.ws = new WebSocket(`${ this.$wshost }/synlist/${ getToken() }/abc/abc`)
            this.ws.onopen = () => {
                // 触发socket推送
                // ws.send('')
            }
            this.ws.onmessage = e => {
                console.log(e)
                let o = JSON.parse(e.data)
                if (o.allProcess === 0 || o.allProcess > 0) {
                    this.percent = o.allProcess * 100
                    this.syncList = o.synsSimples
                }
                if (this.percent === 100) {
                    ws.close()
                }
            }
            this.ws.onclose = () => {
                this.$message.warning('socket已关闭')
            }
        },
        stopSync(item) {
            /* TODO:未实现同步任务的停止功能 */
            this.ws.close()
            const ws = new WebSocket(`${ this.$wshost }/synlist/${ getToken() }/${item.tempId}/CANCEL`)
            ws.onopen = () => {
                setTimeout(() => {
                    ws.close()
                },1000)
            }
            ws.onclose = () => {
                console.log('closed')
            }            
        }
    }
}
</script>


<style lang="scss" scoped>
@import '~style/basic/param';
.progress-wrap {
    display: inline-block;
}

.progress {
    position: relative;
    z-index: 99;
    margin-right: 30px;
    width: 130px;
    height: $bar-height;
    line-height: $bar-height;
    cursor: pointer;
    p {
        display: inline-block;
        vertical-align: middle;
    }
    .bk {
        width: 100%;
        height: 4px;
        background-color: $color-deep-blue;
    }
    .pg {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 999;
        height: 4px;
        transition: all 0.3s;
    }
    i {
        display: inline-block;
        width: 100%;
        white-space: nowrap;
        &:before,
        &:after {
            content: "";
            display: inline-block;
            vertical-align: middle;
        }
        &:before {
            width: calc(100% - 5px);
            height: 4px;
            background-image: linear-gradient(90deg, #0158b4, #fff);
        }
        &:after {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            box-shadow: 0 0 5px 5px rgba(105, 181, 232, 0.85);
            background-color: #fdfdfd;
        }
    }
}

.sync_list {
    position: fixed;
    z-index: 999;
    top: $bar-height;
    right: 12px;
    bottom: 10px;
    width: 260px;
    color: #333;
    background-color: #fff;
    text-align: center;
    h3 {
        display: inline-block;
        border: 1px solid $color-sky-blue;
        padding: 10px 30px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        font-size: 16px;
    }
    ul {
        max-height: calc(100% - 50px);
        padding: 20px 10px;
        overflow-y: auto;
        li {
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid $color-sky-blue;
            text-align: left;
            &:last-child {
                margin-bottom: 0;
            }
            p:first-child {
                text-align: right;
                color: $color-red;
                i {
                    cursor: pointer;
                }
            }
            p.time {
                white-space: nowrap;
                font-size: 12px;
            }
        }
    }
    .range {
        display: flex;
        width: 100%;
        align-items: center;
        margin: 10px auto;
        span {
            flex: 1;
            display: flex;
            align-items: center;
            height: 5px;
            margin-right: 8px;
            background-color: #e5e9f2;
            i {
                display: block;
                height: 5px;
                background-color: $color-sky-blue;
            }
            &:after {
                content: "";
                flex: none;
                display: block;
                width: 12px;
                height: 12px;
                margin-left: -2px;
                border-radius: 100%;
                background-color: $color-sky-blue;
            }
        }
    }
}
</style>

