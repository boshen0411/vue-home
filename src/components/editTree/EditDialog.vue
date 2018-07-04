<template>
    <dialog-modal @hide="$emit('close')" width="400px" height="200px">
        <template scope="props">
            <div class="content">
                <p>
                    节点名称：
                    <input type="text"
                           class="name"
                           placeholder="请输入新模块名称"
                           v-model="node.name">
                </p>
                <ul>
                    <li>
                        预警设置：
                        <el-switch v-model="node.state"
                                   :width="46"
                                   on-text="开"
                                   on-value="Y"
                                   off-text="关"
                                   off-value="N"
                                   :disabled="node.name==='临时人口'">
                        </el-switch>
                    </li>
                    <li>
                        预警值：
                        <input type="text"
                               placeholder="请输入预警值"
                               class="state"
                               v-model="node.warningValue">
                    </li>
                </ul>
                <p class="btns">
                    <span class="ts-button"
                          @click="submit">保存</span>
                    <span class="ts-button info"
                          @click="props.close">取消</span>
                    <span class="ts-button info del"
                          v-if="['常住人口','临时人口'].indexOf(form.name)<0"
                          @click="removeNode">删除</span>
                </p>
            </div>
        </template>
    </dialog-modal>
</template>

<script>
import DialogModal from '@/DialogModal';

export default {
    components: { DialogModal },
    props: {
        form: Object
    },
    data () {
        return {
            node: {
                name: this.form.name,
                state: this.form.name === '临时人口' ? 'Y' : this.form.state,
                warningValue: this.form.warningValue
            }
        }
    },
    methods: {
        submit() {
            this.$emit('submit',this.node)
        },
        removeNode() {
            this.$emit('delete')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~style/basic/param';

.content {
    width: 400px;
    padding: 20px 30px;
    font-size: 0;
    background-color: #fff;
    p,
    ul {
        height: 40px;
        line-height: 40px;
        margin-bottom: 20px;
        color: #333;
        font-size: 14px;
        white-space: nowrap;
    }
    ul {
        display: flex;
        justify-content: space-between;
    }
    input {
        height: 40px;
        padding: 0 8px;
        background-color: #ebf6ff;
        &.name {
            width: 269px;
        }
        &.state {
            width: 113px;
        }
    }
    .btns {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 0;
        line-height: 1;
        span {
            padding: 8px 24px;
        }
        .del {
            border-color: $color-red;
            color: $color-red;
        }
    }
}
</style>

