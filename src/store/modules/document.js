import {
    getDocList,
    getDocListByface,
    deleteDoc,
    deleteDocs,
    getDocDetail,
    getDocCap,
    updateDoc,
    createDoc,
    deleteImg
} from 'api/record';

import { Message,Notification } from 'element-ui';

const document = {
    namespaced: true,
    state: {
        list: [],
        total: null,
        details: {},
        cap: {}
    },
    mutations: {
        SET_LIST: (state, res) => {
            state.list = res.list;
            state.total = res.total;
        },
        RESET_LIST: (state) => {
            state.list = []
        },
        SET_DETAIL: (state, res) => {
            state.details = res
        },
        SET_CAP: (state, res) => {
            state.cap = res
        },
        PUSH_CAP: (state, res) => {
            state.cap.list = state.cap.list.concat(res.list)
        },
        SET_IMAGE: (state,list) => {
            state.details.image = list
        }
    },
    actions: {
        getList({commit},arg) {
            return getDocList(arg).done(res => {
                commit('SET_LIST', res)
                if (res.list.length == 0) {
                    if (arg.tempId) {
                        Message.warning("当前模板下暂无匹配信息")
                    } else {
                        Message.warning("未搜索到匹配信息")
                    }
                }
            })
        },
        getListByface({commit},arg) {
            return getDocListByface(arg).done(res => {
                console.log(res)
                commit('SET_LIST', res)
                if (res.list.length == 0) {
                    if (arg.tempId) {
                        Message.warning("当前模板下暂无匹配信息")
                    } else {
                        Message.warning("未搜索到匹配信息")
                    }
                }
            })
        },
        emptyList({commit}){
            commit('RESET_LIST')
        },
        getCapList({commit},o) {
            return getDocCap(o).done(res => {
                commit('SET_CAP',res)
            })
        },
        getCapMore({commit},o) {
            return getDocCap(o).done(res => {
                commit('PUSH_CAP',res)
            })
        },
        getDetail({commit},id) {
            return getDocDetail(id).done(res => {
                commit('SET_DETAIL', res)
            })
        },
        deleteDoc({commit,state},item) {
            return deleteDoc(item.id).done(() => {
                let newlist = state.list.filter(r => r.id != item.id)
                commit('SET_LIST', {
                    list: newlist,
                    total: state.total - 1
                })
                Notification.error({
                    title: '档案已删除',
                    message: `${item.name}已删除`,
                    offset: 100
                })
            })
        },
        deleteDocs({commit,state},item) {
            return deleteDocs(item).done(() => {
                Notification.success({
                    title: '档案已删除',
                    message: `所选档案已删除`,
                    offset: 100
                })
            })
        },
        updateItem({commit,dispatch},arg) {
            return updateDoc(arg)
        },
        createItem({commit},arg) {
            return createDoc(arg).done(() => {
                Message.success("提交成功")
                // TODO: 是否更新列表？
            })
        },
        deletePhoto({commit,state},id) {
            return deleteImg(id).done(() => {
                let imglist = state.details.image.filter(im => im.id!=id)
                commit('SET_IMAGE', imglist)
            })
        }
    }
}

export default document