<template>
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{name: 'rights'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--表格数据-->
        <el-table
                :data="rightsList"
                border
                height="100%"
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
                    prop="authName"
                    label="权限名称">
            </el-table-column>
            <el-table-column
                    prop="path"
                    label="路径">
            </el-table-column>
            <el-table-column
                    label="权限等级">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                    <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
                    <el-tag type="danger" v-else>三级</el-tag>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
  export default {
    name: "rights",
    data() {
      return {
        rightsList: []
      };
    },
    mounted() {
      this.getRightsList();
    },
    filters: {
      // formatterLevel(value) {
      //   switch (value) {
      //     case "0": {
      //       return "一级";
      //     }
      //     case "1": {
      //       return "二级";
      //     }
      //     case "2": {
      //       return "三级";
      //     }
      //   }
      // }
    },
    methods: {
      // 获取权限列表: rights/:type type: list(列表形式) tree(树状图形式)
      async getRightsList() {
        const resp = await this._service.get("rights/list");
        const { data, meta: { msg, status } } = resp.data;
        if (status === 200) {
          this.rightsList = data;
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

        .box-table {
            margin: 20px 0;
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
        height: 100% !important; // 滚动条
    }
</style>
