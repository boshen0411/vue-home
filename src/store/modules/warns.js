/*
 * @Author: nooldey 
 * @Date: 2017-08-28 09:09:27 
 * @Last Modified by: nooldey
 * @Last Modified time: 2017-09-12 16:03:56
 * 预警记录(API暂用实时预警接口)
 */

import { queryList,getWarnCap } from 'api/warning'

import { Message } from 'element-ui';

const warns = {
    namespaced: true,
    state: {
        list: [],
        total: null,
        cap: {}
    },
    mutations: {
        SET_LIST: (state,res) => {
            res.list.forEach(item => {
                item.warningTime = item.warningTime && item.warningTime.slice(0,19).replace(/T/,' ') || null
            })
            state.list = res.list
            state.total = res.total
        },
        RESET_LIST: (state) => {
            state.list = []
            state.total = 0
        },
        SET_CAP: (state,res) => {
            state.cap = res;
        },
        PUSH_CAP: (state,res) => {
            state.cap.list = state.cap.list.concat(res.list)
        }
    },
    actions: {
        getList({commit},args) {
            return queryList(args).done(res => {
                if (!res.total) Message.warning('暂无数据')
                commit('SET_LIST',res)
            })
        },
        resetList({commit}) {
            commit('RESET_LIST')
        },
        getCap({commit},args) {
            return getWarnCap(args).done(res => {
                console.log(res)
                commit('SET_CAP',res)
            })
        },
        getMoreCap({commit},args) {
            return getWarnCap(args).done(res => {
                commit('PUSH_CAP',res)
            })
        },
    }
}

export default warns