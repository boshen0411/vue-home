<template>
    <section class="role-detail">
        <div class="topRow">
            <figure>
                <img src="~assets/temp/defaultpro.png" alt="head">
            </figure>
            <div v-if="$route.query.status === 'check'">
                <span>{{ roleName }}</span>
                <p>角色码：
                    <i>{{ id }}</i>
                </p>
                <p>功能:
                    <span v-for="item in splitIt(permission)" :key="item.id">{{ item.name }}</span>
                </p>
            </div>
            <div v-else>
                <span>角色名称： <input type="text" placeholder="请输入角色名" v-model="roleName"></span>
                <p v-if="$route.query.id">角色码：
                    <i>{{ id }}</i>
                </p>
                <p>功能:
                    <span v-for="item in splitIt(permission)" :key="item.id">{{ item.name }}</span>
                </p>
            </div>
        </div>
        <section class="sets-box">
            <div class="btns">
                <span v-if="$route.query.status === 'check'"
                    @click="$router.push(`${$route.path}?id=${$route.query.id}`)"
                >编辑</span>
                <span v-else
                    @click="save"
                >保存</span>
                <span @click="cancel">{{ $route.query.status === 'check' ? '返回' : '取消' }}</span>
            </div>
            <dl class="sets" v-for="(firstMenu, idx) in permissions" :key="idx">
                <dt @click="$set(active,idx,active[idx] === 0 ? null : 0)">
                    <span>{{ firstMenu.menuName }}</span>
                </dt>
                <dd v-show="active[idx] || active[idx] === 0">
                    <ul>
                        <li v-for="(secMenu,index) in firstMenu.sysPages" :key="index"
                            :class="{ 'active': index === active[idx] }"
                            @click="$set(active, idx, index)"
                        >{{ secMenu.pageName }}</li>
                    </ul>
                    <p v-if="firstMenu.sysPages[active[idx]]"
                        :class="{'edit': $route.query.status !== 'check'}">
                        <span v-for="(action,actionIdx) in firstMenu.sysPages[active[idx]].actions"
                            :key="actionIdx"
                            :class="{ 'active': inChecks(idx, action)}"
                            @click="checkType(idx, action, firstMenu.sysPages[active[idx]].actions[0].id)">
                            <em>{{ action.actionName }}</em>
                        </span>
                    </p>
                </dd>
            </dl>
        </section>
    </section>
</template>

