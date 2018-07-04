import {
    getTempList,
    updateTemp,
    createTemp,
    deleteTemp
} from 'api/template'

import {Message,Notification} from 'element-ui'

const setLevel = (arr, level) => {
    arr.forEach(ar => {
        ar.level = level;
        if (ar.list && ar.list.length) {
            ar.isOpen = false;
            let n = level + 1;
            setLevel(ar.list, n)
        }
    })
}

const setArea = (r) => {
    return r.map(o => Object.assign(
        { label: o.name, value: o.id }, 
        o.list && o.list.length ? { children: setArea(o.list) } : {}
    ))
}

const tree = {
    namespaced: true,
    state: {
        treeArr: [],
        areas: []
    },
    mutations: {
        SET_TREE: (state, tree) => {
            state.treeArr = tree
            state.areas = setArea(tree)
        }
    },
    actions: {
        InitialTree({ commit, state }) {
            return getTempList().done(res => {
                if (res.length > 0) {
                    setLevel(res, 1)
                    commit('SET_TREE', res)
                }
            })
        },
        removeBranch({ commit, dispatch }, branch) {
            return deleteTemp(branch.id).then(() => {
                Notification.error({
                    title: '模板节点已删除',
                    message: `${branch.name}已删除`,
                    offset: 100
                });
                dispatch('InitialTree')
            }).catch(e => {
                Message.error("删除节点失败")
            })
        },
        addTreeBranch({ commit, dispatch }, args) {
            return createTemp(args).then(() => {
                dispatch('InitialTree')
                Message.success("添加节点成功")
            }).catch(e => {})
        },
        editBranch({ commit, dispatch }, args) {
            return updateTemp(args).then(() => {
                dispatch('InitialTree')
                Message.success("修改节点成功")
            }).catch(e => {
                console.log(e)
            })
        }
    }
}

export default tree