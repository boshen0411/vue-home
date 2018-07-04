<template>
    <div :class="$css.sync_update">
        <div :class="$css.auto_update">
            <div>
                <label :class="$css.label">自动同步更新设置</label>
                <div :class="$css.form">
                    <p>更新频率：
                        <input type="tel"
                               v-model.number="fqVal"
                               placeholder="请输入整数" />
                        <el-select v-model="fqUnit"
                                   size="mini"
                                   placeholder="请选择">
                            <el-option v-for="item in options"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </p>
                    <p :class="$css.time">
                        同步开始时间：
                        <el-date-picker :class="$css.date"
                                        v-model="time"
                                        type="date"
                                        placeholder="选择日期"
                                        :picker-options="picker" />
                    </p>
                </div>
            </div>
            <button class="ts-button"
                    @click="save">保存</button>
        </div>
        <div :class="$css.manual_update">
            <label :class="$css.label">手动同步</label>
            <button @click="push">立即同步</button>
        </div>
        <div :class="$css.update_record">
            <h3>同步记录</h3>
            <div :class="$css.record">
                <p>
                    <span>更新类型</span>
                    <span>更新数据量</span>
                    <span>开始时间</span>
                    <span>结束时间</span>
                </p>
                <ul class="ui-scrollbar"
                    :class="$css.record_list">
                    <li v-for="(item,idx) in list"
                        :key="idx">
                        <span>{{item.updateType==='1' ? '自动更新' : '手动更新'}}</span>
                        <span>{{item.count | split}}</span>
                        <span>{{item.startTime | format}}</span>
                        <span>{{item.endTime | format}}</span>
                    </li>
                </ul>
            </div>
            <page-footer :total="Math.ceil(total/10)"
                         :cur.sync="curPage"
                         @turnPage="getRecord"> </page-footer>
        </div>
    </div>
</template>
<script>
import PageFooter from '@/PageFooter';
import { fullFormat } from 'utils'
import { handleSync, syncRecord, autoSync } from 'api/sync'

export default {
    props: ['$css', 'current'],
    components: { PageFooter },
    data() {
        return {
            fqVal: null,
            fqUnit: null,
            time: null,
            picker: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            options: [
                {
                    label: '天',
                    value: 'DAY'
                },
                {
                    label: '周',
                    value: 'WEEK'
                },
                {
                    label: '月',
                    value: 'MONTH'
                }
            ],
            list: [],
            total: null,
            curPage: 1
        }
    },
    mounted() {
        this.getRecord()
    },
    methods: {
        save() {
            if (!this.current) {
                return this.$message.warning("请在左侧选择要进行同步的节点")
            }
            if (!this.fqVal) {
                return this.$message.warning("请填写更新频率数值")
            }
            if (!this.fqUnit) {
                return this.$message.warning("请选择更新频率单位")
            }
            if (!this.time) {
                return this.$message.warning("请填写更新开始日期")
            }
            this.fqVal = parseInt(this.fqVal)
            if (isNaN(this.fqVal) || this.fqVal<0) {
                this.fqVal = null;
                return this.$message.warning("更新频率数值请填写大于0整数")
            }

            let o = {
                tempId: this.current,
                rate: this.fqVal,
                unit: this.fqUnit,
                startTime: fullFormat(this.time,'T',23)
            }
            autoSync(o).then(() => {
                this.$message.success("提交成功")
            }).catch(e => {
                // console.log('err:',e)
            })
        },
        push() {
            if (!this.current) {
                return this.$message.warning("请在左侧选择要进行同步的节点")
            }
            handleSync({
                tempId: this.current
            }).then(res => {
                this.$notify.success({
                    title: '同步完成',
                    message: `同步数据量 ${res}`
                })
            }).catch(e => {
                this.$notify.error({
                    title: '同步失败',
                    message: '节点数据同步失败'
                })
            })
        },
        getRecord(p) {
            let args = {
                pageSize: 10,
                pageNum: p ? p - 1 : 0
            }
            syncRecord(args).then(res => {
                // console.log(res)
                this.total = res.total
                this.list = res.list
            }).catch(e => {
                console.log('err:', e)
            })
        }
    }
}
</script>
