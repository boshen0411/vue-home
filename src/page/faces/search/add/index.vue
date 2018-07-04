<template>
    <div :class="$style.add_wrap" v-loading="loading">
        <div :class="$style.edit_info">
            <h3>基本信息</h3>
            <ul :class="$style.form">
                <li :class="[hasEmpty && !docTmp && $style.warn]">档案类型：
                    <el-cascader size="mini"
                                 :class="$style.cascader"
                                 :options="areas"
                                 v-model="docTmp" />
                </li>
                <li :class="[hasEmpty && !ethnicity && $style.warn]">种族：
                    <el-select :class="$style.select"
                               v-model="ethnicity"
                               size="mini"
                               placeholder="">
                        <el-option v-for="(item,idx) in ethnicities" :key="idx" 
                        :label="item.label" :value="item.label"></el-option>
                    </el-select>
                </li>
                <li :class="[hasEmpty && !name && $style.warn]">姓名：
                    <input :class="$style.input"
                           type="text"
                           v-model="name"
                           placeholder="请输入姓名">
                </li>
                <li :class="[hasEmpty && !nation && $style.warn]">民族：
                    <el-select :class="$style.select"
                               v-model="nation"
                               size="mini"
                               placeholder="">
                        <el-option v-for="(item,idx) in nations" :key="idx" 
                        :label="item.label" :value="item.label"></el-option>
                    </el-select>
                </li>
                <li :class="[hasEmpty && !gender && $style.warn]">性别：
                    <el-select :class="$style.select"
                               v-model="gender"
                               size="mini"
                               placeholder="">
                        <el-option v-for="(item,idx) in genders" :key="idx" 
                        :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </li>
                <li :class="[hasEmpty && !idCard && $style.warn]">身份证号码：
                    <input :class="$style.input"
                           type="text"
                           maxlength="18"
                           v-model="idCard"
                           placeholder="请输入身份号">
                </li>
                
                <li :class="[hasEmpty && !born && $style.warn]">
                    出生日期：
                    <el-date-picker size="mini"
                                    :class="$style.picker"
                                    :editable="false"
                                    v-model="born"
                                    placeholder="年-月-日" />
                </li>
                <li :class="[hasEmpty && !signature && $style.warn]">签发机关：
                    <input :class="$style.input"
                           type="text"
                           v-model="signature"
                           placeholder="请输入签发机关名称">
                </li>
                <li :class="[hasEmpty && !address && $style.warn]">住址：
                    <input :class="$style.input"
                           type="text"
                           v-model="address"
                           placeholder="请输入地址">
                </li>
                <li :class="[(hasEmpty && (!start||!end)) && $style.warn]">有效期限：
                    <el-date-picker size="mini"
                                    :class="$style.picker"
                                    :editable="false"
                                    v-model="start"
                                    placeholder="年-月-日" /> &emsp;至&emsp;
                    <el-date-picker size="mini"
                                    :class="$style.picker"
                                    :editable="false"
                                    v-model="end"
                                    placeholder="年-月-日" />
                </li>
                <li :class="$style.mark">
                    <span>备注：</span>
                    <textarea v-model="remark"
                              placeholder="请输入备注"></textarea>
                </li>
                <li :class="[hasEmpty && faces.length<1 && $style.warn]">
                    人脸照片数量：{{faces.length}}
                    <!-- <label :class="$style.add"
                                               for="img-upload">添加</label> -->
                    <span :class="$style.add"
                          @click="showUpload=true"
                          v-show="!showUpload&&faces.length<10">添加</span>
                </li>
            </ul>
            <p :class="$style.button">
                <button :class="$style.cancel"
                        @click="cancel">取消</button>
                <button @click="save">保存</button>
            </p>
        </div>
        <!-- 图片上传框 -->
        <div :class="$style.edit_info"
             v-show="showUpload">
            <h3>人脸照片</h3>
            <section :class="$style.upload_block">
                <div :class="$style.upload_area"
                     @drop.prevent="dropFace">
                    <label for="img-upload">
                        <i class="el-icon-upload"></i>
                        <p :class="$style.upload_text">
                            将文件拖到此处，或
                            <em>点击上传</em>
                        </p>
                        <p :class="$style.upload_tip">只能上传jpg/png文件，且不超过500kb</p>
                    </label>
                </div>
                <div :class="$style.upload_list">
                    <p v-for="(fc,idx) in faces"
                       :key="idx">
                        {{fc.name}}
                        <span @click="removeFace(idx)">
                            <i class="el-icon-close"></i>
                        </span>
                    </p>
                </div>
            </section>
        </div>
        <input type="file"
               id="img-upload"
               hidden
               v-show="false"
               @change="addFace">
    </div>
