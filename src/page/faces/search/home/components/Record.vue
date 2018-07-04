<template>
    <section class="record" v-loading="loading">
        <div class="head" v-if="list&&list.length">
            <p class="del">
                <span :class="[checkAll,
                    selects.length && selects.length === list.length]"
                    @click="checkAll"
                >全选</span>
                <span @click="pop(selects)">批量删除</span>
            </p>
            <!-- <p class="tip">
                <span>已搜索到
                    <em>{{ snap.total }}</em>个结果
                </span>
            </p> -->
        </div>
        <ul class="label">
            <li>档案ID</li>
            <li>名称</li>
            <li>身份证号码</li>
            <li>操作</li>
        </ul>
        <template v-if="list&&list.length">
            <section class="list ui-scrollbar" :class="{'noFooter': totalPage <= 1}">
                <ul class="row"
                    v-for="(row,idx) in list"
                    :key="idx">
                    <label :class="{active: selects.indexOf(list[idx].id) > -1}" class="checkbox">
                        <input type="checkbox" name="select" :value="list[idx].id" v-model="selects">
                    </label>
                    <li>
                        <span>{{ row.id }}</span>
                    </li>
                    <li>
                        <span>{{ row.name }}</span>
                    </li>
                    <li>
                        <span>{{ row.idCard }}</span>
                    </li>
                    <li>
                        <router-link tag="i"
                                     :to="`/faces/search/detail?id=${row.id}`">
                            <svg-icon ico="look"
                                      width="20px"
                                      height="20px"></svg-icon>
                        </router-link>
                        <router-link tag="i"
                                     :to="`/faces/search/detail?id=${row.id}&toggle=edit`">
                            <svg-icon ico="edit_green"
                                      width="20px"
                                      height="20px"></svg-icon>
                        </router-link>
                        <i @click="del(row)">
                            <svg-icon ico="delete_red"
                                      width="20px"
                                      height="20px">
                            </svg-icon>
                        </i>
                    </li>
                </ul>
            </section>
            <page-footer class="footer"
                :total="totalPage"
                :cur="curPage"
                :loading="loading"
                @turnPage="turnPage(curPage)">
            </page-footer>
        </template>
    </section>
</template>

<script>

export default {
    props: ['turnPage','loading','picData', 'isPicData'],
    components: {
        pageFooter: () => import('@/PageFooter')
    },
    computed: {
        list() {
            if (this.isPicData) {
                return this.picData
            } else {
                return this.$store.getters.documents
            }
        },
        totalPage() {
            if (this.isPicData) {
                return 0
            } else {
                return Math.ceil(this.$store.getters.docTotal / 8)
            }
        },
        curPage() {
            return this.$route.query.page || 1
        }
    },
    data() {
        return {
            selects: []
            // curPage: this.$route.query.page || 1
        }
    },
    methods: {
        checkAll() {
            const len = this.list.length
            if (this.selects.length === this.list.length)  {
                this.selects = []
            } else {
                for(let i = 0; i < len; i ++){
                    this.$set(this.selects,i,this.list[i].id)
                }
            }
        },
        del(item) {
            this.$confirm('此操作将删除该档案条目, 确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).done(() => {
                this.$store.dispatch('document/deleteDoc', item)
            })
        },
        pop(item) {
            this.$confirm('此操作将删除选中档案, 确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).done(() => {
                this.$store.dispatch('document/deleteDocs', item.toString()).done( () => {
                    this.turnPage(this.curPage)
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~style/basic/param';
.head {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 20px;
    background: $color-dark-blue;
    color: #fff;
    .del {
        display: flex;
        align-items: center;
        > span {
            display: inline-block;
            width: 60px;
            height: 30px;
            border: 1px solid $color-light-blue;
            border-radius: 4px;
            text-align: center;
            line-height: 30px;
            font-size: 14px;
            color: $color-light-blue;
            cursor: pointer;
            user-select: none;
            & + span {
                margin-left: 20px;
                width: 80px;
                background: $color-light-blue;
                color: #fff;
            }
        }
    }
}
.record {
    margin-top: 10px;
    background: $color-dark-blue;
    >.label,
    .row {
        display: flex;
        width: 100%;
        align-items: center;
        >li {
            display: table-cell;
            text-align: center;
            &:nth-of-type(1) {
                width: 22%;
            }
            &:nth-of-type(2) {
                width: 27%;
            }
            &:nth-of-type(3) {
                width: 25%;
            }
            &:nth-of-type(4) {
                width: 24%;
            }
        }
    }
    >.list {
        width: 100%;
        min-height: 50px;
        height: calc(100vh - 398px);
        max-height: 500px;
        overflow-y: auto;
        &.noFooter {
            height: calc(100vh - 334px);
        }
    }
}

.label {
    height: 60px;
    background: $color-deep-blue;
    font-size: 18px;
    line-height: 60px;
    color: #fff;
}

.row {
    height: 50px;
    font-size: 14px;
    line-height: 50px;
    color: #fff;
    i {
        margin-left: 16px;
        font-style: normal;
        cursor: pointer;
    }
    &:hover {
        background: $color-light-blue;
        .checkbox {
            border-color: #fff;
        }
    }
}

.footer {
    border-top: 1px solid #153f76;
    padding: 13px 0 22px;
    text-align: center;
}

.checkbox {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: 10px;
    border: 1px solid $color-light-blue;
    line-height: 40px;
}
.active {
    background: url('../../../../../assets/icons/checked.png') no-repeat center;
    background-size: 14px 10px;
}
</style>