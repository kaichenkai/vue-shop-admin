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
        <el-steps :active="activeStep"
                  align-center
                  style="margin: 20px 0"
        >
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>

        <!--tabs-->
        <el-tabs class="tabs" tab-position="left" style="height: calc(100% - 200px)">
            <el-tab-pane class="tab-pane" label="基本信息"><el-col>基本信息</el-col></el-tab-pane>
            <el-tab-pane class="tab-pane" label="商品参数"><el-col>商品参数</el-col></el-tab-pane>
            <el-tab-pane class="tab-pane" label="商品属性"><el-col>商品属性</el-col></el-tab-pane>
            <el-tab-pane class="tab-pane" label="商品图片"><el-col>商品图片</el-col></el-tab-pane>
            <el-tab-pane class="tab-pane" label="商品内容"><el-col>商品内容</el-col></el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
  export default {
    name: "addGoods",
    data() {
      return {
        activeStep: 0
      };
    }
  };
</script>

<style scoped lang="less">
    .box-card {
        height: 100%;
        width: 100%;
        box-sizing: border-box;

        .tabs {
            .tab-pane {
                margin-top: 10px;
            }
        }
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