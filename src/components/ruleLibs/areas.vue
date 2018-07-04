<template>
    <section :class="$style.areasName">
        <span @click="show = true">{{ value }}</span>
        <section v-show="show"
                 :class="$style.container">
            <div>
                <section :class="$style.form">
                    <div>
                        <div>
                            <em>名&emsp;&emsp;称：</em>
                            <input type="text"
                                   placeholder="请输入名称"
                                   v-model.trim="form.name">
                        </div>
                        <div>
                            <em>身份证号：</em>
                            <input type="text"
                                   maxlength="18"
                                   placeholder="请输入身份证号"
                                   v-model="form.identity">
                        </div>
                    </div>
                    <div>
                        <div>
                            <em>模板类型：</em>
                            <el-cascader :class="$style.cascader"
                                         change-on-select
                                         :options="areas"
                                         v-model="form.typeName" />
                        </div>
                        <div>
                            <em>人脸照片：</em>
                            <figure @click="$refs.uploader.click()">
                                <img v-if="form.imgs.length"
                                     :src="form.imgs[0].blob">
                            </figure>
                        </div>
                    </div>
                    <div :class="$style.btns">
                        <button @click="query(0)">搜索</button>
                        <button @click="show = false">取消</button>
                        <button @click="reset">重置</button>
                    </div>
                </section>
                <p v-if="result.total"
                   :class="$style.total">共搜索到
                    <span>{{ result.total }}</span>条数据</p>
                <auto-table v-if="result.list && result.list.length"
                            :class="$style.table"
                            :data="result.list">
                    <span prop="id"
                          label="档案ID"
                          width="190"></span>
                    <span label="模版类型"
                          width="132">
                        <template scope="idx">
                            <span v-if="!result.list[idx].tempId">-</span>
                            <span v-else>{{ pickArea(result.list[idx].tempId) }}</span>
                        </template>
                    </span>
                    <span prop="name"
                          label="名称"
                          width="180"></span>
                    <span prop="idCard"
                          label="身份证号码"
                          width="128"></span>
                    <span label="操作"
                          width="170">
                        <template scope="idx">
                            <router-link :class="$style.btn"
                                         :to="`/faces/search/detail?id=${result.list[idx].id}`"
                                         target="_blank">查看</router-link>
                            <span :class="$style.btn"
                                  @click="add(result.list[idx].name)">添加</span>
                        </template>
                    </span>
                </auto-table>
                <page-footer :class="$style.footer"
                             :total="Math.ceil(result.total / 8)"
                             :cur.sync="curPage"
                             :loading="loading"
                             @turnPage="query"></page-footer>
            </div>
        </section>
        <uploader ref="uploader"
                  :maxNum="1"
                  @cb="form.imgs = $event"></uploader>
    </section>
</template>

<script>
import { getDocList } from 'api/record'

export default {
    props: ['value'],
    components: {
        AutoTable: () => import('@/AutoTable'),
        uploader: () => import('@/ImgUploader'),
        PageFooter: () => import('@/PageFooter')
    },
    mounted() {
        this.val = this.value;
    },
    data() {
        return {
            val: null,
            show: false,
            form: {
                name: '',
                identity: '',
                typeName: [],
                imgs: []
            },
            loading: false,
            curPage: 1,
            totalPage: 1,
            result: {},
            queryArgs: {}
        }
    },
    computed: {
        areas() {
            return this.$store.getters.areas
        }
    },
    methods: {
        renew(val) {
            this.$emit('update:value', val)
        },
        reset() {
            for (let attr in this.form) {
                let val = ''
                if (attr === 'imgs' || attr === 'typeName') {
                    val = []
                }
                this.form[attr] = val
            }
            this.result = {}
        },
        add(name) {
            this.$emit('update:value', name)
            this.show = false
        },
        query(page) {
            this.loading = true;
            if (!page) this.curPage = 1
            const args = {
                pageSize: 8,
                tempId: this.form.typeName[this.form.typeName.length - 1],
                name: this.form.name,
                idCard: this.form.identity
            }
            this.queryArgs = args
            this.getData(page)
        },
        getData(page) {
            this.queryArgs.pageNum = page ? page - 1 : 0
            getDocList(this.queryArgs).done(res => {
                if (!res.total) {
                    this.$message.warning('暂无内容')
                }
                this.result = res
                this.loading = false;
            })
        },
        pickArea(id) {
            const result = []
            const loop = r => {
                const y = r.find(o => {
                    if (id == o.value) {
                        return true
                    }
                    if (o.children && o.children.length) {
                        return loop(o.children)
                    }
                })
                return y && result.unshift(y.label)
            }
            loop(this.areas)
            return result.join(' ')
        }
    }
}
</script>

