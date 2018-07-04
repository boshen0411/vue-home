<template>
    <div :class="$style.person_query">
        <div :class="$style.query">
            <div :class="$style.field">
                <el-select :class="$style.select" v-model="option" placeholder="选项">
                    <el-option
                        v-for="o of options"
                        :key="o.label"
                        :label="o.label"
                        :value="o.value"
                    >
                    </el-option>
                </el-select>
                <input :class="$style.cin" v-model="searchTxt" type="text" placeholder="请输入内容">
            </div>
            <a :class="$style.btn" @click="search">搜索</a>
        </div>
        <template v-if="query.total>0">
            <div :class="$style.handle">
                <p>
                    <span>
                        <button @click="selectAll">全选</button>
                        <button @click="multAdd">添加</button>
                        <button @click="reset">重置</button>
                    </span>
                    <span>共搜索到<em>{{query.total}}</em>条数据</span>
                </p>
            </div>
            <div :class="$style.result">
                <ul :class="$style.header">
                    <li></li>
                    <li>姓名</li>
                    <li>身份证</li>
                    <li>
                        <span>出生日期</span>
                        <p :class="$style.arrow">
                            <i :class="$style.green"></i>
                            <i></i>
                        </p>
                    </li>
                    <li>
                        <span>年龄</span>
                        <p :class="$style.arrow">
                            <i></i>
                            <i :class="$style.red"></i>
                        </p>
                    </li>
                    <li>
                        <span>籍贯</span>
                        <p :class="$style.arrow">
                            <i></i>
                            <i></i>
                        </p>
                    </li>
                    <li>人脸照片</li>
                    <li>操作</li>
                </ul>
                <section class="ui-scrollbar" :class="[$style.content,query.total<=8 && $style.noFooter]">
                    <ul :class="$style.record" v-for="(o,idx) in query.list" :key="idx">
                        <li>
                            <label>
                                <input type="checkbox" :value="{id:o.id,name:o.name}" v-model="selects"/>
                                <i></i>
                            </label>
                        </li>
                        <li>{{o.name}}</li>
                        <li>{{o.idCard}}</li>
                        <li>{{o.dateOfBorth}}</li>
                        <li>{{o.age}}</li>
                        <li>{{o.address}}</li>
                        <li>
                            <a @click="put(o)">{{ o.faceTotal }}</a>
                        </li>
                        <li>
                            <a @click="detail"></a>
                            <a @click="addPeople(o)"></a>
                        </li>
                    </ul>
                </section>
                <page-footer :class="$style.footer"
                    :total="Math.ceil(query.total/8)"
                    :cur.sync="curPage" 
                    @turnPage="turnPage"
                ></page-footer>
            </div>
        </template>
    </div>
</template>
<script>
    export default {
        props: [ 'put'],
        components: {
            pageFooter: () => import('@/PageFooter')
        },
        computed: {
          query() {
              return this.$store.getters.locusQuery
          }
        },
        data(){
            return {
                option: '姓名',
                searchTxt: null,
                selects: [],
                options: [
                    {
                        label: '姓名',
                        value: '姓名'
                    },
                    {
                        label: '身份证号',
                        value: '身份证号'
                    },
                    {
                        label: '图片',
                        value: '图片'
                    }
                ],
                curPage: 1
            }
        },
        methods: {
            search() {
                if (!this.option) {
                    this.$message.warning("请搜索条件")
                    return
                }
                if (!this.searchTxt) {
                    this.$message.warning("请填写搜索内容")
                    return
                }
                let t = {
                    label: this.option,
                    value: this.searchTxt
                }
                this.$store.dispatch('locus/getQuery',t)
            },
            detail(){
            },
            addPeople(o) {
                let ob = {id: o.id,name: o.name}
                this.$store.dispatch('locus/addPeople',ob)
            },
            selectAll() {
                this.selects = this.query.list.map(r => {
                    return {
                        id: r.id,
                        name: r.name
                    }
                })
            },
            multAdd() {
                if (!this.selects.length) {
                    return;
                }
                this.$store.dispatch('locus/pushPeople',this.selects)
            },
            reset() {
                this.selects = []
            },
            turnPage() {
            }
        }
    }
