<template>
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{name: 'root'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--搜索框-->
        <el-row>
            <el-col :span=8 class="search">
                <el-input
                        placeholder="请输入内容"
                        v-model="searchContent"
                        clearable
                        @clear="loadUserList()"
                        class="input-with-select"
                >
                    <el-button slot="append" icon="el-icon-search" @click.prevent="searchGoods()"></el-button>
                </el-input>
            </el-col>
            <!--添加商品-->
            <el-col :span=14 class="add-goods">
                <el-button type="primary" @click="addGoods()">添加商品</el-button>
            </el-col>
        </el-row>
        <!--表格数据渲染-->
        <!--                        height="calc(100% - 114px)"-->
        <el-table
                :data="goodsList"
                height="calc(100% - 214px)"
                style="width: 100%; font-size: 14px"
                class="box-table"
        >
            <el-table-column
                    type="index"
                    label="#"
                    width="50"
                    align="left">
            </el-table-column>
            <!--            width="800"-->
            <el-table-column
                    prop="goods_name"

                    label="商品名称">
            </el-table-column>
            <el-table-column
                    prop="goods_price"
                    label="商品价格(元)"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="goods_weight"
                    label="商品重量"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="goods_number"
                    label="商品数量"
                    width="150">
            </el-table-column>

            <!--prop="create_time"-->
            <el-table-column
                    label="创建日期"
                    width="200">
                <!--如果单元格内显示的内容不是文本字符串
                需要给被显示的内容外层包裹一个 template 标签-->

                <!--template 内部要用数据, 设置 slot-scope 属性
                该属性的值是要用数据的数据源的key-->

                <!--slot-scope 的值 userList 其实就是 el-table 绑定的数据 goodsList,
                goodsList.row -> 数组中的每个具体对象-->
                <template slot-scope="scope">
                    {{scope.row.add_time | formatDate("YYYY-MM-DD HH:mm:ss")}}
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="150">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-edit"
                            circle
                            @click="showEditGoodsDialog(scope.row.id)"
                    ></el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            @click="showDelGoodsDialog(scope.row.id)"
                    ></el-button>
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
    name: "goodsList",
    data() {
      return {
        goodsList: [],
        searchContent: "",//搜索内容

        // 分页相关
        pagenum: 1,
        pagesize: 24,
        totalpage: 0,
        total: 0
      };
    },
    mounted() {
      this.getGoodsList();
    },
    methods: {
      //获取商品列表
      async getGoodsList() {
        const resp = await this._service.get(`goods?query=${this.searchContent}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
        const { data: { goods, total, pagenum }, meta: { status, msg } } = resp.data;
        if (status === 200) {
          // console.log(data);
          this.goodsList = goods;
          this.total = total;
          this.pagenum = parseInt(pagenum);
          // console.log(this.goodsList);
        } else {
          this.$message.error(msg);
        }
      },
      showEditGoodsDialog(goodsId) {
        console.log(goodsId);
      },
      showDelGoodsDialog(goodsId) {
        console.log(goodsId);
      },

      // 分页相关方法
      // handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      // },
      handleCurrentChange(pagenum) {
        this.pagenum = pagenum;
        this.getUserList();
      },

      //添加商品
      addGoods() {
        this.$router.push({name: "addGoods"})
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
        height: 100% !important; // 滚动条
    }
</style>