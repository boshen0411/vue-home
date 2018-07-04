<template>
    <dialog-modal @hide="$emit('close')" width="530px" height="360px">
        <template scope="props">
            <div :class="$style.edit">
                <ul>
                    <li v-if="info.id">
                        <label>序列号：</label>
                        <span>{{info.id}}</span>
                    </li>
                    <li :class="[hasEmpty && !info.name && $style.warn]">
                        <label>服务名：</label>
                        <input type="text"
                               placeholder="请输入"
                               v-model="info.name">
                    </li>
                    <li :class="[hasEmpty && !info.serviceIp && $style.warn]">
                        <label>I P：</label>
                        <input type="text"
                               placeholder="请输入"
                               v-model="info.serviceIp">
                    </li>
                    <li :class="[hasEmpty && !info.port && $style.warn]">
                        <label>PORT：</label>
                        <input type="text"
                               placeholder="请输入"
                               v-model="info.port">
                    </li>
                </ul>
                <p>
                    <button @click="props.close">取消</button>
                    <button @click="submit(props.close)">确定</button>
                    <button @click="pop(props.close)">删除</button>
                </p>
            </div>
        </template>
    </dialog-modal>
</template>
<script>
import DialogModal from '@/DialogModal';

export default {
    components: { DialogModal },
    props: ['info'],
    data () {
        return {
            hasEmpty: false      
        }
    },
    methods: {
        submit(cb) {
            if (!this.info.name || !this.info.serviceIp || !this.info.port || !this.info.id) {
                this.$message.warning("请填写完整信息")
                this.hasEmpty = true
                return;
            }
            // if (this.info.id) {
                // 编辑
                // TODO: 暂无编辑接口
            // } else {
                // 新建
                const o = {
                    id: this.info.id,
                    name: this.info.name,
                    ip: this.info.serviceIp,
                    port: this.info.port
                }
                this.$store.dispatch('device/createSer', o).done(() => {
                    this.$message.success("修改服务成功")
                    cb();
                })
            // }
        },
        pop(cb){
            this.$confirm('确定删除该服务？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('device/deleteServer', {
                    serverId: this.info.id
                })
                cb()
            }).catch(() => {})
        }
    }
}
</script>
<style lang="scss" module>
@import '~style/basic/param';

.edit {
    padding: 33px 85px;
    color: #333;
    .warn {
        input {
            border: 1px solid #ff4949;
        }
    }
    li {
        margin-bottom: 10px;
        white-space: nowrap;
        font-size: 0;
    }
    label,
    span,
    input {
        display: inline-block;
        vertical-align: middle;
    }
    label {
        width: 4em;
        text-align: right;
        font-size: 14px;
    }
    span {
        width: 258px;
        height: 40px;
        line-height: 40px;
        margin-left: 10px;
        padding: 0 10px;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    input {
        width: 258px;
        height: 40px;
        margin-left: 10px;
        padding: 0 10px;
        font-size: 14px;
        background-color: #ebf5ff;
    }
    p {
        display: flex;
        justify-content: space-around;
        margin-top: 50px;
        text-align: center;
    }
    button {
        width: 80px;
        height: 40px;
        font-size: 16px;
        border-radius: 4px;
        border: solid 1px $color-light-blue;
        cursor: pointer;
        &:hover {
            opacity: .8;
        }
        &:first-child {
            color: $color-light-blue;
            background: transparent;
            border: 1px $color-light-blue solid;
        }
        &:nth-child(2) {
            color: #fff;
            background-color: $color-light-blue;
        }
        &:nth-child(3) {
            color: $color-red;
            background: transparent;
            border: 1px $color-red solid;
        }
    }
}
</style>