<style lang='scss' module>
@import '~style/basic/param';
$royal-blue: #04326d;
$light-sky: #ebf5ff;
.areasName {
    vertical-align: middle;
    display: inline-block;
    >span {
        vertical-align: middle;
        display: inline-block;
        width: 200px;
        height: 40px;
        padding: 0 10px;
        border-radius: 4px;
        background: $royal-blue;
        line-height: 40px;
    }
    .container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        >div {
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 1000px;
            padding: 0 10px 10px 10px;
            background: #fff;
        }
    }


    .form {
        display: flex;
        justify-content: space-between;
        padding: 15px 0;
        >div {
            &:not(.btns) {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            >div {
                display: inline-flex;
                align-items: center;
                height: 50px;
                &+div {
                    margin-top: 10px;
                }
                >em {
                    margin-right: 1em;
                    font-style: normal;
                    font-size: 16px;
                    color: #333;
                }
                >input {
                    padding: 0 10px;
                    background: $light-sky !important;
                    color: #333;
                }
                .cascader {
                    input {
                        background: $light-sky !important;
                        border-color: $light-sky !important;
                    }
                    span {
                        color: #333 !important;
                    }
                }
                >figure {
                    display: inline-block;
                    width: 40px;
                    height: 50px;
                    position: relative;
                    &:empty {
                        border: 1px solid $color-light-blue;
                        position: relative;
                        cursor: pointer;
                        &:before,
                        &:after {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            content: '';
                            display: inline-block;
                            background: $color-light-blue;
                        }
                        &:before {
                            width: 15px;
                            height: 2px;
                        }
                        &:after {
                            width: 2px;
                            height: 15px;
                        }
                    }
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        cursor: pointer;
                    }
                    &:not(:empty):hover {
                        &:before {
                            position: absolute;
                            top: 0;
                            left: 0;
                            content: '';
                            display: block;
                            width: 100%;
                            height: 100%;
                            background: rgba(0, 0, 0, 0.3);
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        .btns {
            display: flex;
            justify-content: space-between;
            align-items: center;
            >button {
                width: 80px;
                height: 40px;
                border: 1px solid $color-light-blue;
                border-radius: 4px;
                line-height: 40px;
                font-size: 16px;
                color: $color-light-blue;
                cursor: pointer;
                user-select: none;
                &:hover {
                    opacity: .8;
                }
                &+button {
                    margin-left: 30px;
                }
                &:nth-of-type(1) {
                    background: $color-light-blue;
                    color: #fff;
                    &:active {
                        background: $color-sky-blue;
                    }
                }
                &:nth-of-type(2) {
                    background: #fff;
                }
                &:nth-of-type(3) {
                    background: #fff;
                }
            }
        }
    }

    .total {
        margin-bottom: 10px !important;
        padding: 18px 0 18px 54px;
        background: $light-sky url('assets/icons/result.png') no-repeat 20px center;
        font-size: 16px;
        color: #333;
        span {
            color: $color-light-blue;
        }
    }

    .table {
        background: $light-sky !important;
        >ul {
            background: #d6e8f9;
            li {
                color: #333 !important;
            }
        }
        >section {
            >ul {
                >li {
                    color: #333;
                }
                &:hover {
                    background: $color-sky-blue;
                    >li {
                        color: #fff;
                    }
                    .btn {
                        color: #fff;
                    }
                }
            }
        }
        .btn {
            color: $color-light-blue;
            cursor: pointer;
            user-select: none;
            &+.btn {
                margin-left: 14px;
            }
        }
    }

    .footer {
        padding: 10px 0;
        background: $light-sky;
        border-top: 1px solid #c5e2fb;
        >div {
            color: #333;
            >span {
                border-color: #d3dce6;
            }
        }
        input {
            background: #fff !important;
            width: 34px !important;
        }
    }
}
</style>