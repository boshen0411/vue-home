<template>
    <svg class="svg-icon" aria-hidden="true" :style="`width:${width};height: ${height}`">
         <use :xlink:href="`#ico-${ico}`"></use> 
    </svg>
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
            default: '1em'
        },
        height: {
            type: String,
            default: '1em'
        }
    }
}
</script>

<style lang="scss" scoped>
.svg-icon {
    display: inline-block;
    // vertical-align: -0.15em;
    // width: 1em;
    // height: 1em;
    vertical-align: middle;
    // width: 32px;
    // height: 32px;
    fill: currentColor;
    overflow: hidden;
}
</style>

