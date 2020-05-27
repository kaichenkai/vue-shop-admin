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
            <!-- 主体 -->
            <el-container>
                <!-- 侧边栏 -->
                <el-aside :style="{width:'200px', height:'100%'}">
                    <!--                            @open="handleOpen"-->
                    <!--                            @close="handleClose"-->
                    <el-menu
                            :unique-opened="true"
                            :router="true"
                            default-active="roles"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">   <!--默认选中-->
                        <!--一级菜单-->
                        <el-submenu :index="item1.path" v-for="(item1, index1) in MenuList" :key="index1">
                            <template slot="title">
                                <i :class="iconObj[item1.id]"></i>
                                <span>{{item1.authName}}</span>
                            </template>
                            <!-- 导航开启路由模式：
                                将index值作为导航路由 -->
                            <!-- 二级菜单的模板区域 -->
                            <el-menu-item :index="item2.path" v-for="(item2, index2) in item1.children" :key="index2">
                                <i class="el-icon-menu"></i>
                                <span>{{item2.authName}}</span>
                            </el-menu-item>
                        </el-submenu>
                        <!--<2>-->
                        <!--                        <el-submenu index="2">-->
                        <!--                            <template slot="title">-->
                        <!--                                <i :class="iconObj[103]"></i>-->
                        <!--                                <span>权限管理</span>-->
                        <!--                            </template>-->
                        <!--                            <el-menu-item index="/role">-->
                        <!--                                <i class="el-icon-menu"></i>-->
                        <!--                                <span>角色列表</span>-->
                        <!--                            </el-menu-item>-->
                        <!--                            <el-menu-item index="/rights">-->
                        <!--                                <i class="el-icon-menu"></i>-->
                        <!--                                <span>权限列表</span>-->
                        <!--                            </el-menu-item>-->
                        <!--                        </el-submenu>-->
                        <!--                        &lt;!&ndash;<3>&ndash;&gt;-->
                        <!--                        <el-submenu index="3">-->
                        <!--                            <template slot="title">-->
                        <!--                                <i :class="iconObj[101]"></i>-->
                        <!--                                <span>商品管理</span>-->
                        <!--                            </template>-->
                        <!--                            <el-menu-item index="3-1">-->
                        <!--                                <i class="el-icon-menu"></i>-->
                        <!--                                <span>商品列表</span>-->
                        <!--                            </el-menu-item>-->
                        <!--                            <el-menu-item index="3-2">-->
                        <!--                                <i class="el-icon-menu"></i>-->
                        <!--                                <span>分类参数</span>-->
                        <!--                            </el-menu-item>-->
                        <!--                            <el-menu-item index="3-3">-->
                        <!--                                <i class="el-icon-menu"></i>-->
                        <!--                                <span>商品分类</span>-->
                        <!--                            </el-menu-item>-->
                        <!--                        </el-submenu>-->
                        <!--                        &lt;!&ndash;<4>&ndash;&gt;-->
                        <!--                        <el-submenu index="4">-->
                        <!--                            <template slot="title">-->
                        <!--                                <i :class="iconObj[102]"></i>-->
                        <!--                                <span>订单管理</span>-->
                        <!--                            </template>-->
                        <!--                            <el-menu-item index="4-1">-->
                        <!--                                <i class="el-icon-menu"></i>-->
                        <!--                                <span>订单列表</span>-->
                        <!--                            </el-menu-item>-->
                        <!--                        </el-submenu>-->
                        <!--                        &lt;!&ndash;<5>&ndash;&gt;-->
                        <!--                        <el-submenu index="5">-->
                        <!--                            <template slot="title">-->
                        <!--                                <i :class="iconObj[145]"></i>-->
                        <!--                                <span>数据统计</span>-->
                        <!--                            </template>-->
                        <!--                            <el-menu-item index="5-1">-->
                        <!--                                <i class="el-icon-menu"></i>-->
                        <!--                                <span>数据报表</span>-->
                        <!--                            </el-menu-item>-->
                        <!--                        </el-submenu>-->

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
        this.$router.push({ name: "login" });
      }
    },
    data() {
      return {
        MenuList: [],//菜单列表
        iconObj: {
          "125": "iconfont icon-user",
          "103": "iconfont icon-tijikongjian",
          "101": "iconfont icon-shangpin",
          "102": "iconfont icon-danju",
          "145": "iconfont icon-baobiao"
        }
      };

    },
    mounted() {
      this.getMenuList();
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
        this.$router.push({ name: "login" });
      },

      // 获取导航菜单
      async getMenuList() {
        const resp = await this._service.get(`menus`);
        const { data, meta: { status, msg } } = resp.data;
        if (status === 200) {
          this.MenuList = data;
        } else {
          this.$message.error(msg);
        }
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