import {
    getServerList,
    getDeviceList,
    syncServer,
    createServer,
    deleteServer
} from 'api/device'

import { Message } from 'element-ui'

const device = {
    namespaced: true,
    state: {
        servers: [],
        totalDev: null,
        curServer: null,
        devices: []
    },
    mutations: {
        SET_SERVERS: (state, res) => {
            state.servers = res.dtos
            state.totalDev = res.total
        },
        SET_DEVICES: (state, res) => {
            state.devices = res.list
        },
        SET_CURRENT_SERVER: (state, id) => {
            state.curServer = id
        }
    },
    actions: {
        getServers({ commit,dispatch }) {
            return getServerList().done(res => {
                commit('SET_SERVERS', res)
                if (res.dtos.length) {
                    dispatch('getDevices',res.dtos[0].id)
                }
            })
        },
        getDevices({ commit }, id) {
            return getDeviceList(id).done(res => {
                commit('SET_CURRENT_SERVER', id)
                commit('SET_DEVICES', res)
            })
        },
        syncFromServer({ state }) {
            return syncServer(state.curServer)
        },
        createSer({},args) {
            return createServer(args)
        },
        async deleteServer({ dispatch }, args){
            await deleteServer(args).then(o => Message.success('删除成功'));
            dispatch('getServers');
        }
    }
}

export default device