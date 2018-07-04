<template>
    <section class="roleManager">
        <div class="top"><span class="btn" @click="$router.push('modify')">添加角色</span></div>    
        <ul class="list ui-scrollbar">
            <li class="row" v-for="(item,idx) in list" :key="idx">
                <section class="left" @click="push(item, true)">
                    <p class="role">
                        <b>{{ item.roleName }}</b>
                        <span v-for="p in splitIt(item.permission)" :key="p.id">{{ p.name || '-' }}</span>
                    </p>
                    <p>{{ item.count === 0 ? 0 : item.count || '-' }}</p>
                </section>
                <section class="btns">
                    <span @click="push(item)">编辑</span>
                    <i></i>
                    <el-dropdown @command="pop">
                        <span class="el-dropdown-link">
                            更多<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{type: 'del', idx}">删除</el-dropdown-item>
                            <el-dropdown-item v-if="item.status === 'Y'" :command="{type: 'shut', idx}">禁用</el-dropdown-item>
                            <el-dropdown-item v-else :command="{type: 'launch', idx}">启用</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </section>
            </li>
        </ul>
        <warn ref="warn" @confirm="confirm"/>
    </section>
</template>

<script>
export default {
    components: {
        warn: () => import('../../components/PopupWarn')
    },
    computed: {
        list() {
            return this.$store.state.system.roleList || []
        }
    },
    mounted() {
        const len = this.$store.state.system.permissions.length
        const listLen = this.list.length
        // 当权限列表不存在时，先获取权限列表，再获取角色权限
        if (!len) {
            this.$store.dispatch('system/getPermissions').then(res => {
                this.$store.dispatch('system/getRoleList')
            })
        } else if (!listLen) {
            this.$store.dispatch('system/getRoleList')
        }
    },
    methods: {
        push(item, isCheck) {
            const { id } = item
            this.$store.dispatch('system/syncRoleDetail',item)
            if (isCheck) {
                this.$router.push(`modify?id=${id}&status=check`)
            } else {
                this.$router.push(`modify?id=${id}`)
            }
        },
        pop({type, idx}) {
            const text = this.text(type)
            const message = `确定${text}此角色？<br />此操作会${text}其所有的用户！！`
            // 当warn弹框点击确认后，会触发$emit的confirm事件
            this.$refs.warn.open({
                type,
                message,
                store: {type, idx}
            })
        },
        del(idx, id) {
            this.$store.dispatch('system/delRole',{ id }).done(res => {
                this.$notify.success({
                   title: '角色已删除',
                   message: `${this.list[idx].roleName} 角色 已删除`
                })
                this.list.splice(idx, 1)
            })
        },
        shut(idx, id) {
            this.$store.dispatch('system/stopRole',{ id }).done(res => {
                this.$notify.success({
                   title: '角色已禁用',
                   message: `${this.list[idx].roleName} 角色 已禁用`
                })
                this.list[idx].status = 'N'
            })
        },
        launch(idx, id) {
            this.$store.dispatch('system/launchRole',{ id }).done(res => {
                this.$notify.success({
                    title: '角色已启用',
                   message: `${this.list[idx].roleName} 角色 已启用`
                })
                this.list[idx].status = 'Y'
            })
        },
        confirm({ type, idx }) {
            const id = this.list[idx].id
            this.$refs.warn.close()
            if (type === 'del') return this.del(idx, id)
            if (type === 'shut') return this.shut(idx, id)
            if (type === 'launch') return this.launch(idx, id)
        },
        text(type) {
            switch(type) {
                case 'del':
                    return '删除'
                    break;
                case 'shut':
                    return '禁用'
                    break;
                case 'launch':
                    return '启用'
                    break;
            }
        },
        splitIt(str) {
            const pms = this.$store.state.system.firstMenu
            let list = []
            if (!str) return []
            // 存在逗号的代表多个权限
            if (str === '*') {
                list = pms
            } else {
                // 遍历所有权限
                const arr = str.split(',')
                let checkedMenus = []
                arr.forEach(item => {
                    const [menuId] = item.split('.')
                    if (checkedMenus.indexOf(menuId) < 0) {
                        // 已遍历过的一级菜单不再执行
                        checkedMenus.push(menuId)
                        pms.forEach(p => {
                            if (p.id === menuId) {
                                list.push(p)
                            }
                        })
                    }
                })
            }
            return list
        },
    }
}
</script>

<style lang="scss" scoped>
@import '~style/basic/param';

.roleManager {
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 88px);
    background: $color-dark-blue;
    padding: 20px;
}
.top {
    margin-bottom: 12px;
    text-align: right;
    > span {
        display: inline-block;
        width: 120px;
        height: 40px;
        border-radius: 4px;
        background: $color-light-blue;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
    }
    .btn {
        cursor: pointer;
        user-select: none;
    }
}
.list {
    padding-right: 10px;
    flex: 1;
    overflow: auto;
    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0 13px;
        .left {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 50%;
            cursor: pointer;
            user-select: none;
        }
        .btns {
            display: flex;
            align-items: center;
            font-size: 0;
            > i {
                margin: 0 6px;
                display: inline-block;
                width: 1px;
                height: 16px;
                background: #ccc;
            }
            > span, > .el-dropdown > span {
                font-size: 16px;
                cursor: pointer;
                user-select: none;
            }
            > span {
                color: $light-green;
            }
            > .el-dropdown > span {
                color: $color-light-blue;
            }
        }
    }
}
.el-dropdown-menu__item {
    color: #000;
}
.role {
    > b {
        margin-bottom: 10px;
        display: block;
        font-weight: normal;
        font-size: 16px;
        color: #fff;
    }
    > span {
        font-size: 14px;
        color: #999;
        & + span::before {
            content: '、';
        }
    }
    > p + p {
        font-size: 16px;
    }
}
</style>