<template>
    <el-select v-model="val"
               @change="renew"
               placeholder="请选择">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
export default {
    props: ['label', 'value'],
    mounted() {
        this.val = this.value;
    },
    watch: {
      label() {
          this.val = null;
      }  
    },
    computed: {
        options() {
            let op;
            switch (this.label) {
                case '性别':
                    op = this.gender;
                    break;
                case '民族':
                    op = this.nation;
                    break;
                case '种族':
                    op = this.ethnicity;
                    break;
                case '记录周期':
                    op = this.circle;
                default:
                    break;
            }
            return op;
        }
    },
    data() {
        return {
            val: null,
            gender: [
                { label: '男', value: 'M' },
                { label: '女', value: 'F' }
            ],
            nation: [
                { label: '汉族', value: '汉族' },
                { label: '藏族', value: '藏族' },
                { label: '其他', value: '其他' },
            ],
            ethnicity: [
                { label: '黄种人', value: '黄种人' },
                { label: '白种人', value: '白种人' },
                { label: '其他', value: '其他' }
            ],
            circle: [
                { label: '每天', value: '每天' },
                { label: '每周', value: '每周' },
                { label: '每月', value: '每月' },
                { label: '每半年', value: '每半年' },
                { label: '每年', value: '每年' }
            ]
        }
    },
    methods: {
        renew(val) {
            this.$emit('update:value', val)
        }
    }
}
</script>

