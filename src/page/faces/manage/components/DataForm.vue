<template>
    <div class="data-form">
        <section class="data">
            <!-- 库 -->
            <h3>
                <span>数据库结构</span>
            </h3>
            <ul>
                <li>
                    <p :class="{warn: hasEmpty && !table.ip}">
                        <span>I&nbsp;&nbsp;P：</span>
                        <input placeholder="请输入"
                               type="text"
                               v-model="table.ip">
                    </p>
                    <p :class="{warn: hasEmpty && !table.port}">
                        <span>PORT：</span>
                        <input placeholder="请输入"
                               type="text"
                               v-model="table.port">
                    </p>
                </li>
                <li>
                    <p :class="{warn: hasEmpty && !table.username}">
                        <span>USER：</span>
                        <input placeholder="请输入"
                               type="text"
                               v-model="table.username">
                    </p>

                    <p :class="{warn: hasEmpty && !table.password}">
                        <span>PWD：</span>
                        <input placeholder="请输入"
                               type="text"
                               v-model="table.password">
                    </p>
                </li>
                <li>
                    <p :class="{warn: hasEmpty && !table.said}">
                        <span>SAID：</span>
                        <input placeholder="请输入"
                               type="text"
                               v-model="table.said">
                    </p>
                </li>
            </ul>
            <!-- 表 -->
            <h3>
                <span>表结构</span>
            </h3>
            <ul>
                <li>
                    <p :class="{warn: hasEmpty && !table.tableName}">
                        <span>TABLE：</span>
                        <input placeholder="请输入"
                               type="text"
                               v-model="table.tableName">
                    </p>
                </li>
                <li>
                    <p :class="{warn: hasEmpty && !table.idCard}">
                        <span>身份证号：</span>
                        <input placeholder="请输入字段名"
                               type="text"
                               v-model="table.idCard">
                    </p>
                    <p :class="{warn: hasEmpty && !table.facePicture}">
                        <span>人脸照片：</span>
                        <input placeholder="请输入字段名"
                               type="text"
                               v-model="table.facePicture">
                    </p>
                </li>
            </ul>
        </section>
        <section class="btns">
            <span class="default"
                  @click="submit">连接</span>
            <span class="primary"
                  @click="save">保存</span>
            <span class="default"
                  @click="reset">重置</span>
        </section>
    </div>
</template>

<script>
import { getToken } from 'auth'
import { saveDocument } from 'api/sync'

export default {
    props: {
        current: String,
        table: {
            type: Object,
            default: {
                ip: null,
                port: null,
                username: null,
                password: null,
                said: null,
                tableName: null,
                idCard: null,
                facePicture: null
            }
        }
    },
    data() {
        return {
            hasEmpty: false
        }
    },
    methods: {
        verify() {
            this.hasEmpty = ['ip', 'port', 'username', 'password', 'said', 'tableName', 'idCard', 'facePicture'].some(k => !this.table[k])
        },
        submit() {
            this.verify();
            if (this.hasEmpty) {
                this.$message.warning("请填写完整信息")
                return;
            }
            /* 发起websocket连接 */
            let argTxt = ''
                + this.current + '/'
                + this.table.ip + '/'
                + this.table.port + '/'
                + this.table.username + '/'
                + this.table.password + '/'
                + this.table.said + '/'
                + this.table.tableName + '/'
                + this.table.idCard + '/'
                + this.table.facePicture;

            /* API: /facecloud/synpopulation/{token}/{tempId}/{ip}/{port}/{user}/{pwd}/{said}/{table}/{idCard}/{facePicture} */

            const ws = new WebSocket(`${this.$wshost}/synpopulation/${getToken()}/${argTxt}`)
            ws.onopen = () => {
                // ws.send('')
                this.$message.success("连接成功")
            }
            ws.onmessage = e => {
                if (e.data == '当前模板已经在同步中') {
                    ws.close()
                }
            }
            ws.onclose = () => {
                this.$emit('close')
            }
            setTimeout(() => {
                ws.close()
            }, 1000)
        },
        reset() {
            for (let attr in this.table) {
                this.table[attr] = null
            }
        },
        save() {
            // 保存表单
            this.verify();
            if (this.hasEmpty) {
                this.$message.warning("请填写完整信息")
                return;
            }
            saveDocument({
                ip: this.table.ip,
                id: this.current,
                port: this.table.port,
                user: this.table.username,
                pwd: this.table.password,
                said: this.table.said,
                table: this.table.tableName,
                idCard: this.table.idCard,
                facePicName: this.table.facePicture
            }).done(res => {
                this.hasEmpty = false;
                this.$message.success("提交成功！")
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~style/basic/param';
.data-form {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 218px);
    justify-content: space-between;
}

h3 {
    margin-bottom: 25px;
    font-size: 16px;
    span {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
    }
    &:after {
        content: "";
        display: inline-block;
        vertical-align: middle;
        height: 1px;
        background: url('~assets/line.png') repeat-x center left;
    }
    &:nth-of-type(1) {
        span {
            width: 5em;
        }
        &:after {
            width: calc(100% - 5em - 10px)
        }
    }
    &:nth-of-type(2) {
        span {
            width: 3em;
        }
        &:after {
            width: calc(100% - 3em - 10px)
        }
    }
}

.data {
    .warn {
        input {
            border: 1px solid #ff4949;
        }
    }
    ul {
        margin-bottom: 40px;
    }
    li {
        display: inline-table;
        width: 100%;
        margin-bottom: 15px;
    }
    p {
        display: table-cell;
        vertical-align: top;
        width: 50%;
        white-space: nowrap;
        span {
            display: inline-block;
            vertical-align: middle;
            width: 70px;
            font-size: 15px;
            text-align: right;
        }
    }
    input {
        width: 258px;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        color: #fff;
        background-color: #03316d;
    }
}

.btns {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 70%;
    margin: 0 auto;
    text-align: center;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    span {
        display: inline-block;
        width: 100px;
        height: 40px;
        line-height: 40px;
        border-radius: 4px;
        cursor: pointer;
        &.default {
            color: $color-light-blue;
            border: 1px solid $color-light-blue;
        }
        &.primary {
            background-color: $color-light-blue;
        }
    }
}
</style>


