/*
 * @Author: nooldey 
 * @Date: 2017-08-28 09:09:46 
 * @Last Modified by: nooldey
 * @Last Modified time: 2017-09-13 15:20:07
 * 实时预警
 */

import { queryList,ignoreItem,ignoreMulti,getWarnCap } from 'api/warning'

import { Message } from 'element-ui';

const warning = {
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
                commit('SET_LIST',res)
            })
        },
        promptItem({commit},arg) {
            // 忽略单个
            return ignoreItem(arg).done(() => {
                Message.success("操作成功")
            })
        },
        promptMulti({commit},ids) {
            // 忽略多个

            return ignoreMulti(ids).done(() => {
                Message.success("操作成功")
            })
        },
        resetList({commit}) {
            commit('RESET_LIST')
        },
        getCap({commit},args) {
            return getWarnCap(args).done(res => {
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

export default warning