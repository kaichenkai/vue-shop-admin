<template>
    <div class="login" @keyup.enter="login()">
        <el-form class="login-form"
                :label-position="labelPosition"
                label-width="80px"
                :model="formData">
            <h2>用户登录</h2>
            <el-form-item label="用户名">
                <el-input
                        ref="username"
                        v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formData.password"></el-input>
            </el-form-item>

            <el-button
                    @click="login()"
                    class="login-btn" type="primary">登录</el-button>
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
        mounted() {
          // 用户名输入框自动获取焦点
          this.$refs.username.focus();
        },
        methods: {
            async login() {
                // 希望让异步操作的代码, 看起来像同步代码, ES7 的语法
                const resp = await this.$http.post("login", this.formData);
                // 对象解构赋值
                const {data, meta:{msg, status}} = resp.data;
                if (status === 200) {
                  // 0. 保存 token 值
                  localStorage.setItem("token", data.token);
                  // 1. 提示登录成功
                  this.$message.success(msg);
                  // 2. 跳转到 home 页面
                  this.$router.push({path: "home"})
                }  else {
                  // 1. 提示登录失败, 提示相关信息
                  this.$message.warning(msg);
                }

                // this.$http.post("login", this.formData)
                //   .then((resp) => {
                //     // 对象解构赋值
                //     const {msg, status} = resp.data.meta;
                //     if (status === 200) {
                //       // 1. 提示登录成功
                //       this.$message.success(msg);
                //       // 2. 跳转到 home 页面
                //       this.$router.push({path: "home"})
                //     }  else {
                //       // 1. 提示登录失败, 提示相关信息
                //       this.$message.warning(msg);
                //     }
                //   })
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