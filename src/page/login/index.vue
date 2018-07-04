<template>
    <div :class="$style.login_block">
        <el-form auto-complete="on"
                 :model="loginForm"
                 :rules="loginRules"
                 ref="loginForm"
                 label-position="left"
                 label-width="opx"
                 :class="$style.form">
            <el-form-item prop="username">
                <svg-icon ico="login_user" />
                <el-input :class="$style.field"
                          name="username"
                          type="text"
                          v-model="loginForm.username"
                          auto-complete="off"
                          placeholder="请输入用户名">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <svg-icon ico="login_assword" />
                <el-input :class="$style.field"
                          name="password"
                          type="password"
                          @keyup.enter.native="handleLogin"
                          v-model="loginForm.password"
                          auto-complete="off"
                          placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           style="width:100%"
                           :loading="loading"
                           @click.native.prevent="handleLogin">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

export default {
    data() {
        return {
            loginForm: {
                username: null,
                password: null
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请输入用户名'
                    }
                ],
                password: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请输入密码'
                    }
                ]
            },
            loading: false
        }
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store.dispatch('user/Login', this.loginForm)
                        .then(() => {
                            this.loading = false;
                            this.$router.push({ path: '/' })
                        })
                        .catch(e => {
                            this.loading = false;
                        })
                } else {
                    return false;
                }
            })
        }
    }
}
</script>
<style lang="scss" module>
.login_block {
    position: relative;
    width: 100%;
    height: 100vh;
    min-width: 630px;
    min-height: 420px;
    background: url('../../assets/login_bg.png') no-repeat center;
    background-size: cover;
    .form {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 630px;
        height: 420px;
        padding: 75px 60px 0 60px;
        font-size: 0;
        background: url('../../assets/login_box.png') no-repeat center;
        background-size: contain;
        &>div {
            > div {
                font-size: 12px;
            }
            &:nth-child(2) {
                margin-top: 55px;
                margin-bottom: 68px;
            }
        }
        svg {
            width: 42px !important;
            height: 48px !important;
            &+div {
                width: calc(100% - 80px);
                margin-left: 32px;
            }
        }
        input {
            height: auto;
            padding: 13px 2px;
            font-size: 18px;
            color: #fff;
            border: none;
            border-radius: 0;
            border-bottom: 1px #1c6eda solid;
            background: transparent;
        }
        button {
            width: 100%;
            height: 64px;
            font-weight: 300px;
            font-size: 24px;
            border: none;
            border-radius: 8px;
            background-color: #187ce4;
        }
    }
    .field+div {
        left: 78px;
        font-size: 14px;
    }
}
</style>