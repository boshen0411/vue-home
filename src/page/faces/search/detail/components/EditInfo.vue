<template>
    <div :class="$style.edit_info">
        <h3>基本信息</h3>
        <ul :class="$style.form">
            <li :class="[hasEmpty && !docTmp && $style.warn]">档案类型：
                <el-cascader size="mini"
                             :class="$style.cascader"
                             :options="areas"
                             v-model="docTmp" />
            </li>
            <!-- <li>民族：{{details.nation}}</li> -->
            <li :class="[hasEmpty && !details.nation && $style.warn]">
                民族：
                <el-select :class="$style.nat"
                           v-model="details.nation"
                           size="mini"
                           placeholder="">
                    <el-option v-for="(item,idx) in nations" :key="idx" 
                        :label="item.label" :value="item.label"></el-option>
                </el-select>
            </li>
            <li>档案ID：{{details.id}}</li>
            <!-- <li>种族：{{details.ethnicity}}</li> -->
            <li :class="[hasEmpty && !details.ethnicity && $style.warn]">
                种族：
                <el-select :class="$style.nat"
                           v-model="details.ethnicity"
                           size="mini"
                           placeholder="">
                    <el-option v-for="(item,idx) in ethnicitys" :key="idx" 
                        :label="item.label" :value="item.label"></el-option>
                </el-select>
            </li>
            <li :class="[hasEmpty && !old.name && $style.warn]">
                姓名：
                <input :class="$style.input"
                       type="text"
                       v-model="old.name"
                       placeholder="请输入姓名">
            </li>
            <li :class="[hasEmpty && !old.idCard && $style.warn]">
                身份证号码：
                <input :class="$style.input"
                       type="text"
                       maxlength="18"
                       v-model="old.idCard"
                       placeholder="请输入身份号">
            </li>
            <li :class="[hasEmpty && !old.gender && $style.warn]">
                性别：
                <el-select :class="$style.select"
                           v-model="old.gender"
                           size="mini"
                           placeholder="">
                    <el-option v-for="(item,idx) in genders" :key="idx" 
                        :label="item.label" :value="item.value"></el-option>
                </el-select>
            </li>
            <li :class="[hasEmpty && !old.location && $style.warn]">
                签发机关：
                <input :class="$style.input"
                       type="text"
                       v-model="old.location"
                       placeholder="请输入签发机关名称">
            </li>
            <li :class="[hasEmpty && !old.dateOfBirth && $style.warn]">
                出生日期：
                <el-date-picker size="mini"
                                :class="$style.picker"
                                :editable="false"
                                v-model="old.dateOfBirth"
                                type="date"
                                placeholder="年-月-日" />
            </li>
            <li :class="[(hasEmpty && (!start||!end)) && $style.warn]">
                有效期限：
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
            <li :class="[hasEmpty && !old.address && $style.warn]">
                住址：
                <input :class="$style.input"
                       type="text"
                       v-model="old.address"
                       placeholder="请输入地址">
            </li>
            <li>人脸模板数量：{{details.faceTotal}}
                <label :class="$style.add"
                       for="img-upload">添加</label>
                <input type="file"
                       id="img-upload"
                       hidden
                       @change="addFace">
            </li>
            <li :class="$style.mark">
                <span>备注：</span>
                <textarea v-model="remark"
                          placeholder="请输入备注"></textarea>
            </li>
        </ul>
        <p :class="$style.button">
            <button :class="$style.cancel"
                    @click="$emit('toggle', 'BaseInfo')">取消</button>
            <button @click="submit">保存</button>
        </p>
    </div>
</template>

<script>

