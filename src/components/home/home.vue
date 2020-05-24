<template>
    <div class="home">
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="4">
                        <div class="grid-content bg-purple head-left">
                            <img src="@/assets/logo.png" alt="">
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div class="grid-content bg-purple-light head-middle">
                            <h3>中后台管理系统</h3>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple head-bottom">
                            <a href="#" @click.prevent="handleLogout()">退出</a>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside :style="{width:'200px', height:'100%'}">
                    <!--                            @open="handleOpen"-->
                    <!--                            @close="handleClose"-->
                    <el-menu
                            :unique-opened="true"
                            :router="true"
                            default-active="/role"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">   <!--默认选中-->
                        <el-submenu index="1">
                            <template slot="title">
                                <i :class="iconObj[125]"></i>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item index="/user">
                                <i class="el-icon-menu"></i>
                                <span>用户列表</span>
                            </el-menu-item>
                            <!--                            <el-submenu index="1-2">-->
                            <!--                                <template slot="title">-->
                            <!--                                    <i class="el-icon-menu"></i>-->
                            <!--                                    <span>选项四</span>-->
                            <!--                                </template>-->
                            <!--                                <el-menu-item index="1-2-1">-->
                            <!--                                    <i class="el-icon-menu"></i>-->
                            <!--                                    <span>选项4-1</span>-->
                            <!--                                </el-menu-item>-->
                            <!--                            </el-submenu>-->
                        </el-submenu>
                        <!--<2>-->
                        <el-submenu index="2">
                            <template slot="title">
                                <i :class="iconObj[103]"></i>
                                <span>权限管理</span>
                            </template>
                            <el-menu-item index="/role">
                                <i class="el-icon-menu"></i>
                                <span>角色列表</span>
                            </el-menu-item>
                            <el-menu-item index="/rights">
                                <i class="el-icon-menu"></i>
                                <span>权限列表</span>
                            </el-menu-item>
                        </el-submenu>
                        <!--<3>-->
                        <el-submenu index="3">
                            <template slot="title">
                                <i :class="iconObj[101]"></i>
                                <span>商品管理</span>
                            </template>
                            <el-menu-item index="3-1">
                                <i class="el-icon-menu"></i>
                                <span>商品列表</span>
                            </el-menu-item>
                            <el-menu-item index="3-2">
                                <i class="el-icon-menu"></i>
                                <span>分类参数</span>
                            </el-menu-item>
                            <el-menu-item index="3-3">
                                <i class="el-icon-menu"></i>
                                <span>商品分类</span>
                            </el-menu-item>
                        </el-submenu>
                        <!--<4>-->
                        <el-submenu index="4">
                            <template slot="title">
                                <i :class="iconObj[102]"></i>
                                <span>订单管理</span>
                            </template>
                            <el-menu-item index="4-1">
                                <i class="el-icon-menu"></i>
                                <span>订单列表</span>
                            </el-menu-item>
                        </el-submenu>
                        <!--<5>-->
                        <el-submenu index="5">
                            <template slot="title">
                                <i :class="iconObj[145]"></i>
                                <span>数据统计</span>
                            </template>
                            <el-menu-item index="5-1">
                                <i class="el-icon-menu"></i>
                                <span>数据报表</span>
                            </el-menu-item>
                        </el-submenu>

                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
  export default {
    name: "home",
    beforeCreate() {
      // 如果没有 token 值, 就不渲染 home 组件
      // new Vue() 之前触发
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({name: "login"})
      }
    },
    data() {
      return {
        iconObj: {
          "125": "iconfont icon-user",
          "103": "iconfont icon-tijikongjian",
          "101": "iconfont icon-shangpin",
          "102": "iconfont icon-danju",
          "145": "iconfont icon-baobiao"
        }
      };

    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleLogout() {
        // 退出, 删除 token
        localStorage.removeItem("token");
        // 提示
        this.$message.success("退出登录");
        // 返回 login 组件
        this.$router.push({name: "login"})
      }
    }
  };
</script>

<style scoped lang="less">
    .home {
        height: 100%;

        .el-container {
            height: 100%;

            .el-header {
                background-color: #b3c0d1;

                .el-row {
                    height: 100%;

                    .el-col {
                        height: 100%;
                        line-height: 60px;

                        .head-left {
                            img {
                                height: 60px;
                                width: 60px;
                            }
                        }

                        .head-middle {
                            h3 {
                                margin: 0;
                                text-align: center;
                            }
                        }

                        .head-bottom {
                            text-align: center;

                            a {
                                color: #fff;
                                text-decoration: none;
                            }

                            a:hover {
                                color: #666666;
                            }
                        }
                    }
                }
            }

            .el-container {
                height: calc(100% - 60px);

                .el-aside {
                    background-color: #d3dce6;

                    .el-menu {
                        border: none;
                        height: 100%;

                        .el-submenu {
                            i {
                                margin-right: 10px;
                            }
                        }
                    }
                }

                .el-main {
                    background-color: #e9eef3;
                }
            }
        }
    }
</style>