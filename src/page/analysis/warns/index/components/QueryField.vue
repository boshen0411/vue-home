<template>
    <ul :class="$style.query_field">
        <li>时&emsp;&ensp;间
            <el-date-picker :class="$style.date"
                            v-model="start"
                            type="date"
                            placeholder="选择日期" />至
            <el-date-picker :class="$style.date"
                            v-model="end"
                            type="date"
                            placeholder="选择日期" />
        </li>
        <li>报警级别
            <el-cascader :class="$style.cascader"
                         :options="levels"
                         v-model="level" />
        </li>
        <li>
            <span class="ts-button" @click="$router.push('/analysis/warns/rule')">报警级别设定</span>
        </li>
        <li>
            <span class="ts-button">查看</span>
        </li>
    </ul>
</template>

<script>
export default {
  data () {
      return {
          start: '',
          end: '',
          level: null,
          levels: [
              {
                  label: "级别1",
                  value: '1'
              },
              {
                  label: '级别2',
                  value: '2'
              }
          ]
      }
  }
}
</script>


<style lang="scss" module>
@import '~style/basic/param';

.query_field {
    display: flex;
    height: 100px;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    font-size: 16px;
    background-color: $color-dark-blue;
    li {
        display: inline-flex;
        align-items: center;
    }
    .cascader,.date {
        margin: 0 1em;
        input {
            color: #fff;
            border: none;
            background-color: #03316d;
        }
    }
    .date {
        width: 118px;
        input {
            width: 118px;
        }
    }
    .cascader {
        input {
            width: 180px;
        }
        span {
            color: #fff;
        }
    }
}
</style>

