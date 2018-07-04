<template>
    <section>
        <div class="operate">
            <section class="left">
                <div class="form">
                    <div>
                        <label for="form-name"
                               class="head">姓&emsp;&emsp;名</label>
                        <label for="form-name"
                               class="input">
                            <svg-icon ico="search"
                                      class="icon"
                                      width="20px"
                                      height="20px"></svg-icon>
                            <input type="text"
                                   id="form-name"
                                   v-model="name"
                                   placeholder="请输入姓名">
                        </label>
                    </div>
                    <div>
                        <label for="form-identity"
                               class="head">身份证号</label>
                        <label for="form-identity"
                               class="input">
                            <svg-icon ico="search"
                                      class="icon"
                                      width="20px"
                                      height="20px"></svg-icon>
                            <input type="text"
                                   id="form-identity"
                                   maxlength="18"
                                   v-model="idCard"
                                   placeholder="请输入身份证号">
                        </label>
                    </div>
                </div>
                <div class="global" @click="setGlobal">
                    <label class="icon-checkbox"
                           :class="{ 'checked': globalFlag }">
                    </label>
                    <label for="form-global">全库搜索</label>
                    <!-- <input type="checkbox"
                               id="form-global"
                               v-model="globalFlag"> -->
                </div>
                <div class="upload">
                    <div v-if="!imgs.length"
                         class="btn"
                         @click="$refs.upload.open()"></div>
                    <figure v-else
                            class="img">
                        <img :src="imgs[0].blob">
                    </figure>
                </div>
                <div class="search">
                    <div @click="search">搜索
                    </div>
                    <div @click="reset">重置</div>
                </div>
            </section>
            <!-- </form> -->
            <section class="right">
                <router-link class="add"
                             tag="div"
                             :to="'/faces/search/add'">
                    <svg-icon ico="add_file"
                              class="icon"
                              width="36px"
                              height="30px">
                    </svg-icon>
                    <span>添加档案</span>
                </router-link>
            </section>
            <popup-upload ref="upload" @pipeImgs="getImgs" :current="current"></popup-upload>
        </div>
        <record :turnPage="search" :loading="loading" :picData="picData" :isPicData="isPicData"></record>
    </section>
</template>

<script>

export default {
    props: {
        current: String
    },
    components: {
        popupUpload: () => import('./PopupUpload'),
        record: () => import('./Record')
    },
    data() {
        return {
            globalFlag: false,
            imgs: [],
            name: "",
            idCard: null,
            loading: false,
            picData: [],
            isPicData: false
        }
    },
    methods: {
        getImgs(imgs) {
            this.imgs = imgs;
        },
        setGlobal() {
            this.$router.push('/faces/search')
            window.sessionStorage.removeItem('current')
            this.globalFlag = !this.globalFlag;
            if (this.globalFlag) {
                this.$emit("update:current", "")
            }
        },
        search(pg) {
            console.log('hello-------')
            if (!this.globalFlag && !this.current) {
                this.$message.warning("请在左侧树形菜单选择模板")
                return;
            }
            this.loading = true;
            let arg = {
                pageSize: 8,
                faces : []
            };
            if (this.name) {
                arg.name = this.name
            }
            if (this.idCard) {
                arg.idCard = this.idCard
            }
            if (typeof pg == 'number') {
                arg.pageNum = pg - 1;
            }
            if (!this.globalFlag) {
                // 模板下搜索
                arg.tempId = this.current
            }
            let searchList = this.$refs.upload.searchList
            if ( this.imgs.length > 0 ) {
                this.isPicData = true
                if (searchList && searchList.length > 0) {
                    this.picData = searchList
                } else {
                    this.$message.warning('暂无数据')
                }
                this.loading = false
            } else {
                this.picData = false
                this.$store.dispatch('document/getListByface', arg).then(() => {
                    this.loading = false;
                })
            }
            // if (this.imgs){
            //     for(let f in this.imgs){
            //         arg.faces.push(this.imgs[f].file)
            //     }
            //     console.log(arg, 'aaaaaaaaaaaaaaaaa')
            //     this.$store.dispatch('document/getListByface', arg).then(() => {
            //     this.loading = false;
            //   })
            // }else{
            //     console.log('imgs--->' + this.imgs)
            //     this.$store.dispatch('document/getList', arg).then(() => {
            //     this.loading = false;
            //   })
            // }
        },
        reset() {
            this.name = "";
            this.idCard = null;
            this.imgs = [];
            this.isPicData = false
            this.$store.dispatch('document/emptyList')
        }
    },
    mounted() {
        let cur = sessionStorage.getItem('current')
        if (!cur) {
            this.globalFlag = true
        };
    }
}
</script>

<style lang="sass" scoped>
@import './Operate';
</style>
