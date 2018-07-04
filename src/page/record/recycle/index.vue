<template>
    <section :class="$style.logCenter">
        <dl>
            <dt>
                <span>记录回收站</span>
            </dt>
            <dd v-for="(log,idx) in logTypes" :key="idx"
                @click="setCurLogType(log.key)"
                :class="form.curLog === log.key && $style.active"
            >{{ log.logName }}</dd>
        </dl>
        <div>
            <div :class="$style.query_fild">
                <ul>
                    <li>
                        <p :class="$style.field">
                            <span>姓&emsp;&emsp;名</span>
                            <input type="text" v-model.trim="form.name" placeholder="请输入姓名">
                        </p>
                        <!-- <p :class="$style.field">
                            <span>身份证号</span>
                            <input type="text" maxlength="18" v-model="form.idCard" placeholder="请输入身份证号">
                        </p> -->
                    </li>
                    <li>
                        <p :class="$style.field">
                            <span>身份证号</span>
                            <input type="text" maxlength="18" v-model="form.idCard" placeholder="请输入身份证号">
                        </p>
                    </li>
                    <!-- <li>
                        <p :class="$style.date">
                            <span>时&emsp;&emsp;间</span>
                            <el-date-picker :class="$style.picker" type="date" v-model="form.start" :editable="false" placeholder="选择日期" />&emsp;至&emsp;
                            <el-date-picker :class="$style.picker" type="date" v-model="form.end" :editable="false" placeholder="选择日期" />
                        </p>
                        <p :class="$style.field">
                            <span>设备地区</span>
                            <el-cascader :class="$style.cascader" :options="areas" v-model="form.district" />
                        </p>
                    </li> -->
                    <!-- <div :class="$style.recycle_state" @click="changeCheck">
                        <label :class="$style.label_check">
                            <span class="el-icon-check" v-if="check === 'Y'"></span>
                        </label>
                        <label>
                            &emsp;状态
                        </label>    
                    </div>  --> 
                    <!-- <li :class="$style.upload">
                        <p @click="$refs.uploader.click()">
                            <img  v-if="form.imgs.length" :src="form.imgs[0].blob">
                        </p>
                    </li> -->
                    <li>
                        <p>
                            <button @click="query(0)">搜索</button>
                            <button @click="reset">重置</button>
                        </p>
                    </li>
                </ul>
            </div>
            <query-result v-if="snap.total"
                        :snap="snap" :search="query"/>
            <Uploader :maxNum="1" @cb="form.imgs = $event" ref="uploader"/>
        </div>
    </section>
</template>

<script>
export default {
    components: {
        QueryResult: () => import('./components/QueryResult'),
        Uploader: () => import('@/ImgUploader')
    },
    data() {
        return {
            logTypes: [
                {
                    logName: '动态抓拍',
                    key: '01'
                },
                {
                    logName: '身份认证',
                    key: '02'
                },
                {
                    logName: '手持一体机',
                    key: '03'
                },
                {
                    logName: '车载',
                    key: '04'
                }
            ],
            form: {
                name: null,
                district: [],
                idCard: null,
                start: null,
                end: null,
                dateType: null,
                imgs: [],
                curLog: ''
            },
            check: 'N'
        }
    },
    computed: {
        snap() {
            return {
                list: this.$store.state.recordR.list || [],
                total: this.$store.state.recordR.total || 0
            }
        },
        areas() {
            return this.$store.getters.areas
        },
    },
    mounted() {
        this.form.curLog = this.$store.state.recordR.curLogType || this.logTypes[0].key
    },
    methods: {
        query(pg) {
            const form = {
                pageSize : 8,
                pageNum: pg,
                state: this.check,
                // 暂时不传数据类型
                // dataType: this.form.curLog
            };
            // 表单校验
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
            this.$store.dispatch('recordR/pullList', form).done(res => {
                setTimeout(() => {
                    if (!res.total) this.$message.warning('暂无数据')
                }, 600)
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
                if (attr !== 'curLog') {
                    this.form[attr] = val || null;
                }
            }
            this.check = 'N'
            this.$router.replace({query:{}})
            this.$store.dispatch('recordR/resetList')
        },
        setCurLogType(key) {
            this.form.curLog = key
            this.reset()
        },
        changeCheck() {
            if (this.check === 'N') {
                this.check = 'Y'
            } else {
                this.check = 'N'
            }
        }
    }
}
</script>

<style lang="scss" module>
@import './index';
.recycle_state {
    font-size: 14px;
    display: flex;
    align-items: center;
}
.label_check {
    display: inline-block;
    width: 18px;
    height: 20px;
    font-size: 12px;
    border: 1px solid #015dbc;
    color: #fff;
}
</style>
