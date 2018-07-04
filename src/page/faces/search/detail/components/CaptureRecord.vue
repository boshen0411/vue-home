<template>
    <div :class="$style.capture_record" style="position: relative; overflow-X: hidden">
        <h3>抓拍比中记录</h3>
        <div :class="$style.record_box"
             class="ui-scrollbar">
            <ul v-if="cap.total">
                <li :key="idx"
                    v-for="(o,idx) in cap.list">
                    <img :src="img_url + o.capImage">
                    <div :class="$style.record">
                        <p>时间：{{o.time | format}}</p>
                        <p>图像质量：{{o.imageQuality}}</p>
                        <p>通道编号：{{o.deviceId}}</p>
                        <p>比中相似度：{{toFloat(o.score)}}</p>
                    </div>
                    <p :class="$style.btns">
                        <button :class="$style.scene" @click="goScene(o.scenesId)">查看场景图</button>
                        <!-- <button :class="$style.save">保存为人脸照片</button> -->
                    </p>
                </li>
            </ul>
            <p :class="$style.more" v-if="cap.total<1">暂无比中记录</p>
            <p :class="$style.more" v-show="cap.total && cap.list.length < cap.total">
                <a @click="getMore">加载更多</a>
            </p>
        </div>
        <div :class="$style.loading" v-if="loading">
            <i class="el-icon-loading" :class="$style.load_icon"></i>
        </div>
    </div>
</template>
<script>
    import { api, img_url } from '../../../../../config.js' 
    export default {
        props: ['doc'],
        data() {
            return {
                curPage: 0,
                loading: true,
                cap: {
                    list: [],
                    total: 0
                },
                img_url: img_url
            }
        },
        // computed: {
        //     cap() {
        //         return this.$store.getters.docCap || {list:[],total: 0};
        //     }
        // },
        methods: {
            goScene(id) {
                this.$emit('scene',id)
            },
            toFloat(val) {
                var re = /([0-9]+.[0-9]{2})[0-9]*/
                return val.toString().replace(re,"$1")
            },
            getMore() {
                this.curPage += 1;
                this.$store.dispatch('document/getCapMore', {
                    recordId: this.doc,
                    pageSize: 4,
                    pageNum: this.curPage
                }).catch(() => {
                    this.curPage -= 1;
                })
            }
        },
        mounted() {
            let data = {
                'recordId': this.$route.query.id,
                'pageSize': 4,
                'token': this.$store.getters.token
            }
            this.loading = true
            this.$http.post(api + '/record/query/cap', data).then((response) => {
                this.loading = false
                if (response.data.code === 1000) {
                    this.cap.total = response.data.data.total
                    this.cap.list = response.data.data.list
                }
            })
            let self = this
        }
    }
</script>

<style lang="scss" module>
@import '~style/basic/param';
.capture_record {
    display: inline-block;
    width: 378px;
    margin-left: 10px;
    padding-bottom: 10px;
    vertical-align: top;
    background: $color-dark-blue;
    color: #fff;
    h3 {
        width: 160px;
        height: 40px;
        margin: 0 auto 10px auto;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        border: 1px $color-light-blue solid;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    ul {
        padding: 0 16px;
    }
    li {
        margin-bottom: 20px;
        padding: 20px;
        line-height: 1;
        border: 1px $color-light-blue solid;
        &:hover {
            border-color: #fff;
        }
    }
    img {
        width: 80px;
        height: 100px;
        vertical-align: top;
    }
}

.record_box {
    height: calc(100vh - 164px);
    overflow-y: auto;
}

.record {
    display: inline-block;
    padding-left: 20px;
    vertical-align: top;
    font-size: 14px;
    p {
        &:nth-child(n + 2) {
            margin-top: 1em;
        }
    }
}

.btns {
    margin-top: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.save {
    display: inline-block;
    width: 150px;
    height: 30px;
    // margin: 18px auto 0 auto;
    color: #fff;
    border-radius: 4px;
    background-color: $color-light-blue;
    cursor: pointer;
}

.scene {
    display: inline-block;
    width: 120px;
    height: 30px;
    // margin-left: 30px;
    color: $color-light-blue;
    border-radius: 4px;
    border: 1px solid $color-light-blue;
    background: transparent;
    cursor: pointer;
    margin: 0 auto;
}

.more {
    margin-bottom: 10px;
    text-align: center;
    font-size: 14px;
    a {
        display: inline-block;
        width: 120px;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        background: $color-light-blue;
        cursor: pointer;
    }
}

.loading {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0,0,0,.3);
    z-index: 88;
    top: 0;
}
.load_icon {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: url('../../../../../assets/icons/sync.png') no-repeat center
}
</style>
