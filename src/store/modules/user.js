import { login, logout } from 'api/login'
import { getToken, setToken, removeToken } from 'auth'

const user = {
    namespaced: true,
    state: {
        token: getToken(),
        routes: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_ROUTES: (state, routes) => {
            state.routes = routes;
        }
    },

    actions: {
        // 帐号登录
        Login({commit}, {username, password}) {
            return login(username, password).done(res => {
                console.log(res)
                // 添加token
                setToken(res.token)
                commit('SET_TOKEN', res.token);
                // 格式化路由
                const menus = res.menus;
                let routes = [];
                menus.forEach(menu => {
                    routes = routes.concat(menu.sysPages.map(page => `${menu.menuName}-${page.pageName}`))
                })
                // 在Store里存放路由
                commit('SET_ROUTES',routes);
                // 在本地存放路由
                localStorage.setItem('PROFILE',JSON.stringify({
                    name: res.username,
                    id: res.id
                }))
                localStorage.setItem('ROUTES',JSON.stringify(routes))
            })
        },
        LogOut({ dispatch, state }) {
            return logout(state.token).then(() => {
                dispatch('SeLogOut')
            }).catch(e => {
                dispatch('SeLogOut')
            });
        },
        SeLogOut({ commit, state }) {
            removeToken();
            localStorage.clear();
            commit('SET_TOKEN', '');
        }
    }
}

export default user