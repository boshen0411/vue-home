<template>
    <div :class="$css.amount_block">
        <div :class="$css.date_picker">
            选择日期：
            <el-date-picker
                :class="$css.picker"
                type="date"
                v-model="date"
                :editable="false"
                placeholder="选择日期"
            />
        </div>
        <ul :class="$css.amount">
            <li :class="curType === 'device' && $css.active" @click="getData('device')">
                <div :class="$css.desc">
                    <label>设备数量</label>
                    <big>{{ total.deviceAmount | split }}</big>
                    <!-- <p>
                        <em :class="$css.green">1%</em>
                        同比上周
                    </p> -->
                </div>
            </li>
            <li :class="curType === 'scale' && $css.active" @click="getData('scale')">
                <div :class="$css.desc">
                    <label>人口库规模</label>
                    <big>{{ total.populationAmount | split }}</big>
                    <!-- <p>
                        <em :class="$css.green">1%</em>
                        同比上周
                    </p> -->
                </div>
            </li>
            <li :class="curType === 'people' && $css.active" @click="getData('people')">
                <div :class="$css.desc">
                    <label>布控人口</label>
                    <big>{{ total.surveilPopulation | split }}</big>
                    <!-- <p>
                        <em :class="$css.green">1%</em>
                        同比上周
                    </p> -->
                </div>
            </li>
            <li :class="curType === 'warn' && $css.active" @click="getData('warn')">
                <div :class="$css.desc">
                    <label>预警数量</label>
                    <big>{{ total.waringAmount | split }}</big>
                    <!-- <p>
                        <em :class="$css.red">1%</em>
                        同比上周
                    </p> -->
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: {
            $css: {},
            total: {},
            curType: {
                type: String,
                default: null
            }
        },
        data(){
            return {
                date: null
            }
        },
        methods: {
            getData(type) {
                if (this.curType === type) {
                    type = null
                }
                this.$emit('update:curType', type)
                this.$emit('getList',type)
            }
        }
    }
</script>

