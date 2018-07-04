<template>
    <div class="container" v-show="show">
        <section class="popup" v-loading="loading">
            <ul class="imgs">
                <li v-for="(item,index) in list" :key="index">
                    <p>{{ item.name }}</p>
                    <figure @click="singleOperate(index)">
                        <img :src="item.blob" alt="上传的图片">
                        <div class="uploadStatus"
                            :class="{
                                'loaded': item.uploadStatus == 0,
                                'uploading': item.uploadStatus == 1,
                                'success': item.uploadStatus == 2,
                                'defeated': item.uploadStatus == 3
                            }" 
                        >
                            <figure class="del" v-if="item.uploadStatus == 0">
                                <svg-icon ico="delete_white" width="30px" height="30px"></svg-icon>
                            </figure>
                        </div>
                    </figure>
                </li>
                <!-- <li class="upload" v-if="list.length != 10">
                    <p>上传图片</p>
                    <label @click="label(false)"></label>
                </li> -->
            </ul>
            <input 
                type="file" 
                v-show="false" 
                @change="upload" 
                multiple 
                accept="image/png, image/jpeg, image/gif"
                ref="upload"
            >
            <div class="btns">
                <span @click="hidden">取消</span>
                <!-- <span>
                    <label @click="label" ref="reUpload">重新上传</label>
                </span> -->
                <span class="confirm" @click="confirm">确定</span>
            </div>
        </section>
    </div>
</template>

<script>
import { postForm } from 'fetch';

export default {
    data() {
        return {
            show: false,
            list: [],
            reUpload: true,
            searchList: [],
            loading: false
        }
    },
    props: {
        current: String
    },
    methods: {
        open() {
            this.label()
        },
        hidden() {
            this.show = false;
            this.list = [];
        },
        singleOperate(index) {
            const item = this.list[index];
            if (item.uploadStatus == 0) {
                this.del(index);
            } else if (item.uploadStatus == 3) {
                this.resend(item);
            }
        },
        resend(item) {
            let fd = new FormData();
            fd.append(item.name, item.file)
            const args = {
                file: fd
            }
            this.send(args)
        },
        del(index) {
            this.list.splice(index, 1)
            if(!this.list.length) this.hidden()
        },
        extract(file) {
            // 提取文件名、blob对象、文件
            if (!file) return false;
            const { name, type, size } = file;
            // 检测是否已存在该图片
            // 文件是否是图片
            // 大小是否小于2M
            const vert = {
                noSame: () => !this.list.some(item => item.name == name && item.size == size),
                isJPG: () => ['image/png', 'image/jpeg', 'image/gif'].indexOf(type) > -1,
                isLt2M: () => size / 1024 / 1024 < 2
            }
            const reason = {
                noSame: '已存在',
                isJPG: '不是图片',
                isLt2M: '大于2M'
            }
            for(let v in vert) {
                const flag = vert[v]();
                if (!flag) {
                    alert(`${name}上传失败，因为${name}${reason[v]}`)
                    return false
                }
            }
            // 获取blob对象
            window.URL = window.URL || window.webkitURL;
            const blob = window.URL.createObjectURL(file);
            // 增加上传状态uploadStatus
            // 0: 未上传
            // 1: 正在上传中
            // 2：上传成功
            // 3：上传失败
            const uploadStatus = 0;
            return {
                name,
                size,
                file,
                blob,
                uploadStatus
            }
        },
        label(flag = true) {
            this.reUpload = flag
            this.$refs.upload.click();
        },
        upload(e) {
            if(this.reUpload) this.list = [];
            // 获取上传的文件
            let files = e.target.files || e.dataTransfer.files;
            // 限定10张图片
            if (files.length + this.list.length > 10) return this.$message.error('上传失败！只能上传10张图片')
            // 从事件对象中提取文件名、blob对象、文件
            let list = [].map.call(files,file => this.extract(file))
            list = list.filter(item => item)
            // 弹出弹框
            if (list.length) this.show = true;
            // 清空input的数据，不然无法监听到change事件
            e.target.value = null;
            // 再上传图片
            this.list = this.list.concat(list);
            console.log(list)
        },
        async confirm() {
            if (!this.list.length) { return }
            for(let i in this.list) {
                await this.send(this.list[i]);
            }
            const status = this.list.filter(item => item.uploadStatus == 2)
            // 当上传成功的数量与图片数一致时，关闭弹窗
            if (status.length == this.list.length) {
                this.$emit('pipeImgs',this.list)
                this.hidden();
            }
        },
        send(item) {
            this.searchList = []
            this.loading = true
            return new Promise(resolve => {
                const { file } = item;
                postForm('/record/query/list/byFace',{
                    faces: file,
                    token: this.$store.getters.token,
                    tempId: this.current
                }).then(res => {
                    this.loading = false
                    this.searchList = res.list
                    item.uploadStatus = 2;
                    resolve('')
                }).catch(e => {
                    this.loading = false
                    item.uploadStatus = 3;
                    resolve('')
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import './PopupUpload';
</style>

