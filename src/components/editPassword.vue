<template>
    <section class="container" v-if="show">
        <div class="content" v-show="edit">
            <p>
                <span>原密码：</span>
                <input type="password" placeholder="请输入" v-model="origin">
            </p>
            <p>
                <span>新密码：</span>
                <input type="password" placeholder="请输入" v-model="newP">
            </p>
            <p>
                <span>确认新密码：</span>
                <input type="password" placeholder="请输入" v-model="renew">
            </p>
            <div>
                <span @click="close">取消</span>
                <span @click="confirm">确认</span>
            </div>
        </div>
        <div class="success" v-show="!edit">
            <p>
                <b>密码修改成功</b><br />
                <span>请重新登录系统</span>
            </p>
            <div @click="reLogin">重新登录</div>
        </div>
    </section>
</template>

<script>
import { editPassword } from 'api/login';

export default {
    data() {
        return {
            show: false,
            edit: true,
            origin: '',
            newP: '',
            renew: ''
        }
    },
    methods: {
        open() {
            this.show = true
        },
        close() {
            this.show = false
        },
        confirm() {
            // 验证：
            // 不能为空
            // 新旧不能一致
            // 新密码确认一致
            const blank = !(this.origin && this.newP && this.renew)
            const same = this.origin === this.newP
            const reDiff = this.newP !== this.renew
            const mes = {
                blank: '请填写完整',
                same: '新旧密码不能相同',
                reDiff: '新密码不一致'
            }
            if (blank) return this.$message.error(mes.blank)
            if (same) return this.$message.error(mes.same)
            if (reDiff) return this.$message.error(mes.reDiff)
            editPassword({
                id: JSON.parse(localStorage.PROFILE || '{}').id,
                oldPassword: this.origin,
                newPassword: this.newP
            }).done(res => {
                this.edit = false
            })
        },
        reset() {
            this.origin = ''
            this.newP = ''
            this.renew = ''
        },
        reLogin() {
            this.reset()
            this.edit = true
            this.$store.dispatch('user/SeLogOut')
            location.reload()
            this.close()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~style/basic/param';

.container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    line-height: 1;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
    > div {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: #fff;
    }
}

.content {
    width: 500px;
    padding: 30px 0;
    > p {
        display: flex;
        justify-content: center;
        align-items: center;
        & + p {
            margin-top: 10px;
        }
        > span {
            display: inline-block;
            width: 6em;
            text-align: right;
            font-size: 14px;
            color: #333;
        }
        > input {
            width: 200px;
            height: 40px;
            padding: 0 8px;
            background: #ebf5ff;
            font-size: 14px;
            color: #000;
        }
    }
    > div {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        > span {
            display: inline-block;
            width: 80px;
            height: 40px;
            border: 1px solid $color-light-blue;
            border-radius: 4px;
            background: #fff;
            text-align: center;
            line-height: 40px;
            font-size: 16px;
            color: $color-light-blue;
            cursor: pointer;
            user-select: none;
            & + span {
                margin-left: 120px;
                background: $color-light-blue;
                color: #fff;
            }
        }
    }
}

.success {
    width: 360px;
    padding: 37px 0 20px;
    text-align: center;
    > p {
        display: inline-block;
        padding: 7px 0 50px 90px;
        text-align: left;
        background: url('~assets/icons/finish.png') no-repeat left top;
        background-size: 60px;
        > b, span {
            font-weight: normal;
            font-size: 18px;
            color: #333;
        }
        > span {
            margin-top: 6px;
            display: block;
            color: #999;
        }
    }
    > div {
        margin: 0 auto;
        width: 120px;
        height: 40px;
        border-radius: 4px;
        background: $color-light-blue;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
    }    
}
</style>