<template>
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{name: 'user'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{name: 'user'}">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{name: 'user'}">用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--搜索框-->
        <el-row>
            <el-col :span=10 class="search">
                <el-input placeholder="请输入内容" v-model="searchContent" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <!--添加用户-->
            <el-col :span=10 class="add-user">
                <el-button type="primary">添加用户</el-button>
            </el-col>
        </el-row>
        <!--表格数据渲染-->
        <el-table
                :data="tableData"
                height="calc(100% - 114px)"
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
                    prop="create_time"
                    label="创建日期">
            </el-table-column>
            <el-table-column
                    prop="mg_state"
                    label="用户状态">
            </el-table-column>
            <el-table-column
                    prop="operation"
                    label="操作">
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
  export default {
    name: "user",
    data() {
      return {
        searchContent: "",
        pagenum:1,
        pagesize: 50,
        tableData: []
      };
    },
    mounted() {
        this.getUserList()
    },
    methods: {
      async getUserList() {
        // 模板字符串 (``)
        // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
        const AUTH_TOKEN = localStorage.getItem("token");
        this._service.defaults.headers.common["Authorization"] = AUTH_TOKEN;
        const resp = await this._service.get(`users?query=${this.searchContent}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
        const { data, meta:{ msg, status } } = resp.data;
        if (status !== 200) {
          this.$message.error(msg)
        } else  {
          this.tableData = data.users;
        }
      }
    },
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
    }
</style>

<style lang="less">
    /**
    更改 element-ui 样式
     */
    .el-card .el-card__body {
        height: 100%;  // 滚动条
    }
</style>