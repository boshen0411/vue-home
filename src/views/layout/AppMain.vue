<template>
    <section class="app-main">
        <transition name="fade"
                    mode="out-in">
            <!-- <router-view :key="key"></router-view> -->
            <router-view/>
        </transition>
    </section>
</template>

<script>

export default {
    name: 'AppMain',
    // computed: {
    //     key() {
    //         return this.$route.name !== undefined ? this.$route.name : this.$route
    //     }
    // }
}
</script>

<style lang="scss" scoped>
.app-main {
    padding: 10px;
    min-width: 1100px;
}
</style>