</script>
<style lang="scss" module>
@import '~style/basic/param';

    .person_query {
        width: 100%;
        height: 100%;
        font-size: 0;
        color: #fff;
        background: $color-dark-blue;
    }
    .query {
        padding: 15px;
        text-align: center;
    }
    .field {
        display: inline-block;
        width: 500px;
        margin: 0 auto;
        vertical-align: middle;
        border-radius: 4px;
        background-color: $color-deep-blue;
        input {
            color: #fff;
            border: none;
            background: transparent;
        }
    }
    .select {
        position: relative;
        width: 72px;
        &:after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 1px;
            height: 24px;
            margin: auto;
            background: #03316d;
        }
    }
    .cin {
        width: calc(100% - 72px);
        height: 40px;
        padding: 0 10px;
        font-size: 14px;
    }
    .btn {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        vertical-align: middle;
        font-size: 16px;
        cursor: pointer;
        &:hover {
            opacity: .8;
        }
    }
    .handle {
        padding: 10px 0;
        background: #01122e;
        p {
            padding: 13px 20px;
            text-align-last: justify;
            background: $color-dark-blue;
        }
        button {
            display: inline-block;
            width: 60px;
            height: 30px;
            font-size: 14px;
            border-radius: 4px;
            cursor: pointer;
            &:hover {
                opacity: .8;
            }
            &:nth-child(odd) {
                color: $color-light-blue;
                background: transparent;
                border: solid 1px $color-light-blue;
            }
            &:nth-child(even) {
                margin: 0 10px;
                color: #fff;
                background-color: $color-light-blue;
            }
        }
        span {
            display: inline-block;
            text-align-last: center;
            &:last-child {
                font-size: 16px;
                &:before {
                    content: url('assets/icons/result.png');
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    vertical-align: middle;
                    margin-right: 11px;
                }
            }
        }
        em {
            font-style: normal;
            color: #41baff;
        }
    }
    .result {
        // min-height: calc(100vh - 250px);
        ul {
            display: inline-table;
            width: 100%;
        }
        li {
            display: table-cell;
            width: 12%;
            vertical-align: middle;
            &:first-child {
                width: 3%;
            }
            &:nth-of-type(3) {
                width: 18%;
            }
            &:nth-of-type(2), &:nth-of-type(4) {
                width: 15%;
            }
            &:nth-child(n + 2){
                max-width: 0;
                text-align: center;
                padding: 0 1em;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
    .header {
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        background-color: $color-deep-blue;
        p, span {
            vertical-align: middle;
        }
    }
    .arrow {
        display: inline-block;
        i {
            display: block;
            width: 0;
            height: 0;
            cursor: pointer;
            border-left: 5px transparent solid;
            border-right: 5px transparent solid;
            &:hover {
                opacity: .8;
            }
            &:first-child {
                border-bottom: 6px #fff solid;
                &.green {
                    border-bottom-color: #14e4b6;
                }
            }
            &:last-child {
                margin-top: 4px;
                border-top: 6px #fff solid;
                &.red {
                    border-top-color: $color-red;
                }
            }
            
        }
    }
    .content {
        overflow-y: auto;
        height: calc(100vh - 445px);
        max-height: 600px;
        min-height: 60px;
        &.noFooter {
            height: calc(100vh - 392px);
        }
    }
    .record {
        height: 60px;
        li {
            vertical-align: middle;
            font-size: 14px;
            &:first-child {
                text-align: right;
            }
            &:last-child {
                a {
                    display: inline-block;
                    vertical-align: middle;
                    &:first-child {
                        &:before {
                            content: url('assets/icons/arrow-right.png');
                        }
                    }
                    &:last-child {
                        margin-left: 15px;
                        &:before {
                            content: url('assets/icons/trajectory.png');
                        }
                    }
                }
            }
        }
        label {
            position: relative;
            display: inline-block;
			width: 16px;
            height: 16px;
            vertical-align: middle;
            border: solid 1px #0158b4;
            &:hover {
                opacity: .9;
            }
        }
        i {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 100%;
        }
        input {
            position: relative;
            z-index: 9;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
            &:checked + i {
                background: url('assets/icons/checked.png') no-repeat center;
                background-size: contain; 
            }
        }
        a {
            cursor: pointer;
            &:hover {
                opacity: .8;
            }
        }
    }
    .footer {
        padding: 12px;
        border-top: 1px #153f76 solid;
    }
</style>
