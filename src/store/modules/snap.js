/**
 * 抓拍比中store
 */
import { Message, Notification } from 'element-ui'
import { capList, capRemove, sceneDetail } from 'api/snap'
import { fullFormat } from 'utils';

const snap = {
    namespaced: true,
    state: {
        params: {},
        list: [],
        total: null,
        loading: false
    },
    mutations: {
        'push/list'(state, { list, total, params }){
            state.list = list
            state.total = total
            state.params = params
        },
        'reset/list'(state) {
            state.list = []
            state.total = null
        },
        'loading/list'(state) {
            state.loading = !state.loading
        }
    },
    actions: {
        nextList({ state, dispatch }, page) {
            const args = { ...state.params, pageNum: page - 1 }
            return dispatch('pullList', args)
        },
        pullList({ commit }, o){
            commit('loading/list')
            return new Promise(resolve => {
                capList(o).done(r => {
                    r.list = r.list.map(item => {
                        item.createOn = fullFormat(item.createOn)
                        return item
                    })
                    r.params = o
                    // 为了让loading加载图显示得久一点T.T
                    commit('loading/list')
                    commit('push/list', r)
                    resolve(r)
                })
            })
        },
        pullDetail({ commit }, o){
            return new Promise(resolve => {
                sceneDetail(o).done(res => {
                    resolve(res)
                })
            })
        },
        popRecord({ state, dispatch }, { capId }){
            capRemove({ capId }).then(() => {
                Notification.success({
                    title: '记录已删除',
                    message: '抓拍 记录 已删除',
                    offset: 100
                });
                dispatch('pullList',state.params)
            }).catch(e => Message.error('删除失败！'))
        },
        resetList({ commit }) {
            commit('reset/list')
        }
    }
}

export default snap