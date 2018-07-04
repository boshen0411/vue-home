<template>
    <section class="ui-scrollbar">
        <!-- <p>ID：{{details.id}}</p> -->
        <p>名称：{{details.name}}</p>
        <p>IP：{{details.ip}}</p>
        <p>PORT：{{details.port}}</p>
        <p>URL：{{details.url}}</p>
        <p>经度：{{details.longitude}}</p>
        <p>纬度：{{details.latitude}}</p>
        <p>位置名称：{{details.addr}}</p>
    </section>
</template>

<script>
export default {
    props: ['details'],
}
</script>

<style lang="scss" scoped>
section {
    height: calc(100% - 110px);
    padding: 0 20px;
    margin-top: 10px;
    overflow-y: auto;
}

p {
    margin: 1em 0;
}
</style>


