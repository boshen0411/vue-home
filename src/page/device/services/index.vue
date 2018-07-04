<template>
    <div :class="$style.server_block">
        <server-list :edit="edit" :create="create" :push="toggleLink"/>
        <server-data :link="link" />
        <edit-equip v-if="show" :info="equipInfo" @close="show = false"/>
    </div>
</template>
<script>
    import ServerList from './components/ServerList'
    import ServerData from './components/ServerData'


    export default {
        components: { 
            ServerList, 
            ServerData, 
            EditEquip: () => import('./components/EditEquip')
        },
        data(){
            return {
                show: false,
                equipInfo: null,
                /* equipInfo: {
                    name: null,
                    serialNumber: null,
                    ip: null,
                    port: null
                    // type: null,
                    // keyword: Object
                }, */
                link: null
            }
        },
        beforeMount () {
          if (!this.$store.getters.servers || !this.$store.getters.servers.length) {
              this.$store.dispatch('device/getServers')
          }  
        },
        methods: {
            create() {
                // 创建比对服务
                this.show = true;
            },
            edit(o){
                // 修改服务参数
                this.show = true;
                this.equipInfo = o;
                // TODO:传入参数
                // 如有ID或序列号则为编辑
            },
            toggleLink(x){
                this.link = x
            }
        }
    }
</script>
<style lang="scss" module>
    .server_block {
        height: calc(100vh - 88px);
        font-size: 0;
    }
</style>
