<template>
    <ul :class="$css.query_field">
        <li>时&emsp;&ensp;间
            <el-date-picker
                :class="$css.date"
                v-model="startTime"
                type="date"
                :editable="false"
                placeholder="选择日期"
            />至
            <el-date-picker
                :class="$css.date"
                v-model="endTime"
                type="date"
                :editable="false"
                placeholder="选择日期"
            />
        </li>
        <!-- 暂时不需地区 -->
        <!-- <li>地区
            <el-cascader
                :class="$css.cascader"
                :options="area"
                v-model="district"
            />
        </li> -->
        <li>
            <label :class="$css.upload">
                <input type="file">
            </label>
        </li>
        <li>
            <button @click="query">搜索</button>
        </li>
    </ul>
</template>
<script>
import { fullFormat } from 'utils'

export default {
    props: [ '$css' ],
    data(){
        return {
            startTime: null,
            endTime: null,
            district: null,
            area: [
                {
                    value: 'guangdong',
                    label: '广东',
                    children: [{
                        value: 'guangzhou',
                        label: '广州',
                        children: [{
                        value: 'tianhe',
                        label: '天河区'
                        }, {
                        value: 'conghua',
                        label: '从化区'
                        }, {
                        value: 'yuexiu',
                        label: '越秀区'
                        }, {
                        value: 'nansha',
                        label: '南沙区'
                        }]
                    }, {
                        value: 'shenzhen',
                        label: '深圳',
                        children: [{
                        value: 'nanshan',
                        label: '南山区'
                        }, {
                        value: 'futian',
                        label: '福田区'
                        }]
                    }]
                }
            ]
        }
    },
    methods: {
        query(){
            const args = {}
            if (this.startTime) args.startTime = fullFormat(this.startTime, 10)
            if (this.endTime) args.endTime = fullFormat(this.endTime, 10)
            this.$store.dispatch('warns/getList', args)
            this.$emit('search')
        }
    }
}
</script>
