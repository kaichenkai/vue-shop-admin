<template>
        <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{name: 'rights'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
    </el-card>
</template>

<script>
  export default {
    name: "rights",
    data() {
      return {
        rightsList: [],
      }
    },
    mounted() {
      this.getRightsList()
    },
    methods: {
      // 获取权限列表: rights/:type type: list(列表形式) tree(树状图形式)
      async getRightsList() {
        const resp = await this._service.get("rights/list");
        const {data, meta:{msg, status}} = resp.data;
        if (status === 200) {
          this.rightsList = data;
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
      }
    }
  };
</script>

<style scoped>

</style>