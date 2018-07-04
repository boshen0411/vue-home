<template>
    <div v-loading="scenesLoading">
        <div :class="$style.head">
            <p :class="$style.del">
                <span :class="[$style.checkAll,
                    selects.length && selects.length === snap.list.length && $style.active]"
                    @click="checkAll"
                >全选</span>
                <span @click="pop(selects)">批量删除</span>
            </p>
            <p :class="$style.tip">
                <span>已搜索到
                    <em>{{ snap.total }}</em>个结果
                </span>
            </p>
        </div>
        <auto-table :class="[$style.table,$style.noFooter]" 
            :data="snap.list"
            v-loading="loading"
            @drop="getDrop"
        >
            <span label="" width="50">
                <template scope="idx">
                    <label :class="[$style.checkbox,selects.indexOf(snap.list[idx].id) > -1 && $style.active]" >
                        <input type="checkbox" name="select" :value="snap.list[idx].id" v-model="selects">
                    </label>
                </template>
            </span>
            <span label="" width="50">
                <template scope="idx">
                    <label :class="[$style.checkbox,selects.indexOf(snap.list[idx].id) > -1]" style="position: relative">
                        <i class="el-icon-plus" style="position: absolute;left: 0" v-if="!isDrop[idx]"></i>
                        <i class="el-icon-minus" style="position: absolute;left: 0" v-else></i>
                    </label>
                </template>
            </span>
            <span prop="id" label="编号" width="190"></span>
            <span prop="dataType" label="数据类型" width="132"></span>
            <span label="档案ID" width="190">
                <template scope="idx">
                    <span :class="$style.btnBlue"
                        v-if="snap.list[idx].recDTO"
                        @click.stop="$router.push(`/faces/search/detail?id=${snap.list[idx].recDTO.id}`)"
                        v-hoverTip="{
                            '出生日期': snap.list[idx].recDTO.dateOfBirth || '-',
                            '种族': snap.list[idx].recDTO.ethnicity || '-',
                            '出生地': snap.list[idx].recDTO.address || '-'
                        }"
                    >{{ snap.list[idx].recDTO.id }}</span>
                    <span v-else>-</span>
                </template>
            </span>
            <span prop="name" label="姓名" width="128"></span>
            <span prop="idCard" label="身份证号" width="190"></span>
            <span label="设备ID" width="190">
                <template scope="idx">
                    <span v-if="!snap.list[idx].deviceDTO">-</span>
                    <span v-else :class="[$style.btnBlue,$style.deviceId]"
                        @click.stop="$router.push(`/device/services?id=${snap.list[idx].deviceDTO.deviceId}`)"
                        v-hoverTip="[
                            [{'经度': snap.list[idx].deviceDTO.longitude || '-'},
                            {'纬度': snap.list[idx].deviceDTO.latitude || '-'}],
                            {'位置': snap.list[idx].deviceDTO.addr || '-'}
                        ]"
                    >{{ snap.list[idx].deviceDTO.deviceId }}</span>
                </template>
            </span>
            <span prop="createOn" label="时间" width="190"></span>
            <span label="操作" width="176">
                <template scope="idx">
                    <span 
                        :class="$style.btnRed"
                        @click.stop="pop(snap.list[idx].id)"
                    >删除</span>
                </template>
            </span>
            <template slot="drop" scope="idx">
                <section :class="$style.pullDrop">
                    <div>
                        <em>抓拍照片</em>
                        <figure><img :src="img_url + snap.list[idx].capPicture || img" @error="defaultImg($event)"></figure>
                    </div>
                    <div>
                        <em>档案照片</em>
                        <figure><img :src="img_url + snap.list[idx].recordPicture || img" @error="defaultImg($event)"></figure>
                    </div>
                    <div>
                        <em>比中相似度</em>
                        <span>{{ toFloat(snap.list[idx].score) || '-' }}
                            <template v-if="snap.list[idx].compareRecordDTOs && snap.list[idx].compareRecordDTOs.length">
                                （<i :class="$style.btn"
                                    @click="$refs.preview.open(snap.list[idx].compareRecordDTOs)"
                                >{{ snap.list[idx].compareRecordDTOs.length }}</i>）
                            </template>
                        </span>
                    </div>
                    <div>
                        <em>场景图</em>
                        <span  v-if="snap.list[idx].scenesId"
                            :class="$style.btn"
                            @click="getScene(snap.list[idx].scenesId)"
                        >查看</span>
                        <span v-else style="color: #ccc">(暂无场景图)</span>
                    </div>
                </section>
            </template>
        </auto-table>
        <page-footer :class="$style.footer"
            :total="Math.ceil(snap.total / 8)"
            :cur="curPage"
            @turnPage="$store.dispatch('snap/nextList',$event)" />
        <!-- <div :class="$style.pag" v-if="snap.list.length >= 8 || $route.query.page">
            <span @click="pre">
                <i class="el-icon-arrow-left"></i>
            </span>
            <span v-if="$route.query.page">{{parseInt($route.query.page) + 1}}</span>
            <span v-else>1</span>
            <span @click="next">
                <i class="el-icon-arrow-right"></i>
            </span>
        </div> -->
        <preview ref="preview" />
        <scene-map ref="scene"/>
    </div>
