<template>
    <el-menu
        mode="vertical"
        unique-opened
        :collapse="fold"
        :default-active="$route.path"
    >
        <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
    props: [ 'fold' ],
    components: {
        SidebarItem
    },
    computed: {
        ...mapGetters([
            'permission_routers'
        ])
    }
}
</script>