<template>
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{name: 'user'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{name: 'user'}">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{name: 'user'}">用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--搜索框-->
        <el-row>
            <el-col span="10" class="search">
                <el-input placeholder="请输入内容" v-model="searchContent" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col span="10" class="add-user">
                <el-button type="primary">添加用户</el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
  export default {
    name: "user",
    data() {
      return {
        searchContent: ""
      };
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
    }
</style>