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
            <!--添加用户-->
            <el-col span="10" class="add-user">
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
                    prop="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="电话">
            </el-table-column>
            <el-table-column
                    prop="role"
                    label="角色">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态">
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
        tableData: [{
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          num: 1,
          name: "2016-05-03",
          email: "964@qq.com",
          phone: "13018083063",
          role: "管理员",
          status: "有效",
          operation: "修改, 删除"
        }, {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }, {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }, {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }, {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }, {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }, {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }]
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