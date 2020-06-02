<template>
    <el-card class="box-card">
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{name: 'root'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
        <!--消息提示-->
        <el-alert
                title="添加商品 ..."
                type="info"
                show-icon
                :center="true"
                style="margin-top: 15px"
        >
        </el-alert>
        <!--步骤条-->

    </el-card>
</template>

<script>
  export default {
    name: "addGoods"
  };
</script>

<style scoped lang="less">
    .box-card {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
    }
</style>

<style lang="less">
    /**
    更改 element-ui 样式
     */
    .el-card .el-card__body {
        height: 100% !important;
    }
</style>