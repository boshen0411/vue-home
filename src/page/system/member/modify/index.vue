<template>
    <section class="modify-container">
        <p>
            <span class="back" @click="$router.push('/system/member/list')">用户管理</span>
            <span class="arrow">&gt;</span>
            <span>{{ id ? '编辑用户' : '新建用户' }}</span>
        </p>
        <section class="form">
            <p>
                <label for="input_username">用户名</label>
                <span v-if="!!id" class="notEdit">{{ username }}</span>
                <input v-else type="text" 
                    id="input_username" 
                    placeholder="请输入用户名" 
                    v-model="username"
                >
            </p>
            <p>
                <label for="input_password">密&emsp;码</label>
                <input type="password" 
                    id="input_password" 
                    placeholder="请输入密码"
                    v-model="password"
                >
            </p>
            <p>
                <label for="input_department">部&emsp;门</label>
                <input type="text" 
                    id="input_department" 
                    placeholder="请输入部门"
                    v-model="department"
                >
            </p>
            <p>
                <label for="input_position">职&emsp;务</label>
                <input type="text" 
                    id="input_position" 
                    placeholder="请输入职务"
                    v-model="position"
                >
            </p>
            <p>
                <label>角&emsp;色</label>
                <el-select 
                    id="input_role"
                    class="drop-select"
                    v-model="role"
                    placeholder="请选择角色"
                >
                    <el-option v-for="(r,idx) in roles" 
                        :key="idx"
                        :label="r.roleName" 
                        :value="r.id"
                    ></el-option>
                </el-select>
            </p>
        </section>
        <div class="btns">
            <span class="cancel" @click="$router.push('/system/member/list')">取消</span>
            <span class="submit" @click="submit">{{ id ? '确定' : '新建' }}</span>
        </div>
    </section>
</template>

<script>
import { getRoles, createUser, editUser, queryOne } from 'api/member';

export default {
    props: {
        curTab: String
    },
    data() {
        return {
            id: this.$route.query.id || '',
            username: '',
            password: '',
            department: '',
            position: '',
            role: '',
            roles: [],
            compare: {}
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            // 获取角色列表
            let roles = await getRoles();
            roles = roles.list;
            if(!roles) return;
            this.roles = roles;
            this.role = roles[0].id
            // 根据id判断是否是编辑模式
            if(!this.id) return;
            // 在sotre里查找有无当前路由数据
            // 如果没有，则请求数据
            let data = this.$store.state.member.temp
            const existData = data._pathName == this.$route.fullPath
            if (!existData) {
                const res = await queryOne({ id: this.id })
                let obj = {
                    id: res.id,
                    username: res.username,
                    role: Number(res.role),
                    department: res.department,
                    position: res.displayName,
                    lastLogin: res.lastLoginTime,
                    state: res.state
                }
                obj._pathName = `/member/modify?id=${obj.id}`
                this.$store.dispatch('setTemp',obj)
                data = obj
            }
            this.username = data.username
            this.department = data.department
            this.position = data.position
            this.role = data.role
            this.compare = {
                password: '',
                department: data.department,
                position: data.position,
                role: data.role
            }
        },
        submit() {
            // 验证是否已填写
            const mes = {
                username: '请输入用户名',
                department: '请输入部门',
                position: '请输入职务',
                role: '请选择角色'
            }
            for(let attr in mes) {
                if(!this[attr]) {
                    this.$message.error(mes[attr])
                    return;
                }
            }
            // 根据id判断是否是编辑模式
            if (this.id) {
                // 编辑模式下查看是否有变更再决定是否提交
                for(let k in this.compare) {
                    if (this[k] != this.compare[k]) {
                        this.edit()
                    }
                }
                this.$router.push('/system/member/list')
            } else {
                // 新建模式下必须填写密码
                if (!this.password) this.$message.error('请输入密码')
                this.create()
            }
        },
        create() {
            const args = {
                username: this.username,
                password: this.password,
                roleId: this.role,
                displayName: this.position,
                department: this.department
            }
            createUser(args).then(res => {
                this.$message.success('创建成功！')
                this.$router.push('/system/member/list')
            }).catch(e => {
                // console.log(e)
            })
        },
        edit() {
            const args = {
                id: this.id,
                username: this.username,
                password: this.password,
                roleId: this.role,
                displayName: this.position,
                department: this.department
            }
            editUser(args).then(res => {
                this.$message.success('修改成功！')
                this.$router.push('/system/member/list')
            }).catch(e => {
                console.log(e)
            })
        }
    }
}
</script>

<style lang="scss">
@import '~style/basic/param';

.modify-container .drop-select {
    .el-input__inner {
        height: 40px;
        background-color: $color-deep-blue;
        border: none;
        color: #fff;
    }
}
</style>

<style lang="scss" scoped>
@import '~style/basic/param';
.modify-container {
    height: calc(100vh - 114px);
    min-height: 450px;
    background: $color-dark-blue;
    font-size: 0;
    >p {
        border-bottom: 1px solid $color-deep-blue;
        padding-left: 40px;
        font-size: 0;
        span {
            line-height: 62px;
            font-size: 18px;
            color: #fff;
        }
        .back {
            cursor: pointer;
        }
        .arrow {
            margin: 0 10px;
            font-family: 'Simsun';
        }
    }
}
.form {
    width: 100%;
    padding-top: 10px;
    font-size: 0;
    > p {
        margin-top: 20px;
        vertical-align: top;
        display: inline-block;
        width: 49%;
        height: 40px;
        padding-left: 30px;
        > label {
            margin-right: 22px;
            vertical-align: top;
            display: inline-block;
            width: 4em;
            text-align: justify;
            text-align-last: justify;
            text-justify:inter-word;
            line-height: 40px;
            font-size: 16px;
            color: #fff;
        }
        > input,.notEdit {
            width: 48%;
            height: 100%;
            padding: 0 12px;
            background: $color-deep-blue;
            border-radius: 4px;
            line-height: 40px;
            font-size: 14px;
            color: #fff;
        }
        .notEdit {
            display: inline-block;
            background: transparent;
        }
    }
}
.drop-select {
    width: 48%;
    .el-input__inner {
        background-color: #000 !important;
    }
}
.btns {
    margin: 100px auto 0;
    text-align: center;
    > span {
        vertical-align: middle;
        display: inline-block;
        width: 160px;
        height: 50px;
        border: 1px solid $color-light-blue;
        border-radius: 4px;
        line-height: 50px;
        font-size: 18px;
        cursor: pointer;
        user-select: none;
        & + span {
            margin-left: 180px;
        }
        &.cancel {
            color: $color-light-blue;
            &:hover {
                background: $color-sky-blue;
                color: #fff;
            }
        }
        &.submit {
            background: $color-light-blue;
            color: #fff;
            &:hover {
                background: $color-sky-blue;
            }
        }
    }
}
</style>
