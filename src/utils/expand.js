/**
 * 拓展
 */
import { ws_url } from '../config'
import filter from './filter'

export default {
    install(Vue) {

        // 忽略reject錯誤處理
        Promise.prototype.done = function(fulfilled){
            return this.then(fulfilled).catch(e => {
                // console.log('忽略了錯誤 =>', e)
            })
        }

        // 日期獲取格式化
        Date.prototype.toDate = function(){
            return new Date(this.getTime() + 288e5).toJSON().substr(0,10)
        }

        // 过滤器
        for (let k in filter){
            Vue.filter(k, filter[k])
        }

        // 扩展
        Object.assign(Vue.prototype, { $wshost: ws_url })
    }
}
