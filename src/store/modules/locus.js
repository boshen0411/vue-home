/*
 * @Author: nooldey 
 * @Date: 2017-08-30 10:18:10 
 * @Last Modified by: nooldey
 * @Last Modified time: 2017-09-09 09:51:10
 * 人物轨迹
 */
import { Message } from 'element-ui';

const locus = {
    namespaced: true,
    state: {
        people: [],
        query: {},
        currentComp: 'MainMap'
    },
    mutations: {
        SET_PEOPLE: (state, res) => {
            state.people = res;
        },
        SET_LIST: (state, res) => {
            state.query = res;
        },
        PUSH_PEOPLE: (state, item) => {
            state.people.push(item)
        },
        SET_CURRENT: (state, str) => {
            state.currentComp = str;
        }
    },
    actions: {
        pushPeople({ commit, state }, o) {
            // 批量添加
            let newList = o.filter(r => !state.people.some(l => l.id === r.id && l.name === r.name))
            if (newList.length) {
                let p = state.people.concat(newList)
                commit('SET_PEOPLE', p)
            } else {
                Message.warning("所选条目已存在人物列表中")
            }
        },
        addPeople({ commit,state },o) {
            // 添加单个
            let p = state.people.some(r => r.id === o.id && r.name === o.name)
            if (!p) {
                commit('PUSH_PEOPLE', o)
            } else {
                Message.warning("该条目已存在人物列表中")
            }
        },
        popPeople({ commit, state }, o) {
            let p = state.people.filter(r => r.id != o.id)
            commit('SET_PEOPLE', p)
            if (p.length<1) {
                commit('SET_CURRENT', 'MainMap')
            }
        },
        getQuery({ commit }, arg) {
            // TODO:暂用假数据，未接入API
            commit('SET_LIST', {
                list: [{
                        id: 12,
                        name: '张三',
                        idCard: '123456456',
                        dateOfBorth: '1989-08-06',
                        age: 23,
                        address: '广东深圳',
                        faceTotal: 2
                    },
                    {
                        id: 13,
                        name: '李四',
                        idCard: '123456489',
                        dateOfBorth: '1989-08-06',
                        age: 23,
                        address: '广东深圳',
                        faceTotal: 2
                    },
                    {
                        id: 14,
                        name: '王五',
                        idCard: '12345',
                        dateOfBorth: '1989-08-06',
                        age: 23,
                        address: '广东深圳',
                        faceTotal: 2
                    }
                ],
                total: 3
            })
        },
        setCurrent({ commit }, str) {
            commit('SET_CURRENT', str)
        }
    }
}

export default locus