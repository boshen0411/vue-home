<template>
    <div :class="$style.face_photo">
        <h3>人脸照片</h3>
        <p v-if="!photo.length" :class="$style.blank">暂无图片</p>
        <div v-else :class="$style.photo_wrap">
            <i
                :class="[ index && $style.cursor ]"
                @click="prev"
            >
                <svg-icon :ico="left"/>
            </i>
            <div :class="$style.photo">
                <ul :style="slideX">
                    <li
                        v-for="(o,idx) in photo"
                        :key="idx"
                    >
                        <img :src="img_url + o.image">
                        <p>
                            <i @click="remove(o.id)">
                                <svg-icon ico="delete_white"/>
                            </i>
                        </p>
                    </li>
                </ul>
            </div>
            <i
                :class="[ index < photo.length - 1 && $style.cursor ]"
                @click="next"
            >
                <svg-icon :ico="right"/>
            </i>
        </div>
    </div>
</template>
<script>
    import { img_url } from '../../../../../config'
    export default {
        data(){
            return {
                index: 0,
                offset: 158,
                img_url: img_url
            }
        },
        computed: {
            left(){
                return this.index > 0 ? 'arrow_left_blue' : 'arrow-left_not_clickable';
            },
            right(){
                return this.index < this.photo.length -1 ? 'arrow_right_blue' : 'arrow-right_not_clickable';
            },
            slideX(){
                const x = `translateX(-${ this.offset * this.index }px)`
                return {
                    transform: x,
                    '-ms-transform': x
                }
            },
            photo() {
                let detail = this.$store.getters.docDetail
                // console.log('detail--->' + detail)
                if (detail&&detail.image) {
                    return detail.image
                } else {
                    return []
                }
            }
        },
        methods: {
            prev(){
                this.index > 0 && this.index--;
            },
            next(){
                if (this.index < this.photo.length -1) {
                    this.index++;
                }
            },
            remove(id){
                this.$confirm('确定删除该照片？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).done(() => {
                    this.$store.dispatch('document/deletePhoto',id)
                })
            }
        },
        mounted() {
            console.log(this.$wshost.split('/'))
        }
    }
</script>
<style lang="scss" module>
@import '~style/basic/param';
.face_photo {
    margin-top: 10px;
    background: $color-dark-blue;
    h3 {
        width: 120px;
        height: 40px;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        border: 1px $color-light-blue solid;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    svg {
        width: 100% !important;
        height: 100% !important;
    }
}
.photo_wrap {
    padding: 33px 10px;
    font-size: 0;
    & > i {
        display: inline-block;
        width: 40px;
        height: 60px;
        padding: 10px;
    }
}
.cursor {
    cursor: pointer;
    &:hover {
        opacity: .8;
    }
}
.blank {
    padding: 0 0 20px 20px;
    font-size: 16px;
    color: #ddd;
}
.photo {
    display: inline-block;
    width: calc(100% - 140px);
    margin: 0 30px;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    ul {
        transition: all .25s;
    }
    li {
        position: relative;
        display: inline-block;
        width: 121px;
        height: 174px;
        &:nth-child(n + 2) {
            margin-left: 37px;
        }
        &:hover {
            p {
                display: block;
            }
        }
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p {
        position: absolute;
        top: 0;
        left: 0;
        display: none;
        width: 100%;
        height: 100%;
        background-color: rgba(#000, .5);
    }
    i {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: block;
        width: 30px;
        height: 30px;
        margin: auto;
        cursor: pointer;
        &:hover {
            opacity: .8;
        }
    }
}
</style>
