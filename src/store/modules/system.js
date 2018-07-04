import { 
    permissions, 
    getRoles, 
    checkRole,
    createRole,
    editRole,
    stopRole, 
    delRole, 
    launchRole
} from 'api/member'

const system = {
    namespaced: true,
    state: {
        // 存放角色列表
        roleList: [],
        // 存放当前角色详情
        roleDetail: {},
        // 存放所有权限列表
        permissions: [],
        // 一级菜单对应id与name
        firstMenu: []
    },
    mutations: {
        SET_PMS: (state, val = []) => {
            // 一级菜单列表
            state.firstMenu = val.map(item => {
                const { id, menuName: name } = item
                return { id, name }
            })
            // 将actions按id排序
            val.forEach(menu => {
                const pages = menu && menu.sysPages || []
                pages.forEach(page => {
                    const actions = page && page.actions || []
                    // 按id排序
                    page.actions = actions.sort((a, b) => a.id > b.id)
                })
            })
            state.permissions = val || []
        },
        SET_LIST: (state, val) => {
            state.roleList = val || []
        },
        SET_DETAIL: (state, val) => {
            state.roleDetail = val || {}
        },
        DEL_ITEM: (state, val) => {
            state.roleList.forEach((item,idx) => {
                if (item.id == val) {
                    state.roleList.splice(idx, 1)
                }
            })
        }
    },
    actions: {
        getPermissions({ commit }) {
            return new Promise(resolve => {
                permissions().done(res => {
                    commit('SET_PMS', res)
                    resolve(res)
                })
            })
        },
        getRoleList({ commit }) {
            getRoles().done(res => {
                commit('SET_LIST', res.list)
            })
        },
        getRoleDetail({ commit }, args) {
            return new Promise(resolve => {
                checkRole(args).done(res => {
                    commit('SET_DETAIL', res)
                    resolve(res)
                })
            })
        },
        syncRoleDetail({ commit }, val) {
            commit('SET_DETAIL', val)
        },
        createRole({ commit }, args) {
            return new Promise(resolve => {
                createRole(args).done(res => {
                    resolve(res)
                })
            })
        },
        editRole({ commit }, args) {
            return new Promise(resolve => {
                editRole(args).done(res => {
                    resolve(res)
                })
            })
        },
        stopRole({ commit }, args) {
            return new Promise(resolve => {
                stopRole(args).done(res => {
                    resolve(res)
                })
            })
        },
        delRole({ commit }, args) {
            return new Promise(resolve => {
                delRole(args).done(res => {
                    commit('DEL_ITEM', args.id)
                    resolve(res)
                })
            })
        },
        launchRole({ commit }, args) {
            return new Promise(resolve => {
                launchRole(args).done(res => {
                    resolve(res)
                })
            })
        },
    }
}

export default system