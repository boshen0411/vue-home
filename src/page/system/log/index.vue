<template>
    <section class="logCenter">
        <dl>
            <dt>
                <span>日志中心</span>
            </dt>
            <dd v-for="(log,idx) in logs" :key="idx"
                :class="{ active: log.key === curLog.key }"
                @click="curLog = log"
            >{{ log.logName }}</dd>
        </dl>
        <div v-if="curLog">
            <div class="search">
                <span>共为你找到 {{ curLog.total }} 条相关结果</span>
                <!-- 搜索按钮：暂时隐藏 -->
                <p>
                    <input type="text" name="search" 
                        placeholder="请输入关键词"
                        v-model="searchKey"
                    >
                    <span @click="search(searchKey)">搜索</span>
                </p>
            </div>
            <div class="searchResult">
                <div v-for="(log, idx) in curLog.logList" :key="idx">
                    <p @click="activeType(curLog, idx)">
                        <span>{{ log.type | typeMap }}</span>
                        <span>IP：{{ log.ip }}</span>
                        <span>用户名：{{ log.userName }}</span>
                        <span>操作时间：{{ log.opTime }}</span>
                    </p>
                    <ul v-show="active[curLog.key] && active[curLog.key][idx]">
                        <li v-for="(val, attr) in log.params" :key="attr">
                            {{ attr | attrMap }}：<span>{{ val }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { fullFormat } from 'utils';

export default {
    data() {
        return {
            curLog: '',
            searchKey: '',
            active: {},
            logs: [
                {
                    logName: '警情管理操作日志',
                    key: '01',
                    logList: [
                        {
                            type: 'search',
                            ip: ' 10.25.66.214',
                            userName: '张队长',
                            opTime: fullFormat(Date.now()),
                            params: {
                                time: Date.now(),
                                region: 'XX省XX市XX区',
                                recordId: '123456789',
                                snapId: '12345',
                                picId: '1234567'
                            },
                            result: {
                                recordId: '123456789'
                            }
                        },
                        {
                            type: 'add',
                            ip: ' 10.25.66.214',
                            userName: '张队',
                            opTime: fullFormat(Date.now()),
                            params: {
                                time: Date.now(),
                                region: 'XX省XX市XX区',
                                recordId: '123456789',
                                snapId: '12345',
                                picId: '1234567'
                            },
                            result: {
                                recordId: '123456789'
                            }
                        }
                    ],
                    total: '2'
                },
                {
                    logName: '数据分析操作日志',
                    key: '02',
                    logList: [
                        {
                            type: 'edit',
                            ip: ' 10.25.66.214',
                            userName: '张队长',
                            opTime: fullFormat(Date.now()),
                            params: {
                                time: Date.now(),
                                region: 'XX省XX市XX区',
                                recordId: '123456789',
                                snapId: '12345',
                                picId: '1234567'
                            },
                            result: {
                                recordId: '123456789'
                            }
                        }
                    ],
                    total: '1'
                },
                {
                    logName: '记录管理操作日志',
                    key: '03',
                    logList: [
                        {
                            type: 'del',
                            ip: ' 10.25.66.214',
                            userName: '张队长',
                            opTime: fullFormat(Date.now()),
                            params: {
                                time: Date.now(),
                                region: 'XX省XX市XX区',
                                recordId: '123456789',
                                snapId: '12345',
                                picId: '1234567'
                            },
                            result: {
                                recordId: '123456789'
                            }
                        }
                    ],
                    total: '1'
                },
                {
                    logName: '设备管理操作日志',
                    key: '04',
                    logList: [
                        {
                            type: 'sync',
                            ip: ' 10.25.66.214',
                            userName: '张队长',
                            opTime: fullFormat(Date.now()),
                            params: {
                                time: Date.now(),
                                region: 'XX省XX市XX区',
                                recordId: '123456789',
                                snapId: '12345',
                                picId: '1234567'
                            },
                            result: {
                                recordId: '123456789'
                            }
                        }
                    ],
                    total: '1'
                },
                {
                    logName: '系统设置操作日志',
                    key: '05',
                    logList: [
                        {
                            type: 'check',
                            ip: ' 10.25.66.214',
                            userName: '张队长',
                            opTime: fullFormat(Date.now()),
                            params: {
                                time: Date.now(),
                                region: 'XX省XX市XX区',
                                recordId: '123456789',
                                snapId: '12345',
                                picId: '1234567'
                            },
                            result: {
                                recordId: '123456789'
                            }
                        }
                    ],
                    total: '1'
                }
            ]
        }
    },
    mounted() {
        this.curLog = this.logs[0]
    },
    methods: {
        search(k) {
            // console.log(k)
        },
        activeType(log, idx) {
            if(!this.active[log.key]) this.$set(this.active, log.key, {})
            let flag = this.active[log.key][idx]
            this.$set(this.active[log.key], idx, !flag)
        }
    },
    filters: {
        attrMap(val) {
            if (val === 'time') {
                return '时间'
            } else if (val === 'region') {
                return '地区'
            } else if (val === 'recordId') {
                return '档案ID'
            } else if (val === 'snapId') {
                return '抓拍记录ID'
            } else if (val === 'picId') {
                return '图片ID'
            }
        },
        typeMap(val) {
            if (val === 'search') {
                return '搜索'
            } else if (val === 'add') {
                return '添加'
            } else if (val === 'del') {
                return '删除'
            } else if (val === 'edit') {
                return '编辑'
            } else if (val === 'sync') {
                return '同步'
            } else if (val === 'check') {
                return '查看'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~style/basic/param';

$royal-blue: #02295d;
.logCenter {
    display: flex;
    justify-content: space-between;
    height: calc(100vh - 88px);
    > dl {
        margin-right: 10px;
        width: 200px;
        flex-shrink: 0;
        background: $color-dark-blue;
        dt {
            margin-bottom: 20px;
            text-align: center;
            > span {
                display: inline-block;
                width: 120px;
                height: 40px;
                border-radius: 0 0 10px 10px;
                border: 1px solid $color-light-blue;
                line-height: 40px;
                font-size: 16px;
            }
        }
        dd {
            padding-left: 40px;
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            color: #fff;
            cursor: pointer;
            user-select: none;
            &.active {
                background: $color-light-blue;
            }
        }
    }
    > div {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
}

.search {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    padding-bottom: 10px;
    background: $color-dark-blue;
    > span {
        color: #ccc;
    }
    > p {
        display: inline-flex;
        align-items: center;
        input {
            width: 238px;
            height: 40px;
            border-radius: 4px;
            padding: 0 10px 0 40px;
            background-image: url('~assets/icons/search.png');
            background-size: 20px;
            background-position: 10px;
            background-repeat: no-repeat;
            background-color: $color-deep-blue;
            line-height: 40px;
            font-size: 14px;
            color: #fff;
        }
        > span {
            margin-left: 10px;
            display: inline-block;
            width: 80px;
            height: 40px;
            border-radius: 4px;
            background: $color-light-blue;
            text-align: center;
            line-height: 40px;
            font-size: 18px;
            cursor: pointer;
            user-select: none;
        }
    }
}
.searchResult {
    flex: 1;
    padding: 10px 0;
    background: $color-dark-blue;
    > div {
        display: flex;
        flex-direction: column;
        > p {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 50px;
            padding: 0 30px;
            > span {
                &:nth-of-type(1) {
                    flex: 1
                }
                &:nth-of-type(2) {
                    flex: 2
                }
                &:nth-of-type(3) {
                    flex: 2
                }
                &:nth-of-type(4) {
                    flex: 2
                }
            }
        }
        > ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 17px 60px;
            background: $royal-blue;
            font-size: 14px;
        }
        li {
            display: inline-block;
            font-size: 16px;
            color: #999;
            > span {
                color: $color-light-blue;
                // cursor: pointer;
                // user-select: none;
            }
        }
    }
}
</style>