</template>

<script>

export default {
    data() {
        return {
            ethnicity: '黄种人',
            ethnicities: [
                { label: '黄种人' },
                { label: '白种人' },
                { label: '黑种人' }
            ],
            name: "",
            idCard: null,
            gender: 'M',
            genders: [
                { label: '男', value: 'M' },
                { label: '女', value: 'F' }
            ],
            signature: "",
            nation: '汉族',
            nations: [
                { label: '汉族' },
                { label: '藏族' },
                { label: '傣族' }
            ],
            start: '',
            end: '',
            born: '',
            faces: [],
            address: "",
            remark: "",
            showUpload: false,
            hasEmpty: false,
            docTmp: null,
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
    computed: {
        areas() {
            return this.$store.getters.areas
        }
    },
    methods: {
        verifyImg(file) {
            if (!file) {
                return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            const isJpg = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].indexOf(file.type) > -1;
            const isOnce = !this.faces.some(f => f.name == file.name && f.size == file.size)
            if (!isOnce) {
                this.$message.error("请勿重复上传")
            }
            if (!isJpg) {
                this.$message.error("上传图片格式错误")
            }
            if (!isLt2M) {
                this.$message.error("上传图片大小不得超过2M")
            }
            return isOnce && isJpg && isLt2M
        },
        pushImg(file) {
            if (this.faces.length == 10) {
                this.$message.warning("最多添加10张图片")
                return;
            }
            this.faces.push(file)
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
            if (this.faces.length == 10) {
                this.$message.warning("最多添加10张图片")
                return;
            }
            let files = e.dataTransfer.files;
            if (files.length > 0) {
                [].forEach.call(files, f => {
                    let verify = this.verifyImg(f)
                    if (verify) {
                        this.pushImg(f)
                    }
                })
            }
        },
        addFace(e) {
            if (this.faces.length == 10) {
                this.$message.warning("最多添加10张图片")
                return;
            }
            let files = e.target.files;
            if (!files.length) {
                return;
            }
            let file = files[0];
            let verify = this.verifyImg(file);
            if (verify) {
                this.pushImg(file)
            }
        },
        removeFace(idx) {
            // 确认删除图片？
            this.$confirm('此操作将删除当前所选图片，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).done(() => {
                this.faces.splice(idx, 1)
            })
        },
        cancel() {
            // this.$router.go(-1)
            this.$router.push('/faces/search/')
        },
        verifyArgs() {
            if (this.start instanceof Date) {
                this.start = this.start.toDate()
            }
            if (this.end instanceof Date) {
                this.end = this.end.toDate()
            }
            if (this.born instanceof Date) {
                this.born = this.born.toDate()
            }
            if (!!this.docTmp && !!this.name && !!this.idCard && !!this.gender && !!this.start && !!this.end && !!this.nation && !!this.address && !!this.ethnicity && !!this.signature && !!this.born) {
                this.hasEmpty = false;
                return true
            } else {
                this.hasEmpty = true;
                return false;
            }
        },
        save() {
            if (!this.docTmp || !this.docTmp.length) {
                this.$message.warning("请选择档案类型")
                return;
            }
            console.log('docTmp--->' + this.docTmp)
            console.log('docTmp length--->' + this.docTmp.length)
            console.log('tempId--->' + this.docTmp[this.docTmp.length-1])
            // 检查必填参数
            let v = this.verifyArgs()
            // 提交新建
            if (v && !!this.faces.length) {
                // 设置参数
                let arg = {
                    name: this.name,
                    idCard: this.idCard,
                    validPeriod: this.start + '~' + this.end,
                    nation: this.nation,
                    address: this.address,
                    ethnicity: this.ethnicity,
                    location: this.signature,
                    dateOfBirth: this.born,
                    facePictures: this.faces,
                    gender: this.gender,
                    tempId: this.docTmp[this.docTmp.length-1]
                }
                if (this.remark) {
                    arg.remark = this.remark
                }
                let rex = /^[1-9]\d{5}[1-2]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/
                let idCheck = rex.test(arg.idCard)
                if (idCheck) {
                    this.loading = true
                    this.$store.dispatch('document/createItem', arg).done(() => {
                        this.loading = false
                        this.$router.push('/faces/search/')
                    })
                } else {
                    this.$message.warning('身份证格式不正确，请重新输入')
                }
            } else if (!v) {
                this.$message.error("请填写完整信息")
            } else {
                this.$message.error("请至少添加一张人脸照片")
            }
        }
    }
}
</script>

<style lang="scss" module>
@import './index.scss';
</style>

