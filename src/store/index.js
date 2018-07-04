import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import permission from './modules/permission'
import template from './modules/template'
import document from './modules/document'
import member from './modules/member'
import snap from './modules/snap'
import warning from './modules/warning'
import warns from './modules/warns'
import device from './modules/device'
import locus from './modules/locus'
import system from './modules/system'
// 记录管理
import recordR from './modules/record_recycle'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        permission,
        template,
        document,
        member,
        snap,
        warning,
        warns,
        device,
        locus,
        system,
        recordR
    },
    getters
})
