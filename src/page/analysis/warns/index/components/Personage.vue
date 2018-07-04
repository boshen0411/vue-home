<template>
    <div :class="$style.personage">
        <h3>布控名单</h3>
        <div class="ui-scrollbar" :class="$style.wrap">
            <ul :class="$style.list"
                v-if="list.length"
                class="ui-scrollbar">
                <li :key="idx"
                    v-for="(o,idx) in list">
                    <input type="checkbox" @click="toggle('locus')"/>
                    <label>{{o.name}}</label>
                    <i @click="remove(o)"></i>
                </li>
            </ul>
            <div :class="$style.empty"
                 v-else>
                <p>人物轨迹列表为空</p>
                <p>请在右侧搜索并添加</p>
            </div>
            <button class="ts-button" @click="toggle('person-query')">添加</button>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
      list() {
          return this.$store.getters.locusPeople
      }  
    },
    methods: {
        toggle(str) {
            this.$store.dispatch('locus/setCurrent',str)
        },
        remove(o) {
            this.$confirm('确定移除该记录麽？', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).done(() => {
                this.$store.dispatch('locus/popPeople',o)
            })
        }
    }
}
</script>
<style lang="scss" module>
@import '~style/basic/param';
.personage {
    display: inline-block;
    width: 100%;
    // min-height: calc(100vh - 104px);
    vertical-align: top;
    h3 {
        width: 120px;
        height: 40px;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        border: 1px $color-light-blue solid;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
}

.wrap {
    height: calc(100vh - 224px);
    overflow-y: auto;
    text-align: center;
}

.list {
    margin-top: 20px;
    max-height: calc(100% - 140px);
    overflow-y: auto;
    li {
        display: flex;
        position: relative;
        padding: 15px 10px;
        text-align: left;
        &:hover {
            background: rgba(#015dbc, .25);
        }
    }
    input {
        position: absolute;
        top: 0;
        left: 10px;
        right: 0;
        bottom: 0;
        z-index: 9;
        width: calc(100% - 44px);
        height: 100%;
        opacity: 0;
        cursor: pointer;
        &:checked+label:before {
            background: url('assets/icons/checked.png') no-repeat center;
            background-size: contain;
        }
    }
    label {
        display: inline-block;
        width: calc(100% - 22px);
        vertical-align: middle;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:before {
            content: '';
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 10px;
            vertical-align: text-bottom;
            border: solid 1px #0158b4;
        }
    }
    i {
        display: inline-block;
        width: 21px;
        height: 21px;
        vertical-align: middle;
        background: url('assets/icons/cancel.png') no-repeat center;
        background-size: contain;
        cursor: pointer;
        &:hover {
            opacity: .8;
        }
    }
}

.empty {
    padding: 10px 0;
    text-align: center;
    font-size: 14px;
    p {
        margin: 20px 0;
        color: #97a8be;
    }
}
</style>
