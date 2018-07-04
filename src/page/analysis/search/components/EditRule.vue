<template>
  <div :class="$style.rules_wrap">
    <section>
      条件名称：
      <input type="text"
             placeholder="请输入">
    </section>
    <section>
      条件类型：
      <el-select v-model="type"
                 placeholder="任意元素/所有元素">
        <el-option v-for="item in types"
                   :key="item.value"
                   :value="item.label"></el-option>
      </el-select>
    </section>
    <section :class="$style.form">
      <p v-for="(r,idx) in list"
         :key="idx">
        触发条件-参数：
        <span :class="$style.rule_name">{{r.label}}</span>
        <!-- <el-select v-model="r.label"
                   @change="r.val=null"
                   placeholder="请选择">
          <el-option-group v-for="group in rules"
                           :key="group.label"
                           :label="group.label">
            <el-option v-for="item in group.options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.label">
            </el-option>
          </el-option-group>
        </el-select> -->
        <component :class="$style.com"
                   :is='r.component'
                   :label='r.label'
                   :value.sync='r.val'>
        </component>
      </p>
      <p>
        触发条件-参数：
        <el-select v-model="rule"
                   placeholder="请选择">
          <el-option-group v-for="group in rules"
                           :key="group.label"
                           :label="group.label">
            <el-option v-for="item in group.options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.label">
            </el-option>
          </el-option-group>
        </el-select>
        <component :class="$style.com"
                   :is='getCom(rule)'
                   :label='rule'
                   :value.sync='ruleVal'>
        </component>
      </p>
      <p :class="$style.add"
         @click="addRule">
        <span></span>
      </p>
    </section>
    <div :class="$style.btns">
      <span class="ts-button info"
            @click="$emit('toggle')">取消</span>
      <span class="ts-button">保存</span>
    </div>
  </div>
</template>

<script>
import SelectCom from '@/ruleLibs/select'
import TimePick from '@/ruleLibs/time'
import AreaPick from '@/ruleLibs/areas'
import FilePick from '@/ruleLibs/upload'
import InputVal from '@/ruleLibs/input'
import DevicePick from '@/ruleLibs/device'

export default {
  props: ['id'],
  components: {
    SelectCom,
    TimePick,
    AreaPick,
    FilePick,
    InputVal,
    DevicePick
  },
  data() {
    return {
      list: [],
      type: null,
      types: [
        { label: '任意元素' },
        { label: '所有元素' }
      ],
      rule: null,
      ruleVal: null,
      rules: [
        {
          label: '身份信息',
          options: [
            { label: '住址' },
            { label: '性别' },
            { label: '民族' },
            { label: '种族' },
            { label: '出生日期' }
          ]
        },
        {
          label: '影像',
          options: [
            { label: '图片' },
            { label: '视频' }
          ]
        },
        {
          label: '时间周期',
          options: [
            { label: '一周' },
            { label: '一个月' },
            { label: '三个月' },
            { label: '半年' },
            { label: '一年' }
          ]
        },
        {
          label: '基本条件',
          options: [
            { label: '设备' },
            { label: '嫌疑人' },
            { label: '记录次数' },
            { label: '记录周期' }
          ]
        }
      ]
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.id) {
        // console.log('正在编辑规则条目:', this.id)
      }
    },
    getCom(label) {
      // TODO:住址无数据
      if (['性别', '民族', '种族', '记录周期'].indexOf(label) > -1) {
        return 'SelectCom';
      }
      if (['出生日期'].indexOf(label) > -1) {
        return 'TimePick';
      }
      if (['图片', '视频'].indexOf(label) > -1) {
        return 'FilePick';
      }
      if (label == '嫌疑人') {
        return 'AreaPick';
      }
      if (label == '记录次数') {
        return 'InputVal';
      }
      if (label == '设备') {
        return 'DevicePick';
      }
    },
    addRule() {
      if (!this.rule) {
        return this.$message.warning('请至少选一个条件')
      }
      let vf = this.list.some(r => r.label == this.rule)
      if (vf) {
        return this.$message.warning('已存在相同条件')
      }
      let o = {
        label: this.rule,
        val: this.ruleVal
      }
      this.list.push(o)
      this.rule = null;
      this.ruleVal = null;
    }
  }
}
</script>

<style lang="scss" module>
@import './EditRule.scss';
</style>


