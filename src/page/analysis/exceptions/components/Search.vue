<template>
    <div>
        <!-- 搜索区域 -->
        <div :class="$style.form_field">
            <ul>
                <li>
                    <p :class="$style.field">
                        <span>姓&emsp;&emsp;名</span>
                        <input type="text"
                               v-model="name"
                               placeholder="请输入姓名">
                    </p>
                    <p :class="$style.field">
                        <span>设备地区</span>
                        <el-cascader :class="$style.cascader"
                                     :options="areas"
                                     v-model="district" />
                    </p>
                </li>
                <li>
                    <p :class="$style.date">
                        <span>时&emsp;间</span>
                        <el-date-picker :class="$style.picker"
                                        type="date"
                                        v-model="start"
                                        :editable="false"
                                        placeholder="选择日期" />&emsp;至&emsp;
                        <el-date-picker :class="$style.picker"
                                        type="date"
                                        v-model="end"
                                        :editable="false"
                                        placeholder="选择日期" />
                    </p>
                    <p :class="[$style.field,$style.select]">
                        <span>设&emsp;备</span>
                        <el-select v-model="device"
                                   multiple
                                   placeholder="请选择设备">
                            <el-option v-for="item in devices"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                </li>
                <li>
                    <label :class="$style.upload">
                        <input type="file"
                               accept="image/png, image/jpeg, image/gif"
                               @change="uploadImg">
                    </label>
                    <!-- <img :class="$style.avatar" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"> -->
                </li>
                <li>
                    <button @click="search">搜索</button>
                    <button @click="reset">重置</button>
                </li>
            </ul>
        </div>
        <!-- 搜索列表 -->
        <div :class="$style.handle2">
            <p :class="$style.btns">
                <template v-if="total">
                    <button @click="selectAll">全选</button>
                    <button @click="multPrompt"
                            :class="[ids.length && $style.can]">忽略</button>
                </template>
            </p>
            <p :class="$style.rules">
                <span>分析规则：</span>
                <el-select v-model="rule">
                    <el-option v-for="item in rules"
                               :key="item.id"
                               :label="item.name"
                               :value="item.id">
                    </el-option>
                </el-select>
                <button type="mini"
                        @click="$emit('toggle','Rules')">分析规则</button>
            </p>
        </div>
        <auto-table :class="[$style.result2,Math.ceil(total/8) == 1 && $style.noFooter]"
                    :data="list">
            <span label=""
                  width="46">
                <template scope="idx">
                    <label :class="$style.checkbox">
                        <input type="checkbox"
                               v-model="ids"
                               :value="list[idx].id" />
                        <i></i>
                    </label>
                </template>
            </span>
            <span prop="tempId"
                  label="人口类型"
                  width="80"></span>
            <span prop="recordId"
                  label="档案ID"
                  width="170"></span>
            <span prop="similarity"
                  label="相似度"
                  width="86"></span>
            <span label="档案照片"
                  width="94">
                <template scope="idx">
                    <figure :class="$style.img">
                        <img :src="list[idx].recordPicture | cdn">
                    </figure>
                </template>
            </span>
            <span label="预警照片"
                  width="104">
                <template scope="idx">
                    <figure :class="$style.img">
                        <img :src="list[idx].warningPicture | cdn">
                    </figure>
                </template>
            </span>
            <span prop="deviceName"
                  label="设备名称"
                  width="124"></span>
            <span prop="deviceId"
                  label="设备ID"
                  width="144"></span>
            <span prop="warningTime"
                  label="事件时间"
                  width="204"></span>
            <span label="操作"
                  width="94">
                <template scope="idx">
                    <span :class="[$style.operate,$style.ignore]"
                          @click="ignore(list[idx].id)"></span>
                    <span :class="[$style.operate,$style.locus]"
                          @click="addPeople(list[idx])"></span>
                </template>
            </span>
        </auto-table>
        <page-footer :class="$style.footer"
                     :total="Math.ceil(total/8)"
                     :cur.sync="curPage"
                     @turnPage="turnPage">
        </page-footer>
        <ignore-dialog v-if="show"
                       @submit="doIgnore"
                       @close="show = false" />
    </div>
</template>

<script>
import IgnoreDialog from '@/IgnoreDialog';
export default {
    components: {
        pageFooter: () => import('@/PageFooter'),
        autoTable: () => import('@/AutoTable'),
        IgnoreDialog
    },
    data() {
        return {
            name: "",
            start: null,
            end: null,
            district: null,
            device: [],
            show: false,
            id: null,
            devices: [
                { name: '设备1', id: 1 },
                { name: '设备2', id: 2 },
                { name: '设备3', id: 3 },
                { name: '设备4', id: 4 },
                { name: '设备5', id: 5 }
            ],
            searchCondition: {},
            // 列表数据
            curPage: 1,
            ids: [],
            rule: null,
            rules: [
                { name: '规则1', id: 1 },
                { name: '规则2', id: 2 },
                { name: '规则3', id: 3 },
                { name: '规则4', id: 4 }
            ]
        }
    },
    computed: {
        areas() {
            return this.$store.getters.areas
        },
        list() {
            return this.$store.getters.warningList
        },
        total() {
            return this.$store.getters.warningTotal
        }
    },
    methods: {
        uploadImg(e) {
            // TODO:根据图片搜索未进行
        },
        search() {
            let o = {
                pageSize: 8,
                pageNum: 0,
                state: 'Y'
            };
            if (this.start instanceof Date) {
                o.startTime = this.start.toDate()
            }
            if (this.end instanceof Date) {
                o.endTime = this.end.toDate()
            }
            if (this.name) { o.name = this.name }
            // if (this.device.length) {o.device = this.device}
            // if (this.district) { o.deviceZone = this.district }
            this.searchCondition = o
            this.$router.push(this.$route.path)
            this.$store.dispatch('warning/getList', o)
        },
        reset() {
            this.name = "";
            this.start = null;
            this.end = null;
            this.district = null;
            this.device = [];
            this.$store.dispatch('warning/resetList')
        },
        turnPage(n) {
            let o = this.searchCondition
            o.pageNum = n - 1
            this.$store.dispatch('warning/getList', o)
        },
        ignore(id) {
            this.id = id;
            this.show = true;
        },
        doIgnore(rm) {
            let arg = {
                id: this.id,
                remark: rm
            }
            this.$store.dispatch('warning/promptItem', arg).done(() => {
                this.show = false;
            })
        },
        // 列表操作
        addPeople(o) {
            let ob = { id: o.id, name: o.name || '临时人口' }
            this.$store.dispatch('locus/addPeople', ob)
        },
        selectAll() {
            let ids = this.list.map(li => li.id)
            this.ids = ids;
        },
        multPrompt() {
            if (!this.ids.length) {
                return this.$message.warning("请至少选择一项进行操作")
            }
            this.$confirm('将批量忽略所选中的记录，是否继续？', '批量忽略提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).done(() => {
                this.$store.dispatch('warning/promptMulti', this.ids)
            })
        }
    }
}
</script>

<style lang="scss" module>
@import './Search.scss';
</style>


