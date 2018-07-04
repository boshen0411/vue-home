<template>
    <label v-show="false">
        <input type="file"
            multiple
            @change="upload"
            accept="image/png, image/jpeg, image/gif"
            ref="upload">
    </label>
</template>

<script>
// tip：
// 此组件用于提取图片的
// {
//     name,
//     size,
//     file,
//     blob
// }
// 默认上传的图片合并传入的list
// 当@cb存在时，提取对象后执行cb函数，并返回当前list

export default {
    props: {
        list: {
            required: false,
            type: Array,
            default: () => []
        },
        maxNum: {
            type: Number,
            default: () => 10
        }
    },
    methods: {
        click() {
            this.$refs.upload.click()
        },
        upload(e) {
            // 获取上传的文件
            let files = e.target.files || e.dataTransfer.files;
            // 限定10张图片
            if (files.length + this.list.length > this.maxNum) return this.$message.error(`上传失败！只能上传${this.maxNum}张图片`)
            // 从事件对象中提取文件名、blob对象、文件
            let list = [].map.call(files,file => this.extract(file))
            list = list.filter(item => item)
            // 弹出弹框
            if (list.length) this.show = true;
            // 清空input的数据，不然无法监听到change事件
            e.target.value = null;
            // 再上传图片
            list = this.list.concat(list)
            this.$emit('update:list',list)
            // 当有回调函数时，执行回调
            if (this._events.cb) this.$emit('cb',list)
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
            return {
                name,
                size,
                file,
                blob
            }
        },
    }
}
</script>