<template>
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{name: 'user'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--搜索框-->
        <el-row>
            <el-col :span=10 class="search">
                <el-input
                        placeholder="请输入内容"
                        v-model="searchContent"
                        clearable
                        @clear="loadUserList()"
                        class="input-with-select"
                >
                    <el-button slot="append" icon="el-icon-search" @click.prevent="searchUser()"></el-button>
                </el-input>
            </el-col>
            <!--添加用户-->
            <el-col :span=10 class="add-user">
                <el-button type="primary" @click.prevent="showAddUserDialog()">添加用户</el-button>
            </el-col>
        </el-row>
        <!--表格数据渲染-->
        <!--                        height="calc(100% - 114px)"-->
        <el-table
                :data="userList"
                height="calc(100% - 214px)"
                style="width: 100%; font-size: 14px"
                class="box-table"
        >
            <el-table-column
                    type="index"
                    label="#"
                    width="100"
                    align="left">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱">
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    label="电话">
            </el-table-column>
            <el-table-column
                    prop="role_name"
                    label="角色">
            </el-table-column>

            <!--prop="create_time"-->
            <el-table-column
                    label="创建日期">
                <!--如果单元格内显示的内容不是文本字符串
                需要给被显示的内容外层包裹一个 template 标签-->

                <!--template 内部要用数据, 设置 slot-scope 属性
                该属性的值是要用数据的数据源的key-->

                <!--slot-scope 的值 userList 其实就是 el-table 绑定的数据 userList,
                userList.row -> 数组中的每个具体对象-->
                <template slot-scope="scope">
                    {{scope.row.creat_time | formatDate("YYYY-MM-DD")}}
                </template>
            </el-table-column>
            <el-table-column
                    label="用户状态">
                <template slot-scope="scope">
                    <el-switch
                            @change="changeUserStatus(scope.row)"
                            v-model="scope.row.mg_state"
                            active-color="#409EFF"
                            inactive-color="#DCDFE6">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-edit"
                            circle
                            @click="showEditUserDialog(scope.row.id)"
                    ></el-button>
                    <!--设置用户权限-->
                    <el-button
                            size="mini"
                            type="success"
                            icon="el-icon-check"
                            circle
                            @click="showSetUserRole(scope.row)"
                    >
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            @click="showDelUserDialog(scope.row.id)"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <!--        @size-change="handleSizeChange"-->
        <el-pagination
                @current-change="handleCurrentChange"
                :background="true"
                layout="total, prev, pager, next, jumper"
                :current-page="pagenum"
                :page-size="pagesize"
                :total="total"
                class="pagenation"
        >
        </el-pagination>

        <!--添加用户对话框-->
        <el-dialog
                title="添加用户"
                :visible.sync="addUserDialogVisible"
                width="30%"
                center>
            <el-form label-position="left" label-width="80px" :model="addUserForm">
                <el-form-item label="姓名:">
                    <el-input v-model="addUserForm.username" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码:">
                    <el-input v-model="addUserForm.password" clearable></el-input>
                </el-form-item>
                <el-form-item label="邮箱:">
                    <el-input v-model="addUserForm.email" clearable></el-input>
                </el-form-item>
                <el-form-item label="电话:">
                    <el-input v-model="addUserForm.mobile" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addUserDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser()">确 定</el-button>
            </span>
        </el-dialog>

        <!--编辑用户对话框-->
        <el-dialog
                title="编辑用户"
                :visible.sync="editUserDialogVisible"
                width="30%"
                center>
            <el-form label-position="left" label-width="80px" :model="editUserForm">
                <el-form-item label="姓名:">
                    <el-input v-model="editUserForm.username" clearable disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱:">
                    <el-input v-model="editUserForm.email" clearable></el-input>
                </el-form-item>
                <el-form-item label="电话:">
                    <el-input v-model="editUserForm.mobile" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editUserDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateUser(editUserForm.id)">确 定</el-button>
            </span>
        </el-dialog>

        <!--设置用户权限对话框-->
        <el-dialog
                title="设置用户角色"
                :visible.sync="setUserRoleDialogVisible"
                width="40%"
                left
                class="user-role-dialog"
        >
            <el-form label-position="left" width="80%" :model="userRoleForm" class="user-role-form">
                <el-form-item class="user-role">
                    <label>当前用户:<span>{{userRoleForm.username}}</span></label>
                </el-form-item>
                <el-form-item class="user-role">
                    <label>当前角色:<span>{{userRoleForm.rolename}}</span></label>
                </el-form-item>
                <el-form-item class="user-role">
                    <label>分配角色:
                        <!--select 绑定的数据的值, 和 option 的 label 值一样-->
                        <!--如果 select 绑定的数据的值, 和 option 的 value 值一样, 此时显示的是该 option 的label 值-->
                        <el-select v-model="currentRoleId" placeholder="请选择">
                            <el-option
                                    v-for="item in userRoleForm.roleOptions"
                                    :key="item.roleId"
                                    :label="item.roleName"
                                    :value="item.roleId"
                                    :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </label>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setUserRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="setUserRole">确 定</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>

<script>
  export default {
    name: "user",
    data() {
      return {
        searchContent: "",
        userList: [],
        // 分页相关数据
        pagenum: 1,
        pagesize: 4,
        totalpage: 0,
        total: 0,

        // 添加用户对话框
        addUserDialogVisible: false,
        addUserForm: {
          username: "",
          password: "",
          email: "",
          mobile: ""
        },

        // 编辑用户对话框
        editUserDialogVisible: false,
        editUserForm: {
          id: "",
          username: "",
          email: "",
          mobile: ""
        },

        // 用户角色对话框
        setUserRoleDialogVisible: false,
        currentRoleId: "",
        userRoleForm: {
          id: "",  // userId
          username: "",
          rolename: "",
          roleOptions: []
        }
      };
    },
    mounted() {
      this.getUserList();
    },
    filters: {
      // formatterRoleName(value) {
      //   console.log(value);
      //   return value === 0? "超级管理员": value;
      // }
    },
    methods: {
      async getUserList() {
        // 模板字符串 (``)
        // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
        // const AUTH_TOKEN = localStorage.getItem("token");
        // this._service.defaults.headers.common["Authorization"] = AUTH_TOKEN;
        const resp = await this._service.get(`users?query=${this.searchContent}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
        const { data: { users, total, pagenum, totalpage }, meta: { msg, status } } = resp.data;
        if (status !== 200) {
          this.$message.warning(msg);
        } else {
          this.userList = users;
          this.total = total;
          this.pagenum = pagenum;
          this.totalpage = totalpage;
          // 提示获取用户列表数据成功
          this.$message.success(msg);
        }
      },

      // 分页相关方法
      // handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      // },
      handleCurrentChange(pagenum) {
        this.pagenum = pagenum;
        this.getUserList();
      },

      // 用户搜索
      searchUser() {
        this.getUserList();
      },

      // 清空搜索框触发
      loadUserList() {
        this.getUserList();
      },

      // 显示添加用户对话框
      showAddUserDialog() {
        this.addUserDialogVisible = true;
      },
      // 添加用户
      async addUser() {
        const resp = await this._service.post("users", this.addUserForm);
        const { meta: { msg, status } } = resp.data;
        switch (status) {
          case 201: {
            // 提示信息
            this.$message.success(msg);
            // 清除对话框内容
            this.addUserForm = {
              username: "",
              password: "",
              email: "",
              mobile: ""
            };
            // 重新加载数据
            this.getUserList();
            // 关闭对话框
            this.addUserDialogVisible = false;
            break;
          }
          case 400: {
            this.$message.warning(msg);
            break;
          }
          default: {
            this.$message.error(msg);
          }
        }
      },

      // 显示删除用户对话框 + 删除用户
      showDelUserDialog(userId) {
        this.$confirm("删除用户?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(async () => {
          const resp = await this._service.delete(`users/${userId}`);
          const { meta: { msg, status } } = resp.data;
          if (status === 200) {
            this.$message.success(msg);
            // 重新加载用户列表
            this.getUserList();
          } else {
            this.$message.error(msg);
          }
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },

      // 显示编辑用户对话框
      async showEditUserDialog(userId) {
        // 显示对话框
        this.editUserDialogVisible = true;
        // 请求当前用户数据
        const resp = await this._service.get(`users/${userId}`);
        const { data, meta: { msg, status } } = resp.data;
        if (status === 200) {
          this.editUserForm.id = data.id;
          this.editUserForm.username = data.username;
          this.editUserForm.email = data.email;
          this.editUserForm.mobile = data.mobile;
        } else {
          this.$message.error(msg);
        }
      },
      // 更新用户信息
      async updateUser(userId) {
        const resp = await this._service.put(`users/${userId}`, this.editUserForm);
        const { meta: { msg, status } } = resp.data;
        if (status === 200) {
          // 提示信息
          this.$message.success(msg);
          // 清除对话框内容
          this.editUserForm = {
            id: "",
            username: "",
            email: "",
            mobile: ""
          };
          // 重新加载 userList
          this.getUserList();
          // 关闭对话框
          this.editUserDialogVisible = false;
        } else {
          this.$message.error(msg);
        }
      },

      // 改变用户状态 users/:uId/state/:type
      async changeUserStatus(userObj) {
        const resp = await this._service.put(`users/${userObj.id}/state/${userObj.mg_state}`);
        console.log(resp);
        const { meta: { msg, status } } = resp.data;
        if (status === 200) {
          // 提示信息
          this.$message.success(msg);
          // 不需要重新加载,  v-model="mg_state" 视图改变数据, 数据返过来影响视图(双向绑定)
          // this.getUserList();
        } else {
          this.$message.error(msg);
        }
      },

      // 显示用户角色对话框
      async showSetUserRole(userObj) {
        this.setUserRoleDialogVisible = true;
        // 清空角色选项列表
        this.userRoleForm.roleOptions = [];
        // 显示当前用户权限信息
        this.userRoleForm.id = userObj.id;
        this.userRoleForm.username = userObj.username;
        this.userRoleForm.rolename = userObj.role_name;
        // 获取当前用户的 rid : users/:id
        const res = await this._service.get(`users/${userObj.id}`);
        const { rid } = res.data.data;
        if (rid === 0) { // 超级管理员
          this.currentRoleId = userObj.role_name;
        } else { // 一般用户
          this.currentRoleId = rid;
        }

        // 获取角色列表  users/:id/role
        const resp = await this._service.get(`roles`);
        const { data, meta: { msg, status } } = resp.data;
        if (status === 200) {
          // 给 userRoleForm 赋值
          for (const roleObj of data) {
            let tempRole = new Object({
              roleId: roleObj.id,
              roleName: roleObj.roleName,
              roleDesc: roleObj.roleDesc,
              disabled: false
            });
            this.userRoleForm.roleOptions.push(tempRole);
          }
          // 提示成功
          // this.$message.success(msg);
        } else {
          this.$message.error(msg);
        }
      },
      // 设置用户角色: users/:id/role
      async setUserRole() {
        const resp = await this._service.put(`users/${this.userRoleForm.id}/role`, { rid: this.currentRoleId });
        const { meta: { msg, status } } = resp.data;
        if (status === 200) {
          // 清空 userRoleForm.roleOptions
          this.userRoleForm.roleOptions = [];
          // 退出对话框
          this.setUserRoleDialogVisible = false;
          // 重载用户列表信息
          this.getUserList();
          // 提示成功
          this.$message.success(msg);
        } else {
          this.$message.error(msg);
        }
      }
    }
  };
</script>

<style scoped lang="less">
    .box-card {
        height: 100%;
        width: 100%;
        box-sizing: border-box;

        .el-row {
            margin-top: 20px;

            .search {
                margin-right: 20px;
            }
        }

        .box-table {
            margin-top: 20px;
        }

        .pagenation {
            margin: 34px 0;
        }

        .user-role-dialog {
            .user-role-form {
                .user-role {
                    label {
                        span {
                            margin-left: 15px;
                        }

                        .el-select {
                            margin-left: 15px;
                        }
                    }
                }
            }
        }
    }
</style>

<style lang="less">
    /**
    更改 element-ui 样式
     */
    .el-card .el-card__body {
        height: 100% !important; // 滚动条
    }
</style>