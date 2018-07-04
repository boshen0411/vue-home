<template>
    <dialog-modal v-show="show">
        <div :class="$style.scene_map">
            <div :class="$style.scene">
                <figure>
                    <img :src="img_url + sceneMap" id="layerImg">
                    <div v-for="(item, idx) in tempPos" :key="idx"
                        :class="$style.square"
                        :style="{
                            left: square(item,'left'),
                            top: square(item,'top'),
                            width: square(item,'width'),
                            height: square(item,'height')
                        }"
                        @click="setCur(idx)"
                        @mouseover="hover(idx,'over')"
                        @mouseout="hover(idx,'out')"
                    >
                        <p v-if="list[idx]">
                            <!-- 暂时不需要显示id -->
                            <!-- <span>{{ list[idx].id }}</span><br/> -->
                            <span>{{ list[idx].name }}</span>
                        </p>
                    </div>
                    <!-- 暂无图片坐标 -->
                    <!-- <div v-if="item.position" 
                        v-for="(item, idx) in list.slice(0,5)" :key="idx"
                        :class="$style.square"
                        :style="{
                            left: square(item.position,'left'),
                            top: square(item.position,'top'),
                            width: square(item.position,'width'),
                            height: square(item.position,'height')
                        }"
                        @click="setCur(idx)"
                        @mouseover="hover(idx,'over')"
                        @mouseout="hover(idx,'out')"
                    >
                        <p>
                            <span>{{ item.id }}</span><br/>
                            <span>{{ item.name }}</span>
                        </p>
                    </div> -->
                </figure>
                <div :class="$style.list">
                    <ul class="ui-scrollbar">
                        <li :key="idx" v-for="(item,idx) of list" 
                            :class="[idx == curIdx && $style.active,
                                idx == hoverIdx && $style.hover]">
                            <p v-if="item.score">
                                <span>档案ID</span>
                                <a @click="$router.push(`/faces/search/detail?id=${item.id}`)">{{ item.id }}</a>
                            </p>
                            <p v-if="item.score">
                                <span>姓名</span>
                                <em>{{ item.name }}</em>
                            </p>
                            <p v-if="item.score">
                                <span>身份证号</span>
                                <em>{{ item.idCard }}</em>
                            </p>
                            <p v-if="item.score">
                                <span>比中相似度</span>
                                <em>{{ item.score }}</em>
                            </p>
                            <p>
                                <span>时间</span>
                                <em>{{ item.dateTime }}</em>
                            </p>
                            <p>
                                <span>通道名称</span>
                                <em>{{ item.deviceName }}</em>
                            </p>
                            <p>
                                <span>通道编号</span>
                                <em>{{ item.deviceId }}</em>
                            </p>
                        </li>
                    </ul>
                    <!-- 暂无加载更多接口 -->
                    <!-- <button v-if="list.length < listTotal"
                        @click="getList"
                    >加载更多</button> -->
                </div>
            </div>
            <p :class="$style.button">
                <button :class="curIdx !== null && $style.active" @click="addToLocus">添加轨迹</button>
                <button @click="show = false">关&emsp;闭</button>
            </p>
        </div>
    </dialog-modal>
</template>
<script>
import { getSceneList } from 'api/record'
import DialogModal from '@/DialogModal'
import { img_url } from '../../../config'

