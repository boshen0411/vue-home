<template>
    <ul :class="$css.ignore">
        <span v-if="!remark">暂无数据</span>
        <template v-else>
            <li>
                <p>{{remark}}</p>
                <!-- <p>档案ID：1532687</p>
                <p>双胞胎</p> -->
            </li>
        </template>
    </ul>
</template>
<script>
    export default {
        props: [ '$css','remark' ],
        data() {
            return {
                list: []
            }
        }
    }
</script>
