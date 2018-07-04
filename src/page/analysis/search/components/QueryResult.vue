<template>
    <auto-table :class="[$style.table,$style.noFooter]"
                :data="snap.list">
        <span label="档案ID"
              width="190">
            <template scope="idx">
                <span :class="$style.btnWhite"
                      @click="go($event, 'record', snap.list[idx].id)"
                      v-hoverTip="{
                                        '出生日期': snap.list[idx].bornDate,
                                        '出生地': snap.list[idx].bornPlace,
                                        '种族': snap.list[idx].race
                                    }">{{ snap.list[idx].id }}</span>
            </template>
        </span>
        <span prop="name"
              label="姓名"
              width="128"></span>
        <span prop="identity"
              label="身份证号"
              width="190"></span>
        <span label="设备"
              width="190">
            <template scope="idx">
                <span :class="$style.btnWhite"
                      @click="go($event, 'device', snap.list[idx].deviceID)"
                      v-hoverTip="[
                                        [{'经度': snap.list[idx].longtitude},
                                        {'纬度': snap.list[idx].latitude}],
                                        {'位置': snap.list[idx].devicePos}
                                    ]">{{ snap.list[idx].deviceID }}</span>
            </template>
        </span>
        <span prop="time"
              label="时间"
              width="190"></span>
        <span label="操作"
              width="176">
            <template scope="idx">
                <span :class="$style.btnWhite"
                      @click="locus($event, snap.list[idx].id)">查看轨迹</span>
            </template>
        </span>
        <template slot="drop"
                  scope="idx">
            <section :class="$style.pullDrop">
                <div>
                    <em>MAC</em>
                    <span>56:G9:59:F5:21:13</span>
                </div>
                <div>
                    <em>车牌</em>
                    <figure><img :src="require('assets/temp/defaultpro.png')"
                             alt="image"></figure>
                </div>
                <div>
                    <em>人脸照片</em>
                    <figure><img :src="require('assets/temp/defaultpro.png')"
                             alt="image"></figure>
                </div>
                <div>
                    <em>档案照片</em>
                    <figure><img :src="require('assets/temp/defaultpro.png')"
                             alt="image"></figure>
                </div>
                <div>
                    <em>场景图</em>
                    <span :class="$style.btn">查看</span>
                    <!-- <span :class="$style.btn" @click="push(snap.list[idx].id)">查看</span> -->
                </div>
            </section>
        </template>
    </auto-table>
</template>

<script>
// TODO:数据均为本地临时数据
export default {
    props: ['snap'],
    components: {
        autoTable: () => import('./AutoTable')
    },
    methods: {
        push(id) {
            // 查看场景图
            this.$emit('pushItem',{id})
        },
        locus(e, capId) {
            e.stopPropagation()
            // console.log(capId)
            this.$emit('itemLocus',capId)
            // TODO:切换到轨迹界面
        },
        go(e, type, id) {
            e.stopPropagation()
            if (type === 'record') {
                this.$router.push(`/faces/search/detail?id=${id}`)
            } else if (type === 'device') {
                this.$router.push(`/device/services?id=${id}`)
            }
        }
    }
}
</script>

<style lang="scss" module>
@import '~style/basic/param';

.table > section {
    height: calc(100vh - 148px);
}

.pullDrop {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    >div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &+div {
            margin-left: 50px;
        }
        >em {
            margin-right: 50px;
            font-weight: 700;
            font-style: normal;
            font-size: 16px;
        }
        >figure {
            width: 50px;
            height: 50px;
            background: #ccc;
            >img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}

.btnWhite {
    cursor: pointer;
    user-select: none;
}

.btn {
    font-style: normal;
    color: $color-light-blue;
    cursor: pointer;
    user-select: none;
}
</style>


