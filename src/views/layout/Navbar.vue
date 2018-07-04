<template>
    <nav class="navbar"
             mode="horizontal">
        <!-- LOGO -->
        <router-link to="/" class="logo">
            <img :src="require('assets/logo.png')"
                 alt="">
            <span>温州龙湾人脸识别大数据分析平台</span>
        </router-link>
        <!-- 右侧 -->
        <div class="avatar-container">
            <sync-progress></sync-progress>
            <!-- 用户下拉菜单 -->
            <el-dropdown trigger="click">
                <div class="avatar">
                    <img class="user-avatar" :src="avatar">
                    <span>{{ name }}</span>
                </div>
                <el-dropdown-menu class="user-dropdown"
                                  slot="dropdown">
                    <el-dropdown-item>
                        <router-link class="inlineBlock"
                                     to="/">账户信息</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <a @click="$refs.editPassword.open()">修改密码</a>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <span @click="logout">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <edit-password ref="editPassword"></edit-password>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import SyncProgress from '@/syncProgress'
export default {
    components: {
        SyncProgress,
        EditPassword: () => import('@/editPassword')
    },
    data() {
        return {
            name: JSON.parse(localStorage.PROFILE || '{}').name,
            avatar: require('assets/icons/avatar.png')
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('user/LogOut').done(() => {
                location.reload();
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~style/basic/param';
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $bar-height;
    background-color: $color-dark-blue;
    border-bottom: solid 1px #003fa7;
    color: #fff;
    .logo {
        display: inline-flex;
        align-items: center;
        height: $bar-height;
        padding-left: 20px;
        font-size: 24px;
        img {
            max-height: 40px;
            width: auto;
        }
        span {
            margin-left: 20px;
        }
    }
    .avatar-container {
        display: inline-flex;
        align-items: center;
        height: $bar-height;
        margin-right: 20px;
    }
    .avatar {
        cursor: pointer;
        &:hover {
            opacity: .8;
        }
        img,
        span {
            display: inline-block;
            vertical-align: middle;
            font-size: 20px;
            color: #fff;
        }
        img {
            width: 28px;
            height: 30px;
            margin-right: 10px;
            object-fit: cover;
        }
        span {
            max-width: 10em;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

.user-dropdown {
    top: 60px !important;
    width: 94px;
    min-width: auto;
    margin: 0;
    padding: 10px 0;
    font-size: 16px;
    li {
        height: 40px;
        line-height: 40px;
    }
    a {
        display: block;
    }
}

</style>
