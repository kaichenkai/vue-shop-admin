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
                            v-model="scope.row.mg_state"
                            active-color="#409EFF"
                            inactive-color="#DCDFE6">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    prop="operation"
                    label="操作">
                <template>
                    <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button size="mini" type="success" icon="el-icon-check" circle></el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
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
        pagenum: 2,
        pagesize: 2,
        totalpage: 0,
        total: 0
      };
    },
    mounted() {
      this.getUserList();
    },
    methods: {
      async getUserList() {
        // 模板字符串 (``)
        // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
        const AUTH_TOKEN = localStorage.getItem("token");
        this._service.defaults.headers.common["Authorization"] = AUTH_TOKEN;
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
    }
</style>

<style lang="less">
    /**
    更改 element-ui 样式
     */
    .el-card .el-card__body {
        height: 100%; // 滚动条
    }
</style>