<template>
    <div class="login">

        <el-form class="login-form"
                :label-position="labelPosition"
                label-width="80px"
                :model="formData">
            <h2>用户登录</h2>
            <el-form-item label="用户名">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formData.password"></el-input>
            </el-form-item>

            <el-button class="login-btn" type="primary">登录</el-button>
        </el-form>

    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                labelPosition: 'top',  // 顶部对齐
                formData: {
                    username: '',
                    password: ''
                }
            };
        },
        methods: {
            myMethod() {
                // this.$http()
            }
        }
    }
</script>

<style scoped>
    .login {
        background-color: #324152;
        height: 100%;

        /*弹性盒布局*/
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login .login-form {
        background-color: #fff;
        width: 400px;
        padding: 30px;
        border-radius: 5px;
    }

    .login .login-form .login-btn {
        width: 100%;
    }
</style>