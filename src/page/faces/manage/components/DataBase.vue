<template>
        <section>
            <data-form :table="oldData"
                       :current="current"
                       @close="closeTable"
                       v-show="showTable"></data-form>
            <div class="empty" v-if="!showTable">
                <el-button type="primary"
                           @click="getTable"
                           v-if="current">开始同步</el-button>
                <p v-else>
                    请从左侧选定要同步数据所属来源地区。
                </p>
            </div>
        </section>
</template>

<script>
import { getTempDetail } from 'api/template'

import DataForm from './DataForm'

export default {
    props: {
        current: String
    },
    components: {
        DataForm
    },
    data() {
        return {
            oldData: {},
            showTable: false
        }
    },
    watch: {
        current() {
            this.showTable =false;
        }
    },
    methods: {
        getTable() {
            if (!this.current) {
                return
            }
            getTempDetail(this.current).done(res => {
                this.oldData = res;
                // this.oldData.tempId = this.current;
                this.showTable = true;
            })
        },
        closeTable() {
            this.showTable = false;
        }
    }
}
</script>

<style lang="scss" scoped>

.empty {
    padding: 0 10px;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    p {
        color: #bfcbd9;
    }
}
</style>