</template>
<script>
import img from '../../../../assets/icons/avatar.png'
import { api, img_url } from '../../../../config.js'

export default {
    props: ['snap', 'search'],
    components: {
        pageFooter: () => import('@/PageFooter'),
        autoTable: () => import('@/AutoTable'),
        preview: () => import('@/Preview'),
        SceneMap: () => import('../../components/SceneMap'),
    },
    data() {
        return {
            selects: [],
            isDrop: {},
            img: img,
            scenesLoading: false,
            img_url: img_url
        }
    },
    computed: {
        loading() {
            return this.$store.state.snap.loading
        },
        curPage() {
            return this.$route.query.page || 1
        }
    },
    methods: {
        defaultImg(e) {
            e.target.src = this.img
        },
        getDrop(active, idx) {
            this.$set(this.isDrop, idx, active[idx])
        },
        getScene(id) {
            this.scenesLoading = true 
            this.$store.dispatch('snap/pullDetail',{id}).done(res => {
                this.$refs.scene.open(res)
                this.scenesLoading = false
            })
        },
        pop(capId) {
            this.$confirm('确定删除该记录么？', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).done(() => {
                if (capId instanceof Array) {
                    // 暂无批量删除接口
                    let data = {
                        'token': this.$store.state.user.token,
                        'capId': capId.toString()
                    }
                    this.$http.post(api + '/cap/delete/caps', data).then((response) => {
                        if (response.data.code === 1000) {
                            this.$message.success('批量删除成功')
                            this.selects = []
                            this.search(0)
                        } else {
                            this.$message.error(response.data.subMsg)
                        }
                    })
                } else {
                    this.isDrop = {}
                    this.$store.dispatch('snap/popRecord', { capId })
                }
            })
        },
        checkAll() {
            const len = this.snap.list.length
            if (this.selects.length === this.snap.list.length)  {
                this.selects = []
            } else {
                for(let i = 0; i < len; i ++){
                    this.$set(this.selects,i,this.snap.list[i].id)
                }
            }
        },
        toFloat(val) {
            var re = /([0-9]+.[0-9]{2})[0-9]*/
            return val.toString().replace(re,"$1")
        }
    },
    watch: {
        snap() {
            this.isDrop = {}
        }
    }
}
</script>
<style lang="scss" module>
@import '~style/basic/param';

$royal-blue: #02295d;
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
.checkbox {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 1px solid $color-light-blue;
    &.active {
        background: url('assets/icons/checked.png') no-repeat center;
        background-size: 14px 10px;
    }
}

.tip {
    &:before {
        content: url('assets/icons/result.png');
        display: inline-block;
        width: 24px;
        height: 24px;
        vertical-align: middle;
        margin-right: 11px;
    }
    span {
        vertical-align: middle;
        font-size: 16px;
    }
    em {
        font-style: normal;
        color: #41baff;
    }
}

.table {
    &.noFooter > section {
        height: calc(100vh - 364px);
    }
    > section {
        height: calc(100vh - 417px);
        overflow-y: auto;
        > ul:hover {
            .checkbox {
                border-color: #fff;
            }
            .btnBlue {
                color: #fff;
            }
        }
    }
}

.footer {
    background: $color-dark-blue;
    padding: 12px;
    border-top: 1px #153f76 solid;
}

.pullDrop {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0 20px 120px;
    background: $royal-blue;
    border-top: 1px solid $color-light-blue;
    > div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;
        // & + div {
        //     margin-left: 94px;
        // }
        > em {
            margin-right: 10px;
            font-style: normal;
            font-size: 14px;
        }
        > figure {
            width: 60px;
            height: 60px;
            background: #ccc;
            > img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}
.btnBlue,.btnRed {
    cursor: pointer;
    user-select: none;
}
.btnBlue {
    color: $color-light-blue
}
.btnRed {
    color: $color-red;
}
.btn {
    font-style: normal;
    color: $color-light-blue;
    cursor: pointer;
    user-select: none;
}
.deviceId {
    padding: 0 20px;
}
.pag {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #00204F;
    border-top: 1px solid  #153F76;
    span {
        width: 28px;
        height: 28px;
        background: #fff;
        color: #187CE3;
        text-align: center;
        line-height: 28px;
        font-size: 13px;
        cursor: pointer;
    }
    span:nth-child(2) {
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        background: #187CE3;
        color: #fff;
    }
}
</style>
