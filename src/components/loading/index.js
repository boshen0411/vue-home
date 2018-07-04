import Vue from 'vue'
import Loading from './Loading.vue'
let Load = Vue.extend(Loading)

const config = {
    bind(el, binding) {
        let loading = new Load({
            el: document.createElement('div'),
            data: {
                mes: 'josh'
            }
        });
        // 修改父级样式
        el.style.position = 'relative'
        el.loading = loading.$el
        // 插入父级
        el.appendChild(el.loading)
    },
    update(el, bindling) {
        if (bindling.oldValue == bindling.value) return;
        const flag = bindling.value
        const load = el.loading
        flag ? load.__vue__.open() : load.__vue__.close()
    }
}

export default config