export default {
    props: ['details'],
    computed: {
        areas() {
            return this.$store.getters.areas
        }
    },
    data() {
        const { docDetail: { tempId }, areas } = this.$store.getters;
        return {
            old: {
                name: "",
                idCard: "",
                location: "",
                gender: "",
                dateOfBirth: "",
                address: ""
            },
            docTmp: this.pickArea(tempId,areas),
            remark: "",
            start: "",
            end: "",
            hasEmpty: false,
            faces: [],
            genders: [
                { label: '男', value: 'M' },
                { label: '女', value: 'F' }
            ],
            nations: [
                { label: '汉族' },
                { label: '藏族' },
                { label: '傣族' }
            ],
            ethnicitys: [
                { label: '黄种人' },
                { label: '白种人' },
                { label: '黑种人' }
            ]
        }
    },
    mounted() {
        for (let k in this.old) {
            if (this.details[k]) {
                this.old[k] = this.details[k]
            }
        }
        if (this.details.remark) {
            this.remark = this.details.remark;
        }
        if (this.details.validPeriod) {
            let vp = this.details.validPeriod.replace(/\s/g, '')
            if (/\d{4}-\d{1,2}-\d{1,2}~\d{4}-\d{1,2}-\d{1,2}/.test(vp)) {
                this.start = vp.split('~')[0];
                this.end = vp.split('~')[1];
            }
        }
        setTimeout(() => {
            this.docTmp = this.pickArea(this.details.tempId,this.areas)
        },200)
    },
    methods: {
        pickArea(id, src) {
            if (!id || !src) return null;
            const result = []
            const loop = r => {
                const y = r.find(o => {
                    if (id == o.value) {
                        return true
                    }
                    if (o.children && o.children.length) {
                        return loop(o.children)
                    }
                })
                return y && result.unshift(y.value)
            }
            loop(src)
            return result
        },
        setArg() {
            // 格式化参数
            if (this.old.dateOfBirth instanceof Date) {
                this.old.dateOfBirth = this.old.dateOfBirth.toDate()
            }

            // 设置参数
            this.hasEmpty = false;
            let o = {
                id: this.details.id
            }
            if (!this.docTmp.length) {
                this.$message.warning('请选择档案类型')
                return false;
            } else {
                let t = this.docTmp[this.docTmp.length-1]
                // if (t!=this.details.tempId) {
                    o.tempId = t;
                // }
            }
            for (let k in this.old) {
                if (this.old[k]) {
                    if (this.old[k]) {
                        o[k] = this.old[k]
                    }
                } else {
                    this.hasEmpty = true;
                }
            }
            if (!this.start || !this.end) {
                this.hasEmpty = true;
            } else {
                if (this.start instanceof Date) {
                    this.start = this.start.toDate()
                }
                if (this.end instanceof Date) {
                    this.end = this.end.toDate()
                }
                let validDate = this.start + '~' + this.end;
                if (validDate != this.details.validPeriod) {
                    o.validPeriod = validDate
                }
            }
            if (this.remark != this.details.remark) {
                o.remark = this.remark
            }
            if (this.details.nation) {
                o.nation = this.details.nation
            };
            if (this.details.ethnicity) {
                o.ethnicity = this.details.ethnicity
            };
            // NOTE: 增加上传的人脸模板
            if (this.faces.length) {
                o.facePictures = this.faces
            }
            return this.hasEmpty ? false : o;
        },
        submit() {
            let arg = this.setArg();
            console.log(arg)
            if (arg) {
                let rex = /^[1-9]\d{5}[1-2]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/
                let idCheck = rex.test(arg.idCard)
                if (idCheck) {
                    this.$store.dispatch('document/updateItem',arg).done(() => {
                        // TODO: 后期应减小请求，转为本地数据更新
                        this.$store.dispatch('document/getDetail',arg.id)
                        this.$emit('toggle', 'BaseInfo');
                        this.$message("修改成功");
                        this.$router.push('/faces/search/')
                    })
                } else {
                    this.$message.warning('身份证号格式不正确，请重新输入')
                }
            } else {
                this.$message.warning("请填写完整信息")
            }
        },
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
        addFace(e) {
            if (this.details.faceTotal == 10) {
                this.$message.warning("最多添加10张图片")
                return;
            }
            let file = e.target.files[0] || e.dataTransfer.files[0];
            let verify = this.verifyImg(file);
            if (verify) {
                this.faces.push(file)
                window.URL = window.URL || window.webkitURL;
                const blob = window.URL.createObjectURL(file)
                // 清除图片
                let img = new Image();
                img.src = blob;
                img.onload = () => {
                    window.URL.revokeObjectURL(img.src)
                    this.details.faceTotal++;
                }
            }
        }
    }
}
</script>
<style lang="scss" module>
@import '~style/basic/param';
$line: #0a3e93;

.edit_info {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 394px);
    color: #fff;
    background: $color-dark-blue;
    h3 {
        width: 120px;
        height: 40px;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        border: 1px $color-light-blue solid;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
}

.form {
    padding: 13px 20px;
    margin-top: 50px;
    line-height: 1;
    font-size: 0;
    &>li {
        display: inline-block;
        width: 50%;
        margin: 7px 0;
        vertical-align: top;
        font-size: 14px;
    }
    .warn {
        input {
            border-color: #FF4949;
        }
    }
}

.input {
    padding: 4px;
    font-size: 14px;
    color: #fff;
    background: transparent;
    border-bottom: 1px $line solid;
}

.select {
    width: 60px;
    height: 24px;
    .el-input__icon {
        color: #fff;
    }
    input {
        height: 100%;
        color: #fff;
        background: transparent;
    }
}
.nat {
    width: 100px;
    height: 24px;
    .el-input__icon {
        color: #fff;
    }
    input {
        height: 100%;
        color: #fff;
        background: transparent;
    }
}

.add {
    display: inline-block;
    width: 40px;
    height: 24px;
    line-height: 24px;
    margin-left: 34px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    border-radius: 4px;
    background-color: $color-light-blue;
    cursor: pointer;
    input {
        display: none;
    }
}

.cascader {
    input {
        width: 100%;
        height: 40px;
        margin: 0;
        padding: 0 10px;
        background-color: transparent!important;
    }
    span {
        color: #fff !important;
        line-height: 22px;
        font-size: 12px;
    }
    i:before {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        margin-bottom: 1px;
        border-top: 6px #fff solid;
        border-left: 5px transparent solid;
        border-right: 5px transparent solid;
    }
}

.mark {
    font-size: 0 !important;
    span,
    textarea {
        display: inline-block;
        font-size: 14px;
    }
    textarea {
        width: calc(100% - 3em);
        height: 64px;
        padding: 10px;
        line-height: 1;
        vertical-align: top;
        resize: none;
        outline: none;
        color: #fff;
        border: solid 1px #0a3e93;
        background: transparent;
    }
}

.button {
    display: flex;
    justify-content: center;
    flex: 1;
    align-items: center;
    padding: 22px;
    margin-top: 15px;
    text-align: center;
    button {
        width: 100px;
        height: 40px;
        font-size: 16px;
        color: #fff;
        border-radius: 4px;
        background-color: $color-light-blue;
        cursor: pointer;
    }
    .cancel {
        margin-right: 120px;
        color: $color-light-blue;
        border: solid 1px $color-light-blue;
        background-color: transparent;
    }
}

.picker {
    width: 80px !important;
    text-align: center;
    i {
        display: none !important;
        font-size: 0 !important;
    }
    input {
        padding: 0 !important;
        text-align: center;
        font-size: 14px;
        color: #fff;
        border: none;
        border-radius: 0;
        border-bottom: 1px $line solid;
        background: transparent !important;
    }
}
</style>

