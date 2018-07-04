<template>
    <div class="base-info">
        <h3>基本信息</h3>
        <ul>
            <li>档案类型：{{pickArea(details.tempId)}}</li>
            <li>民族：{{details.nation}}</li>
            <li>档案ID：{{details.id}}</li>
            <li>种族：{{details.ethnicity}}</li>
            <li>姓名：{{details.name}}</li>
            <li>身份证号码：{{details.idCard}}</li>
            <li>性别：{{details.gender | gender}}</li>
            <li>签发机关：{{details.location}}</li>
            <li>出生日期：{{details.dateOfBirth}}</li>
            <li>有效期限：{{details.validPeriod&&details.validPeriod.replace('~','至')}}</li>
            <li>住址：{{details.address}}</li>
            <li>人脸模板数量：{{details.faceTotal}}</li>
            <!-- <li>备注： <p>{{details.remark}}</p> </li> -->
        </ul>
        <div class="btns">
            <button class="ts-button info"
                    @click="addToLocus">添加到轨迹</button>
            <button class="ts-button"
                    @click="$emit('toggle', 'EditInfo')">修改</button>
            <button class="ts-button info"
                    @click="$router.go(-1)">返回</button>
        </div>
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
    methods: {
        addToLocus() {
            let ob = { id: this.details.id, name: this.details.name }
            this.$store.dispatch('locus/addPeople', ob)
        },
        pickArea(id) {
            console.log('id---->' + id)
            // id=1
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
                return y && result.unshift(y.label)
            }
            loop(this.areas)
            return result.join(' ')
        }
    }
}
</script>


<style lang='scss' scoped>
@import '~style/basic/param';
.base-info {
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
    ul {
        padding: 13px 20px;
        margin-top: 50px;
        font-size: 0;
    }
    li {
        display: inline-block;
        width: 50%;
        vertical-align: top;
        font-size: 14px;
        line-height: 2.4;
    }
    p {
        display: inline-block;
        vertical-align: top;
        width: calc(100% - 4em);
    }
}

.btns {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;
    width: 500px;
    padding-bottom: 22px;
    margin: 50px auto 0;
    button {
        padding: 10px 25px;
        font-size: 16px;
    }
}
</style>

