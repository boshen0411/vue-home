<template>
	<div v-loading="loading">
		<div :class="$style.upload_area"
		     @drop.prevent="dropFace">
			<label for="img-upload">
				<i class="el-icon-upload"></i>
				<p :class="$style.upload_text">
					将文件拖到此处，或
					<em>点击上传</em>
				</p>
				<p :class="$style.upload_tip">只能上传zip格式的文件</p>
			</label>
		</div>
		<ul :class="$style.upload_list">
			<li v-for="(fc,idx) in images"
			    :key="idx"
			    v-show="fc.progress<100">
				<p>
					{{fc.file.name}}
					<!-- <span @click="removeFace(idx)">
						<i class="el-icon-close"></i>
					</span> -->
				</p>
				<!-- <div :class="$style.progress">
					<i :style="`width: ${fc.progress}%`"></i>
				</div> -->
			</li>
			<li :class="$style.blank"></li>
		</ul>
		<input type="file"
		       id="img-upload"
		       hidden
		       v-show="false"
		       @change="addFace">
	</div>
</template>

<script>
import { uploadSync } from 'api/sync'
import { api } from '../../../../config.js' 

export default {
	props: ['current'],
	data() {
		return {
			images: [],
			loading: false
		}
	},
	mounted() {
		//   阻止全局响应
		document.addEventListener('dragenter', e => { e.preventDefault() })
		document.addEventListener('dragleave', e => { e.preventDefault() })
		document.addEventListener('drop', e => { e.preventDefault() })
		document.addEventListener('dragover', e => { e.preventDefault() })
	},
	methods: {
		verifyImg(file) {
			if (!file) {
				return false;
			}
			// const isLt2M = true //file.size / 1024 / 1024 < 2;
			// const isJpg = (['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type) > -1) || (file.name.indexOf('.zip') > -1);
			// const isOnce = !this.images.some(f => f.file.name == file.name && f.file.size == file.size)
			// if (!isOnce) {
			// 	this.$message.error("请勿重复上传")
			// }
			// if (!isJpg) {
			// 	this.$message.error("上传文件格式错误")
			// }
			// if (!isLt2M) {
			// 	this.$message.error("上传图片大小不得超过2M")
			// }
			// return isOnce && isJpg && isLt2M
		},
		pushImg(file) {
			if (!this.current) {
				return this.$message.warning("请选择要导入的数据对应的人口模板")
			}
			// let vf = this.verifyImg(file);
			// if (!vf) {
			// 	this.removeBlob(file)
			// 	return;
			// }
			let o = {
				file: file,
				progress: 0
			}
// return console.log(o)
			this.images.push(o)
			/* 上传图片 */
			let formData = new FormData()
			formData.append('tempId', this.current)
			formData.append('token', this.$store.state.user.token)
            formData.append('zipFile', [file][0])
            this.loading = true
            return new Promise((resolve) => {
                this.$http.post(api + '/record/add/person_record_zip', formData).then((response) => {
                    this.loading = false
                    if (response.data.code === 1000) {
                        this.$message.success('上传成功')
                    } else {
                        this.$message.error(response.data.subMsg)
                    }
                })
            })
			// uploadSync({
			// 	tempId: this.current,
			// 	files: [file]
			// }, progress => {
			// 	o.progress = Math.max(0, progress - 0.01)
			// }).then(res => {
			// 	if (res.percent == 100) {
			// 		o.progress = 100;
			// 	}

			// }).catch(e => {
			// 	console.log(e)
			// })
			/* 清除图片 */
			// this.removeBlob(file)
		},
		removeBlob(file) {
			/* 清除图片 */
			window.URL = window.URL || window.webkitURL;
			const blob = window.URL.createObjectURL(file)
			// 清除图片
			let img = new Image();
			img.src = blob;
			img.onload = () => {
				window.URL.revokeObjectURL(img.src)
			}
		},
		dropFace(e) {
			let files = e.dataTransfer.files;
			if (files.length > 0) {
				[].forEach.call(files, f => {
					this.pushImg(f)
				})
			}
		},
		addFace(e) {
			let files = e.target.files;
			if (!files.length) {
				return;
			}
			let file = files[0];
			e.target.value = ''
			this.pushImg(file)
		},
		removeFace(idx) {
			// 确认删除图片？
			this.$confirm('此操作将删除当前所选文件，是否继续？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).done(() => {
				this.images.splice(idx, 1)
			})
		},

	}
}
</script>

<style lang="scss" module>
@import '~style/basic/param';

.upload_area {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	width: 500px;
	height: 350px;
	margin: 25px auto;
	text-align: center;
	border-radius: 4px;
	color: #999;
	background-color: #f9fafc;
	border: solid 1px #c0ccda;
	cursor: pointer;
	label {
		cursor: pointer;
	}
	i {
		margin-bottom: 16px;
		font-size: 67px;
		line-height: 50px;
		color: $color-light-blue;
	}
}

.upload_text {
	margin-bottom: 10px;
	font-size: 14px;
	em {
		font-style: normal;
		color: $color-light-blue;
	}
}

.upload_tip {
	font-size: 12px;
}

.upload_list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	color: #fff;
	li {
		flex-basis: 40%;
		margin-bottom: 10px;
		&.blank {
			height: 0;
		}
	}
	p {
		font-size: 15px;
		line-height: 1.6;
		text-align-last: justify;
		span {
			color: $color-red;
			cursor: pointer;
		}
	}
	.progress {
		position: relative;
		margin-top: 5px;
		height: 3px;
		background-color: #fff;
		i {
			content: "";
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			height: 3px;
			background-color: $color-light-blue;
		}
	}
}
</style>