<script>
export default {
    data() {
        return {
            roleName: null,
            id: this.$route.query.id || null,
            active: [],     // 用于控制组件显示隐藏，索引控制一级菜单显隐，索引对应值控制二级菜单内容显隐
            checkboxs: [],  // 用于控制权限是否选中
            // 数据如：idx: [subIdx:[['id1','id2'],['id3'],['id4']]]
        }
    },
    computed: {
        permission() {
            let str = ''
            const arr = this.checkboxs
            arr.forEach((pages,menuIdx) => {
                const menuId = this.permissions[menuIdx].id
                pages && pages.forEach((actions, pageIdx) => {
                    const pageId = this.permissions[menuIdx].sysPages[pageIdx].id
                    actions && actions.forEach(actionId => {
                        if (actionId) {
                            str += `,${menuId}.${pageId}.${actionId}`
                        }
                    })
                })
            })
            return str.slice(1)
        },
        permissions() {
            // 权限列表
            return this.$store.state.system.permissions || []
        },
        roleDetail() {
            // 角色详细信息
            return this.$store.state.system.roleDetail || {}
        }
    },
    mounted() {
        if (this.permissions.length) {
            this.init()
            if (this.id) {
                // 没有id时是新建状态
                const roleIds = this.$store.state.system.roleList.map(item => item.id)
                const idx = roleIds.indexOf(this.id)
                if (idx < 0) {
                    this.query()
                } else {
                    this.$store.state.system.roleDetail = this.$store.state.system.roleList[idx]
                    this.initData()
                }
            }
        } else {
            this.$store.dispatch('system/getPermissions').then(res => {
                this.init()
                if (this.id) {
                    this.query()
                }
            })
        }
    },
    methods: {
        init() {
            const len = this.permissions.length
            for (let i = 0; i < len; i ++) {
                this.$set(this.active, i, 0)
            }
        },
        initData() {
            const { roleName, permission } = this.roleDetail
            this.roleName = roleName
            this.initChecked(permission)
        },
        initChecked(pms) {
            if (!pms) return;
            let checkboxs = []
            const permissions = this.permissions
            if (pms === '*') {
                permissions.forEach((menu, firstIdx) => {
                    checkboxs[firstIdx] = []
                    menu && menu.sysPages.forEach((page, secIdx) => {
                        const ids = page && page.actions.map(action => action.id)
                        checkboxs[firstIdx][secIdx] = ids
                    })
                })
            } else {
                let menuIds = []
                let pageIds = []
                permissions.forEach((menu,menuIdx) => {
                    menuIds.push(menu.id)
                    pageIds[menuIdx] = []
                    checkboxs[menuIdx] = []
                    menu.sysPages.forEach((page,pageIdx) => {
                        checkboxs[menuIdx][pageIdx] = []
                        pageIds[menuIdx].push(page.id)
                    })
                })
                const arr = pms.split(',')
                arr.forEach(full => {
                    const [menuId, pageId, actionId] = full.split('.')
                    const menuIdx = menuIds.indexOf(menuId)
                    const pageIdx = pageIds[menuIdx].indexOf(pageId)
                    if (menuIdx > -1 && pageIdx > -1) {
                        checkboxs[menuIdx][pageIdx].push(actionId)
                    }
                })
            }
            this.checkboxs = checkboxs
        },
        query() {
            const { id } = this
            this.$store.dispatch('system/getRoleDetail',{ id }).then(res => {
                this.initData()
            })
        },
        checkType(idx, action, pageId) {
            // idx 为一级菜单索引
            // subIdx为二级菜单索引
            // curId为当前action的id
            if (this.$route.query.status === 'check') return;
            if (!this.checkboxs[idx]) this.$set(this.checkboxs,idx,[])
            const subIdx = this.active[idx]
            let checkList = this.checkboxs[idx][subIdx] || []
            const curId = action.id
            const checkIdx = checkList.indexOf(curId)
            /* 
             * 判断curId是否为pageId
             *      是   判断数组是否为空
             *          是   [pageId]
             *          否   []
             *      否   判断数组是否为空
             *          是   [pageId, curId]
             *          否   判断curId是否存在
             *              是 splice curId
             *              否 push curId
             *  */
            if (curId === pageId) {
                if (!checkList.length) {
                    checkList = [pageId]
                } else {
                    checkList = []
                }
            } else {
                if (!checkList.length) {
                    checkList = [pageId, curId]
                } else {
                    if (checkIdx > -1) {
                        checkList.splice(checkIdx, 1)
                    } else {
                        checkList.push(curId)
                    }
                }
            }
            this.$set(this.checkboxs[idx], subIdx, checkList)
        },
        inChecks(idx, action) {
            const subIdx = this.active[idx]
            if (this.checkboxs[idx]) {
                const checkList = this.checkboxs[idx][subIdx] || []
                return checkList.indexOf(action.id) > -1
            } else {
                return false
            }
        },
        async save() {
            const { id, roleName: name } = this
            if (!name) return this.$message.warning('请输入角色名')
            // 名字查重
            let names = {}
            this.$store.state.system.roleList.forEach(role => {
                const { id, roleName } = role
                names[id] = roleName
            })
            for(let nId in names) {
                if (names[nId] === name && nId !== id) {
                    return this.$message.error('角色名重复')
                }
            }
            if (this.id) {
                await this.edit()
            } else {
                await this.create()
            }
            await this.$store.dispatch('system/getRoleList')
        },
        cancel () {
            this.initData()
            this.$router.go(-1)
        },
        create() {
            const { roleName: name, permission } = this
            const args = { name, permission }
            this.$store.dispatch('system/createRole',args).done(res => {
                this.$notify.success({
                   title: '角色创建成功',
                   message: `${name} 角色 创建成功`
                })
                this.$router.go(-1)
            })
        },
        edit() {
            const { id, roleName: name, permission } = this
            const args = { id, name, permission }
            this.$store.dispatch('system/editRole',args).done(res => {
                this.$notify.success({
                   title: '角色修改成功',
                   message: `${name} 角色 修改成功`
                })
                this.$router.go(-1)
            })
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
        }
    }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

