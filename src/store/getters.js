// TODO:精简变量，合并无需分开的变量
const getters = {
    token: state => state.user.token,
    // permission
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    // template
    treeArr: state => state.template.treeArr,
    areas: state => state.template.areas,
    // user
    routes: state => state.user.routes,
    // people-document
    documents: state => state.document.list,
    docTotal: state => state.document.total,
    docDetail: state => state.document.details,
    docCap: state => state.document.cap,
    // warning-query
    warningList: state => state.warning.list,
    warningTotal: state => state.warning.total,
    warningCaps: state => state.warning.cap,
    // warns-query
    warnsList: state => state.warns.list,
    warnsTotal: state => state.warns.total,
    warnsCaps: state => state.warns.cap,
    // device-server
    servers: state => state.device.servers,
    totalDev: state => state.device.totalDev,
    currentServer: state => state.device.curServer,
    devices: state => state.device.devices,
    // snap
    snapList: state => state.snap.list,
    snapTotal: state => state.snap.total,
    snapDetail: state => state.snap.detail,
    // locus
    locusQuery: state => state.locus.query,
    locusPeople: state => state.locus.people,
    locusCurrent: state => state.locus.currentComp
}
export default getters