export default {
    components: {
        DialogModal
    },
    data(){
        return {
            show: false,
            curIdx: null,
            hoverIdx: null,
            list: [],
            listTotal: null,
            sceneMap: '',
            tempPos: [
                // [[152, 137],[220, 214]],
                // [[257, 127],[325, 204]],
                // [[345, 29],[413, 106]],
                // [[446, 121],[514, 198]],
                // [[564, 105],[632, 182]]
            ],
            img_url: img_url
        }
    },
    methods: {
        open({ image, recDTOs }) {
            this.show = true
            this.sceneMap = image
            this.list = recDTOs || []
            var self = this
            let img = new Image()
            img.src = img_url + image
            img.onload = function () {
                 //获取前端展示图片的宽高
                let layerImg = document.querySelector('#layerImg')
                let fontImgWidth = layerImg.offsetWidth
                let fontImgHeight = layerImg.offsetHeight
                //获取后端图片的宽和高
                let backImgWidth = img.width
                let backImgHeight = img.height
                let widthRatio = fontImgWidth / backImgWidth
                let heightRatio = fontImgHeight / backImgHeight
                // self.list = recDTOs || []
                self.tempPos = []
                for (let i = 0; i < recDTOs.length; i++) {
                    let rect = recDTOs[i].rect.split('|')
                    let leftTop = []
                    let rightBottom = []
                    let rectInfo = []
                    leftTop.push(rect[2] * widthRatio)
                    leftTop.push(rect[0] * heightRatio)
                    rightBottom.push(rect[3] * widthRatio)
                    rightBottom.push(rect[1] * heightRatio)
                    rectInfo.push(leftTop)
                    rectInfo.push(rightBottom)
                    self.tempPos.push(rectInfo)
                };
            }
        },
        addToLocus() {
            if (this.curIdx === null) return
            const {id, name} = this.list[this.curIdx]
            const obj = {id, name}
            this.$store.dispatch('locus/addPeople', obj)
            this.$message.success('已添加到轨迹')
        },
        getList() {
            getSceneList().done(({list, total}) => {
                // list.map(item => {
                //     item.time = fullFormat(item.time)
                // })
                this.list = this.list.concat(list)
                this.listTotal = total
            })
        },
        format(sec, gap = '-') {
            let date = new Date(sec)
            const pref = k => k > 9 ? k : '0' + k
            const yy = date.getFullYear()
            const mm = pref(date.getMonth() + 1)
            const dd = pref(date.getDate())
            const h = pref(date.getHours())
            const m = pref(date.getMinutes())
            const s = pref(date.getSeconds())
            // 格式化，默认如：2017-08-30 15:56:38
            const time = `${yy}${gap}${mm}${gap}${dd} ${h}:${m}:${s}`
            return time
        },
        square(pos, attr) {
            if (attr === 'width') {
                return pos[1][0] - pos[0][0] + 'px'
            } else if (attr === 'height') {
                return pos[1][1] - pos[0][1] + 'px'
            } else if (attr === 'left') {
                return pos[0][0] + 'px'
            } else if (attr === 'top') {
                return pos[0][1] + 'px'
            }
        },
        hover(idx, status) {
            if (status === 'over') {
                this.hoverIdx = idx
            } else if (status === 'out') {
                if (this.hoverIdx == idx) {
                    this.hoverIdx = null
                }
            }
        },
        setCur(idx) {
            this.curIdx = this.curIdx === idx ? null : idx
        }
    }
}
</script>
<style lang="scss" module>
@import '~style/basic/param';

.scene_map {
    width: 1034px;
    padding: 30px 0;
    text-align: center;
}
.scene {
    height: 474px;
    figure, .list {
        display: inline-block;
        vertical-align: top;
    }
    figure {
        width: 720px;
        height: 100%;
        overflow: auto;
        position: relative;
    }
    img {
        width: 100%;
        height: 100%;
    }
    .list {
        width: 244px;
        height: 100%;
        margin-left: 20px;
    }
    ul {
        height: calc(100% - 40px);
        font-size: 14px;
        overflow-y: auto;
        &::-webkit-scrollbar {
            display: none;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #187ce3;
        }
        &::-webkit-scrollbar-track {
            background-color: #fff;
        }
    }
    li {
        padding: 6px 10px;
        overflow: hidden;
        border: 1px transparent solid;
        p {
            line-height: 1.6;
            text-align: justify;
            text-align-last: justify;
            text-justify: inter-ideograph;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:nth-child(n + 4){
                font-size: 0;
            }
        }
        &.active {
            border-color: $color-light-blue;
            p {
                font-size: inherit;
            }
        }
        &.hover {
            border: 1px $color-light-blue dashed;
        }
    }
    span, em, a {
        display: inline-block;
        font-style: normal;
    }
    span {
        color: #666;
    }
    em {
        color: #333;
    }
    a {
        color: $color-light-blue;
        cursor: pointer;
        &:hover {
            opacity: .8;
        }
    }
    button {
        width: 90px;
        height: 30px;
        margin-top: 10px;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
        border-radius: 4px;
        background-color: $color-light-blue;
        &:hover {
            opacity: .8;
        }
    }
    .square {
        position: absolute;
        top: 0;
        left: 0;
        border: 1px dashed $color-light-blue;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &:hover {
            border-style: solid;
            > p {
                display: block;
                width: 100%;
                overflow: hidden;
            }
        }
        > p {
            display: none;
            position: relative;
            top: calc(100% + 6px);
            // transform: translateY(100%);
            background: rgba($color-light-blue,0.89);
            line-height: 30px;
            font-size: 14px;
            > span {
                color: #fff;
            }
        }
    }
}
.button {
    margin-top: 26px;
    button {
        width: 120px;
        height: 40px;
        font-size: 18px;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
            opacity: .8;
        }
        &:first-child {
            color: #fff;
            background: #ccc;
        }
        &:last-child {
            margin-left: 30px;
            color: $color-light-blue;
            background: transparent;
            border: 1px $color-light-blue solid;
        }
        &.active {
            background: $color-light-blue;
        }
    }
}
</style>
