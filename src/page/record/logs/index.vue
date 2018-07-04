<template>
    <div>
        <div :class="$style.qury_field">
            <ul>
                <li>
                    <p :class="$style.field">
                        <span>姓&emsp;&emsp;名</span>
                        <input type="text"
                               v-model="form.name"
                               placeholder="请输入姓名">
                    </p>
                    <p :class="$style.field">
                        <span>身份证号</span>
                        <input type="text"
                               maxlength="18"
                               v-model="form.idCard"
                               placeholder="请输入身份证号">
                    </p>
                </li>
                <!-- <li>
                    <p :class="$style.date">
                        <span>时&emsp;&emsp;间</span>
                        <el-date-picker :class="$style.picker"
                                        type="date"
                                        v-model="form.start"
                                        :editable="false"
                                        placeholder="选择日期" />&emsp;至&emsp;
                        <el-date-picker :class="$style.picker"
                                        type="date"
                                        v-model="form.end"
                                        :editable="false"
                                        placeholder="选择日期" />
                    </p>
                    <p :class="$style.field">
                        <span>设备地区</span>
                        <el-cascader :class="$style.cascader"
                                     :options="areas"
                                     v-model="form.district" />
                    </p>
                </li>
                <li>
                    <p :class="[$style.field,$style.select]">
                        <span>数据类型</span>
                        <el-select v-model="form.dateType"
                                   placeholder="请选择">
                            <el-option v-for="item in dateTypes"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p :class="$style.upload">
                        <span>人脸照片</span>
                        <label @click="$refs.uploader.click()"></label>
                        <i v-if="form.imgs.length">
                            <img :src="form.imgs[0].blob">
                        </i>
                    </p>
                </li> -->
                <li style="margin-left: 40px">
                    <button @click="query(0)">搜索</button>
                    <button @click="reset">重置</button>
                </li>
            </ul>
        </div>
        <query-result
                      :snap="snap"  ref="res" :search="query"/>
        <Uploader :maxNum="1" @cb="form.imgs = $event" ref="uploader"/>
    </div>
</template>
<script>
import QueryResult from './components/QueryResult';
import { fullFormat, regExp } from 'utils';

export default {
    components: {
        QueryResult,
        Uploader: () => import('@/ImgUploader')
    },
    data() {
        return {
            form: {
                name: null,
                district: [],
                idCard: null,
                start: null,
                end: null,
                dateType: null,
                imgs: []
            },
            dateTypes: [
                { name: '动态人脸分析服务', id: 1 },
                { name: '车载抓拍', id: 2 },
                { name: '手持一体机设备', id: 3 },
                { name: '其他', id: 4 }
            ]
        }
    },
    computed: {
        snap() {
            return {
                list: this.$store.getters.snapList || [],
                total: this.$store.getters.snapTotal || 0
            }
        },
        areas() {
            return this.$store.getters.areas
        },
    },
    methods: {
        query(pg) {
            this.$refs.res.isDrop = {}
            const form = {
                pageSize: 8,
                pageNum: pg,
                // 暂时不传数据类型
                // dataType: this.form.curLog
            }
            const { name, idCard, start, end } = this.form
            if (name) form.name = name
            if (idCard) {
                const flag = regExp(idCard, 'id')
                if (!flag) {
                    return this.$message.warning('身份证错误，请输入正确的身份证')
                }
                form.idCard = idCard
            }
            if (start) {
                form.startTime = fullFormat(start,'T')
            }
            if (end) {
                form.endTime = fullFormat(end,'T')
            }
            // 清空查询参数
            if (!pg) this.$router.replace({query:{}})
            this.$store.dispatch('snap/pullList', form).done(res => {
                if (!res.total) this.$message.warning('暂无数据')
            })
        },
        reset() {
            for(let attr in this.form) {
                let val;
                if (attr === 'district') {
                    val = []
                } else if (attr === 'imgs') {
                    val = []
                }
                this.form[attr] = val || null;
            }
            this.$router.replace({query:{}})
            this.$store.dispatch('snap/resetList')
        }
    },
    mounted() {
        this.query(0)
    }
}
</script>
<style lang="scss" module>
@import './index';
</style>
