<template>
    <dialog-modal @hide="$emit('close')" width="400px" height="230px">
        <template scope="props">
            <div :class="$style.ignore">
                <h3>忽略预警</h3>
                <div :class="$style.field">忽略：
                    <textarea placeholder="请输入内容" v-model="remark"/>
                </div>
                <p :class="$style.button">
                    <button @click="props.close">取消</button>
                    <button @click="submit">确定</button>
                </p>
            </div>
        </template>
    </dialog-modal>
</template>
<script>
    import DialogModal from '@/DialogModal';

    export default {
        components: { DialogModal },
        data() {
            return {
                remark: null
            }
        },
        methods: {
            submit() {
                this.$emit('submit',this.remark)
            }
        }
    }
</script>
<style lang="scss" module>
    .ignore {
        padding: 20px 24px;
        color: #333;
        h3 {
            text-align: center;
            font-size: 18px;
        }
    }
    .field {
        margin: 18px 0;
        font-size: 14px;
        textarea {
            width: 300px;
            height: 80px;
            padding: 10px;
            vertical-align: top;
            font-size: 14px;
            resize: none;
            border: none;
            outline: none;
            background-color: #ebf6ff;
        }
    }
    .button {
        text-align: center;
        button {
            width: 80px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
            &:hover {
                opacity: .8;
            }
            &:first-child {
                color: #187ce3;
                background: transparent;
                border: 1px #187ce3 solid;
            }
            &:last-child {
                margin-left: 120px;
                color: #fff;
                background: #187ce3;
            }
        }
    }
</style>

