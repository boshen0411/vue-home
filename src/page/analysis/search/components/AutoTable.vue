<template>
    <section class="table">
        <ul class="table-head">
            <li v-for="(label,idx) in labels" 
                :key="idx"
                :style="{ width: `${100*widths[idx]/totalWidth}%` }">
                {{ label }}
            </li>
        </ul>
        <section v-if="data.length" class="table-body ui-scrollbar">
            <template v-for="(inf,idx) in data">
                <ul :key="idx" @click="$set(active,idx,!active[idx])">
                    <li :class="{ 'isHTML': isHTML[propIdx] }"
                        v-for="(prop,propIdx) in props" 
                        :key="prop"
                        :style="{ width: `${100*widths[propIdx]/totalWidth}%` }">
                        <!-- 有prop属性的slot渲染 -->
                        <template v-if="prop">
                            <!-- 当含有isHTML属性时，使用v-html渲染，否则以v-text进行渲染 -->
                            <template v-if="isHTML[propIdx]">
                                <span v-html="inf[prop] || '无'"></span>
                            </template>
                            <template v-else>
                                {{ inf[prop] }}
                            </template>
                        </template>
                        <!-- 没有prop属性的slot，将其子元素进行渲染 -->
                        <template v-else>
                            <cell :idx="idx" :propIdx="propIdx" :key="idx"></cell>
                        </template>
                    </li>
                </ul>
                <pull-drop v-show="active[idx]" :key="idx" :idx="idx"></pull-drop>
            </template>
        </section>
    </section>
</template>

<script>
// slot标签属性有
    // width：指定宽度，无需单位
    // label：指定表头名
    // prop：指定属性key
// 如果slot没有prop属性，则默认渲染其子组件
// 如果slot有prop属性时
    // 有isHtml属性，则默认以v-html渲染该prop属性值，否则以v-text渲染该prop属性值
export default {
    components: {
        Cell: {
            props: {
                propIdx: {  // 为了对应slot的索引
                    type: [String,Number],
                    default: ''
                },
                idx: {  // 为了对应行的索引
                    type: [String,Number],
                    default: ''
                }
            },
            render(h) {
                // $parent为当前父组件AutoTable
                // 筛选出所有slots
                const getSlot = this.$parent.getSlot
                const slots = getSlot(this.$parent.$slots.default)
                // 选出slot对应索引的节点的子组件
                const doms = getSlot(slots[this.propIdx].data.scopedSlots.default(this.idx))
                return h('div',doms)
            }
        },
        PullDrop: {
            props: {
                idx: {  // 为了对应行的索引
                    type: [String,Number],
                    default: ''
                }
            },
            render(h) {
                // $parent为当前父组件AutoTable
                const slots = this.$parent.$scopedSlots.drop
                return h('section',slots(this.idx))
            }
        }
    },
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        },
    },
    data() {
        return {
            labels: [],
            props: [],
            cur: 1,
            totalWidth: 0,
            active: {}  // 用于显隐下拉内容判断
        }
    },
    mounted() {

        this.init();
    },
    methods: {
        init() {
            // 设置页码
            this.cur = this.curPage;
            // 设置表头
            this.labels = this.getAttrs('label')
            // 设置每列对应属性名
            this.props = this.getAttrs('prop')
            // 设置每列宽度
            this.widths = this.getAttrs('width')
            this.widths.map(w => this.totalWidth += w - 0)
            // 筛选出需要用v-html进行渲染的列
            this.isHTML = this.hadAttrs('isHTML')
        },
        getSlot(slots) {
            return slots.filter(item => item.tag)
        },
        hadAttrs(attr) {
            const slots = this.getSlot(this.$slots.default)
            return slots.map(item => item.data.attrs[attr] !== undefined)
        },
        getAttrs(attr) {
            // 先筛选掉没标签的slot，再获取slot的指定属性
            const slots = this.getSlot(this.$slots.default)
            return slots.map(item => item.data.attrs[attr] || '');
        }
    }
}
</script>

<style lang="scss" scoped>

@import '~style/basic/param';

.table {
    background: $color-dark-blue;
    ul {
        > li {
            display: inline-block;
            vertical-align: top;
            color: #fff;
            text-align: center;
        }
    }
}

.table-head {
    background: $color-deep-blue;
    height: 60px;
    line-height: 60px;
    > li {
        font-size: 16px;
    }
}

.table-body {
    overflow-y: auto;
    min-height: 50px;
    max-height: 400px;
    > ul {
        height: 50px;
        &:hover {
            background: $color-light-blue;
        }
        > li {
            height: 100%;
            font-size: 14px;
            > span {
                vertical-align: middle;
                font-size: 14px;
            }
            &:not(.isHTML) {
                line-height: 50px;
            }
            &.isHTML {
                display: inline-table;
                > span {
                    display: table-cell;
                    line-height: 18px;
                }
            }
            > div {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
            }
        }
    }
}
</style>