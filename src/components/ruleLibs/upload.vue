<template>
    <div class="upload">
        <label>
            <span v-if="file">{{file.name}}</span>
            <span class="ts-button" v-else>上传文件</span>
            <input type="file" id="img-upload" hidden v-show="false" @change="uploadFile">
        </label>
    </div>
</template>

<script>

export default {
    props: ['value', 'label'],
    data() {
        return {
            file: null,
            img: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
            video: ['image/jpeg']
        }
    },
    mounted () {
      this.file = this.value;
    },
    watch: {
      label() {
          this.file = null;
      }  
    },
    methods: {
        verifyImg(file) {
			if (!file) {
				return false;
			}
            const isLt2M = file.size / 1024 / 1024 < 2;
            let types = this.label=='图片' ? this.img : this.video;
            const isJpg = types.indexOf(file.type) > -1;
			const isOnce = this.file ? (file.name != this.file.name) && (file.size != this.file.size) : true;
			if (!isOnce) {
				this.$message.error("请勿重复上传")
			}
			if (!isJpg) {
				this.$message.error("上传文件格式错误")
			}
			if (!isLt2M) {
				this.$message.error("上传图片大小不得超过2M")
			}
			return isOnce && isJpg && isLt2M
		},
        uploadFile(e) {
            if (!e.target.files || !e.target.files.length) {
                return;
            }
            let file = e.target.files[0];
            let t = this.verifyImg(file);
            if (t) {
                this.file = file;
                this.$emit('update:value', file)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.upload {
    display: inline-block;
    padding-left: 15px;
}
</style>


