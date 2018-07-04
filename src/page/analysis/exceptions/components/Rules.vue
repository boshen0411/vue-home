<template>
    <div class="rules-wrap">
        <header>
            <h3>分析规则列表</h3>
            <div class="btns">
                <button class="ts-button info" @click="$emit('toggle','SearchPage')">返回</button>
                <button class="ts-button" @click="$emit('toggle','EditRule')">添加</button>
            </div>
        </header>
        <ul class="rules-list ui-scrollbar">
            <li v-for="i in 30" :key="i">
                <div>
                    <p @click="show(i)">
                        <i :class="curItem==i ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
                        <span>一般嫌疑人{{i}}</span>
                        <span class="description" v-show="curItem!=i">
                            <em>条件：</em>
                            特定地点，12小时内，同一人多次出现
                        </span>
                    </p>
                    <p class="edit">
                        <span @click="edit(i)">编辑</span>
                        <el-dropdown class="operate" trigger="click">
                            <span>更多
                                <i class="el-icon-arrow-down"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    删除
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    复制
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </p>
                </div>
                <section v-show="curItem==i">
                    <p>
                        <span>规则类型：</span>同人单位时间内多次出现</p>
                    <p>
                        <span>通知方式：</span>系统，短信</p>
                    <p>
                        <span>通知方式：</span>系统，短信</p>
                    <p>
                        <span>条件：</span>特定地点，12小时内，同一人多次出现</p>
                    <p>
                        <span>规则：</span>其他规则条目</p>
                </section>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            curItem: null
        }
    },
    methods: {
        show(id) {
            this.curItem = (this.curItem === id) ? null : id;
        },
        edit(id) {
            this.$emit('getRule',id)
        }
    }
}
</script>


<style lang="scss" scoped>
@import '~style/basic/param';

.rules-wrap {
    min-width: 1024px;
    padding-bottom: 15px;
    background-color: $color-dark-blue;
    header {
        text-align: center;
        h3 {
            display: inline-block;
            padding: 0 30px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            border: 1px $color-sky-blue solid;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
        .btns {
            text-align: right;
            margin: 20px 0;
            padding: 0 15px;
            button {
                font-size: 18px;
                padding: 5px 25px;
                margin-left: 10px;
            }
        }
    }
}

.rules-list {
    height: calc(100vh - 220px);
    overflow-y: auto;
    li {
        margin-bottom: 30px;
        &:last-child {
            margin-bottom: 3px;
        }
        >div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 15px;
            user-select: none;
            cursor: pointer;
            >p {
                &:first-child {
                    font-size: 16px;
                    flex: 1;
                }
                &:last-child {
                    flex: none;
                    text-align: right;
                }
            }
        }
        .edit {
            >span {
                color: $light-green;
                &:after {
                    content: "";
                    display: inline-block;
                    vertical-align: middle;
                    width: 1px;
                    height: 100%;
                    background-color: #41baff;
                }
            }
        }
        >section {
            display: flex;
            flex-wrap: wrap;
            padding: 25px 30px;
            line-height: 2;
            border-top: 1px solid #003fa7;
            background-color: #02285d;
            p {
                flex-basis: 50%;
            }
        }
        em {
            font-style: normal;
            color: #ccc;
        }
        .description {
            margin-left: 35px;
            max-width: 350px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .operate {
            margin-left: 1em;
            color: #41baff;
            >span {
                cursor: pointer;
            }
        }
    }
}
</style>

