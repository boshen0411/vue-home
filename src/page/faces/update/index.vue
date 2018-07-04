<template>
    <div :class="$style.update_block">
        <div :class="$style.side_tree">
            <side-tree :currentNode="current"
                       :setCurrent="setCurrent" />
        </div>
        <sync-update :$css="$style"
                     :current="current" />
    </div>
</template>
<script>
    import SideTree from '@/searchTree/SideTree';
    import SyncUpdate from './components/SyncUpdate';

export default {
    components: {
        SideTree,
        SyncUpdate
    },
    data() {
        return {
            current: ""
        }
    },
    methods: {
        setCurrent(id) {
            if (this.current == id) {
                return;
            }
            this.current = id;
        }
    }
}
</script>
<style lang="scss" src="./style" module/>
