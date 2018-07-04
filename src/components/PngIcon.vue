<template>
    <figure class="png-icon" :style="`width:${width};height:${height}`">
        <img :src="icon">
    </figure>
</template>

<script>
export default {
    name: 'svg-icon',
    props: {
        ico: {
            type: String
        },
        width: {
            type: String,
            default: '32px'
        },
        height: {
            type: String,
            default: '32px'
        }
    },
    computed: {
        icon() {
            return require(`assets/nav/${this.ico}.png`)
        }
    }
}
</script>

<style lang="scss" scoped>
.png-icon {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    img {
        display: inline-block;
        vertical-align: top;
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
        border: none 0;
        outline: none 0;
    }
}
</style>

