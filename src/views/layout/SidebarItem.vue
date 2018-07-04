<template>
    <div class="menu-wrapper">
        <template v-for="(item,index) in routes">
            <!-- <router-link v-if="!item.hidden&&item.children.length>0" :to="item.path" :key="item.path + index">
                        <el-menu-item :index="item.path" :class="[ match(item) && 'is-active' ]" class="submenu-title-noDropdown">
                            <png-icon v-if="item.children[0].icon" :ico="item.children[0].icon"></png-icon>
                            <span class="tool-tip">{{ item.children[0].name }}</span>
                        </el-menu-item>
                    </router-link> -->

            <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0"
                         :to="(rootPath || item.path)+'/'+item.children[0].path"
                         :key="index">
                <el-menu-item :index="(rootPath || item.path)+'/'+item.children[0].path"
                              :class="{'is-active': patch(item)}"
                              class="submenu-title-noDropdown">
                    <png-icon :ico="item.children[0].icon"
                              v-if="item.children[0].icon"></png-icon>
                    {{ item.children[0].name }}
                </el-menu-item>
            </router-link>

            <el-submenu class="submenu-title"
                        v-if="!item.noDropdown&&!item.hidden"
                        :index="item.name"
                        :key="index">
                <template slot="title">
                    <png-icon :ico="item.icon"
                              v-if="item.icon"></png-icon>
                    {{item.name}}
                </template>
                <template v-for="(child,index) in item.children"
                          v-if="!child.hidden">

                    <sidebar-item class="nest-menu"
                                  v-if="child.children&&child.children.length>0"
                                  :routes='[child]'
                                  :rootPath="(rootPath || item.path)+'/'+child.path"
                                  :key="index"></sidebar-item>

                    <router-link v-else
                                 :key="index"
                                 :to="(rootPath || item.path)+'/'+child.path">
                        <el-menu-item :index="(rootPath || item.path)+'/'+child.path">
                            <png-icon :ico="child.icon"
                                      v-if="child.icon"></png-icon>
                            {{child.name}}
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
import PngIcon from '@/PngIcon'

export default {
    name: 'SidebarItem',
    props: {
        routes: {
            type: Array
        },
        rootPath: {
            type: String
        }
    },
    components: {
        PngIcon
    },
    methods: {
        patch(item) {
            let prefix = this.rootPath || item.path;
            if (item.noDropdown) {
                return this.$route.path.indexOf(prefix)>-1
            } else {
                return prefix == this.$route.path
            }
        }
    }
}
</script>