<template>
  <div :class="$style.rules_wrap">
    <section>
      级别名称：
      <input type="text"
             placeholder="请输入"
             v-model="ruleName">
    </section>
    <section>
      &emsp;时间段：
      <el-date-picker :class="$style.picker"
                      v-model="timeRange"
                      type="datetimerange"
                      placeholder="选择时间范围">
      </el-date-picker>
    </section>
    <section :class="$style.form">
      <p v-for="(r,idx) in list"
         :key="idx">
        触发条件-参数：
        <span :class="$style.rule_name">{{r.label}}</span>
        <component :class="$style.com"
                   :is='r.component'
                   :label='r.label'
                   :value.sync='r.value'>
        </component>
      </p>
      <p v-show="list.length<4">
        触发条件-参数：
        <el-select v-model="rule"
                   placeholder="请选择">
          <el-option v-for="(item,idx) in rules"
                     :key="idx"
                     :value="item.label"
                     :label="item.label"
                     :disabled="item.disabled">
          </el-option>
        </el-select>
        <component :class="$style.com"
                   :is='getCom(rule)'
                   :label='rule'
                   :value.sync='ruleVal'>
        </component>
      </p>
      <p :class="$style.add"
         v-show="list.length<3"
         @click="addRule">
        <span></span>
      </p>
    </section>
    <div :class="$style.btns">
      <span class="ts-button info"
            @click="$emit('toggle','Rules')">取消</span>
      <span class="ts-button"
            @click="submit">保存</span>
    </div>
  </div>
</template>

<script>
import SelectCom from '@/ruleLibs/select'
import AreaPick from '@/ruleLibs/areas'
import InputVal from '@/ruleLibs/input'
import DevicePick from '@/ruleLibs/device'

export default {
  props: ['id'],
  components: {
    SelectCom,
    AreaPick,
    InputVal,
    DevicePick
  },
  data() {
    return {
      ruleName: null,
      list: [],
      timeRange: [],
      rule: null,
      ruleVal: null,
      rules: [
        { label: '设备' },
        { label: '嫌疑人' },
        { label: '记录次数' },
        { label: '记录周期' }
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
      let idx = ['记录周期', '嫌疑人', '记录次数', '设备'].indexOf(label);
      if (idx > -1) {
        return ['SelectCom', 'AreaPick', 'InputVal', 'DevicePick'][idx]
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
        component: this.getCom(this.rule),
        value: this.ruleVal
      }
      this.list.push(o)
      this.rules.some(r => {
        if (r.label == o.label) {
          r.disabled = true;
          return true;
        }
      })
      this.rule = null;
      this.ruleVal = null;
    },
    verify() {
      if (!this.ruleName) {
        this.$message.warning("请填写条件名称")
        return false;
      }
      let emp = (this.list.length && !this.list.some(r => !r.value)) || (this.rule && this.ruleVal);

      if (!emp) {
        this.$message.warning("请至少设置一个触发条件及参数")
        return false;
      }
      return true;
    },
    submit() {
      let vf = this.verify();
      if (vf) {
        // 提交规则表单
      }
    }
  }
}
</script>

<style lang="scss" module>
@import './EditRule.scss';
</style>


