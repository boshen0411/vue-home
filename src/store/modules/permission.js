import { asyncRouterMap, constantRouterMap } from '../../router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 */
function hasPermission(routes, route) {
  /* if (route.meta) {
    return routes.indexOf(route.meta) > -1
  } else {
    return true
  } */
  return true;
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 */
function filterAsyncRouter(asyncRouterMap, routes) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(routes, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, routes)
        return !!route.children.length
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  namespaced: true,
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    /* NOTE:此处改写为await形式，未校验-20170918 */
    async GenerateRoutes({ commit }, routes) {
      const res = await new Promise(resolve => {
        let accessedRouters = []
        accessedRouters = filterAsyncRouter(asyncRouterMap, routes)
        resolve(accessedRouters);
      })
      await commit('SET_ROUTERS', res);
    }
  }
};

export default permission;