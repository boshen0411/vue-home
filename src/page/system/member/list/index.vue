<template>
    <section class="member-container">
        <div :class="$style.create">
            <router-link to="/system/member/modify">新建用户</router-link>
        </div>
        <section v-loading="loading">
            <auto-table :class="[$style.table,totalPage == 1 && $style.noFooter]" :data="inf">
                <span prop="username" label="用户名" width="190"></span>
                <span prop="roleName" label="角色" width="132"></span>
                <span prop="department" label="部门" width="180"></span>
                <span prop="position" label="职务" width="128"></span>
                <span label="权限" width="176">
                    <template scope="idx">
                        <span :class="$style.set">设置</span>
                    </template>
                </span>
                <span isHTML prop="lastLogin" label="上次登录" width="166"></span>
                <span label="操作" width="170">
                    <template scope="idx">
                        <span :class="[$style.btn,$style.edit]" @click="edit(idx)"></span>
                        <span v-if="inf[idx].state === 'N'" :class="[$style.btn, $style.shutoff]" @click="popup('shut',idx)"></span>
                        <span v-else :class="[$style.btn, $style.launch]" @click="popup('launch',idx)"></span>
                        <span :class="[$style.btn,$style.del]" @click="popup('del',idx)"></span>
                    </template>
                </span>
            </auto-table>
            <page-footer :class="$style.footer" 
                :total="totalPage" 
                :cur.sync="curPage"
                :loading="loading"
                @turnPage="init"
            ></page-footer>
        </section>
        <popup-warn ref="warn" 
            @confirm="confirm"></popup-warn>
    </section>
</template>

<script>
import { queryAll, shutoffUser, delUser, launchUser } from 'api/member';

export default {
    components: {
        autoTable: () => import('@/AutoTable'),
        popupWarn: () => import('../../components/PopupWarn'),
        pageFooter: () => import('@/PageFooter')
    },
    data() {
        return {
            inf: [],
            totalPage: 1,
            curPage: this.$route.query.page || 1,
            loading: false
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init(n) {
            const args = {
                pageSize: 8,
                pageNum: n-1 || this.$route.query.page - 1 || 0
            }
            this.loading = true;
            queryAll(args).then(res => {
                if (!res.list.length && this.curPage > 1) {
                    const maxPage = Math.ceil(res.total/8)
                    return this.init(maxPage)
                }
                let arr = res.list.map(r => {
                    return {
                        id: r.id,
                        username: r.username,
                        role: Number(r.role),
                        roleName: r.roleName,
                        department: r.department,
                        position: r.displayName,
                        lastLogin: r.lastLoginTime && r.lastLoginTime.slice(0,19).replace(/T/,'<br>'),
                        state: r.state
                    }
                })
                setTimeout(() => {
                    this.totalPage = Math.ceil(res.total / 8);
                    this.inf = arr
                    this.loading = false;
                },600)
            }).catch(e => {
                // console.log(e)
                this.loading = false;
            })
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
        popup(type, idx) {
            const message = `你确定要${this.text(type)}这个账户吗？`;
            // 触发弹框的显示函数
            this.$refs.warn.open({
                type,
                store: { type, idx },
                message
            })
        },
        confirm({type, idx}) {
            const { id, username } = this.inf[idx]
            if (type == 'shut') return this.shutoff(idx, id, username)
            if (type == 'del') return this.del(idx, id, username)
            if (type == 'launch') return this.launch(idx, id, username)
        },
        shutoff(idx, id, username) {
            shutoffUser({ id }).done(res => {
                this.$notify.success({
                    title: '用户已停用',
                    message: `${username} 用户 已停用`
                });
                this.$refs.warn.close()
                this.inf[idx].state = 'F'
            })
        },
        del(idx, id, username) {
            delUser({ id }).done(res => {
                this.$notify.success({
                    title: '用户已删除',
                    message: `${username} 用户 已删除`
                });
                this.$refs.warn.close()
                this.inf.splice(idx,1)
                this.$refs.warn.close()
                if (!this.inf.length && this.curPage > 1) {
                    this.init()
                }
            })
        },
        launch(idx, id, username) {
            launchUser({ id }).done(res => {
                this.$notify.success({
                    title: '用户已启用',
                    message: `${username} 用户 已启用`
                })
                this.$refs.warn.close()
                this.inf[idx].state = 'N'
            })
        },
        edit(idx){
            const obj = JSON.parse(JSON.stringify(this.inf[idx]))
            obj._pathName = `/system/member/modify?id=${obj.id}`
            this.$store.dispatch('setTemp',obj)
            this.$router.push(obj._pathName)
        },
        set(e) {
            // 暂时不做这个功能
            // console.log(e)
        }
    },
}    
</script>

<style lang="scss" module>
@import '~style/basic/param';
.create {
    margin-bottom: 15px;
    > a {
        display: inline-block;
        vertical-align: top;
        width: 160px;
        height: 50px;
        border-radius: 4px;
        background: $color-light-blue;
        text-align: center;
        line-height: 50px;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
        user-select: none;
        &:hover {
            background: $color-sky-blue;
        }
        &::before {
            margin-right: 4px;
            vertical-align: middle;
            content: '';
            display: inline-block;
            width: 28px;
            height: 30px;
            background: url('assets/icons/add_person.png') no-repeat center;
        }
    }
}
.btn {
    vertical-align: middle;
    display: inline-block;
    width: 20px;
    height: 20px;
    cursor: pointer;
    & + span{
        margin-left: 18px;
    }
}
.set {
    cursor: pointer;
}
.edit {
    background: url('assets/icons/edit_green-s.png') no-repeat center;
    background-size: contain;
}
.shutoff {
    background: url('assets/icons/shut-s.png') no-repeat center;
    background-size: contain;
}
.launch {
    background: url('assets/icons/launch-s.png') no-repeat center;
    background-size: contain;
}
.del {
    background: url('assets/icons/del_red-s.png') no-repeat center;
    background-size: contain;
}
.footer {
    width: 100%;
    padding: 40px 0 30px;
    background: $color-dark-blue;
}
.table {
    > section {
        height: calc(100vh - 311px);
    }
    &.noFooter {
        > section {
            height: calc(100vh - 229px);
        }
    }
}
</style>
