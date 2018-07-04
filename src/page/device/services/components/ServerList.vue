<template>
    <div :class="$style.server_list">
        <div :class="$style.header">
            <h3>服务列表</h3>
        </div>
        <div :class="$style.search">
            <p>
                <svg-icon ico="search"
                          width="19.4px"
                          height="19.4px" />
                <input type="text"
                       placeholder="请输入内容"
                       v-model="searchTxt">
            </p>
            <a @click="search">搜索</a>
        </div>
        <div :class="$style.list">
            <p :class="$style.nav">
                <span :class="[ show && $style.show ]"
                      @click="show = !show">比对服务</span>
                <!-- <i @click="create"></i> -->
            </p>
            <el-collapse-transition>
                <ul v-if="show"
                    class="transition-box ui-scrollbar">
                    <li v-for="(o,i) in list"
                        :key="i"
                        v-show="!matching || (matching&&o.isMatched)"
                        :class="[ false ? $style.red : $style.green ]">
                        <p :class="[o.id==current && $style.active]"
                        @click="setCurrent(o)">{{ o.name }}</p>
                        <span>
                            <i @click="edit(o)"></i>
                            <!-- <i :class="$style.link"></i> -->
                        </span>
                    </li>
                </ul>
            </el-collapse-transition>
            <p :class="$style.nav">
                <span
                     :class="[ show2 && $style.show ]"
                    @click="show2 = !show2"
                >身份认证服务</span>
            </p>
            <!-- <el-collapse-transition>
                <ul v-if="show2" class="transition-box ui-scrollbar">
                    <li v-for="(o,i) in list"
                        :key="i"
                        :class="$style.green"
                    >
                        <p>{{ o.name }}</p>
                        <span>
                            <i></i>
                        </span>
                    </li>
                </ul>
            </el-collapse-transition> -->
        </div>
    </div>
</template>
<script>
export default {
    props: ['create', 'edit', 'push'],
    data() {
        return {
            show2: false,
            show: true,
            searchTxt: null,
            matching: false
        }
    },
    computed: {
        list() {
            const r = this.$store.getters.servers;
            r && r.length && this.push(r[0].url)
            return r
        },
        current() {
            return this.$store.getters.currentServer
        }
    },
    methods: {
        search() {
            if (!this.searchTxt) {
                this.matching = false;
                return;
            }
            this.matching = true;
            this.show = false;
            this.list.forEach(s => {
                s.isMatched = (s.name.indexOf(this.searchTxt) > -1);
            })
            this.show = true;
        },
        setCurrent(o) {
            if (this.current == o.id) return;
            this.$store.dispatch('device/getDevices', o.id)
            this.push(o.url)
            
        }
    }
}
</script>
<style lang="scss" module>
@import '~style/basic/param';

.server_list {
    display: inline-block;
    width: 300px;
    height: 100%;
    vertical-align: top;
    color: #fff;
    background: $color-dark-blue;
}

.header {
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

.search {
    margin: 20px 0;
    padding-left: 10px;
    font-size: 0;
    p {
        display: inline-block;
        width: 238px;
        padding: 10px;
        vertical-align: middle;
        border-radius: 4px;
        background: $color-deep-blue;
    }
    input {
        display: inline-block;
        width: calc(100% - 40px);
        margin-left: 10px;
        vertical-align: middle;
        font-size: 14px;
        color: #fff;
        background: transparent;
    }
    a {
        padding: 5px 10px;
        vertical-align: middle;
        font-size: 16px;
        cursor: pointer;
        &:hover {
            opacity: .8;
        }
    }
}

.list {
    ul {
        // height: calc(100vh - 246px);
        overflow-y: auto;
    }
    li {
        padding: 8px 0 8px 42px;
        font-size: 0;
        &:before {
            content: '';
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 10px;
            vertical-align: middle;
            border-radius: 50%;
        }
        &.green {
            &:before {
                background-color: $color-green;
            }
            .link {
                background-image: url('assets/icons/unconnected.png');
            }
        }
        &.red {
            &:before {
                background-color: $color-red;
            }
            .link {
                background-image: url('assets/icons/connected.png');
            }
        }
        p,
        input,
        span {
            display: inline-block;
            vertical-align: middle;
        }
        input,
        p {
            width: calc(100% - 82px);
            padding-right: 1em;
            font-size: 14px;
            color: #fff;
            background: transparent;
        }
        p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
            &.active {
                color: $color-light-blue;
            }
        }
        i {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: no-repeat center;
            background-size: contain;
            cursor: pointer;
            &:hover {
                opacity: .8;
            }
            &:first-child {
                margin-right: 10px;
                background-image: url('assets/icons/edit.png');
            }
        }
    }
    label {
        vertical-align: middle;
    }
}

.nav {
    padding: 8px 10px;
    font-size: 14px;
    span {
        display: inline-block;
        width: 245px;
        cursor: pointer;
        &:hover {
            opacity: .8;
        }
        &:before {
            content: url('assets/icons/level2_add.png');
            display: inline-block;
            width: 21px;
            height: 21px;
            margin-right: 10px;
            vertical-align: bottom;
        }
        &.show:before {
            content: url('assets/icons/level2_minus.png');
        }
    }
    i {
        display: inline-block;
        width: 28px;
        height: 22px;
        vertical-align: middle;
        background: url('assets/icons/server_icon.png') no-repeat center;
        background-size: contain;
        cursor: pointer;
        &:hover {
            opacity: .8;
        }
    }
}
</style>

