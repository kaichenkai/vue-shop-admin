<template>
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{name: 'role'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--添加角色-->
        <el-col :span=10 class="add-role">
            <el-button type="primary" @click="showAddRoleDialog()">添加角色</el-button>
        </el-col>

        <!--表格数据-->
        <el-table
                :data="roleList"
                border
                height="100%"
                style="width: 100%; font-size: 14px"
                class="box-table"
        >
            <!--展开行-->
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-row v-for="(item1, index) in scope.row.children" :key="index"
                            style="border-top: 1px solid #e6e6e6; border-bottom: 1px solid #e6e6e6; margin: 20px 0; padding: 5px 0"
                    >
                        <!--一级权限-->
                        <el-col :span="4">
                            <el-tag type="success"
                                    closable
                                    @close="deleteRights(scope.row, item1.id)"
                            >{{item1.authName}}
                            </el-tag>
                            <i class="el-icon-caret-right"></i>
                        </el-col>
                        <el-col :span="20">
                            <el-row v-for="(item2, index) in item1.children" :key="index" style="padding: 5px 0">
                                <!--二级权限-->
                                <el-col :span="4">
                                    <el-tag
                                            closable
                                            @close="deleteRights(scope.row, item2.id)"
                                    >{{item2.authName}}
                                    </el-tag>
                                    <i class="el-icon-caret-right"></i>
                                </el-col>
                                <el-col :span="20">
                                    <!--三级权限-->
                                    <el-col>
                                        <el-tag
                                                closable
                                                @close="deleteRights(scope.row, item3.id)"
                                                style="margin-right: 5px"
                                                type="warning"
                                                v-for="(item3, index) in item2.children"
                                                :key="index">
                                            {{item3.authName}}
                                        </el-tag>
                                    </el-col>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <!--无权限提示-->
                    <span v-if="scope.row.children.length === 0">未分配权限</span>
                </template>
            </el-table-column>

            <el-table-column
                    type="index"
                    label="#"
                    width="100"
                    align="left">
            </el-table-column>
            <el-table-column
                    prop="roleName"
                    label="角色名称">
            </el-table-column>
            <el-table-column
                    prop="roleDesc"
                    label="角色描述">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            @click="showEditUserDialog(scope.row)"
                    >编辑
                    </el-button>
                    <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="showDelRoleDialog(scope.row)"
                    >删除
                    </el-button>
                    <el-button
                            type="warning"
                            icon="el-icon-setting"
                            size="mini"
                            @click="showSetRightsDialog(scope.row)"
                    >分配权限
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分配权限对话框-->
        <el-dialog
                title="提示"
                :visible.sync="showSetRightsDialogVisible"
                width="30%">
            <!--
            树形控件
            rightsList: 数据源 []
            show-checkbox: 选择框
            default-expanded-keys: 默认展开的节点 id
            default-checked-keys: 要选择的节点 id
            props: 配置项 {label, children}
                label: 文字标题
                children: 子节点的key名
            -->

            <!--               :default-expanded-keys="expandedKeys"-->
            <el-tree
                    ref="tree"
                    :data="rightsList"
                    show-checkbox
                    node-key="id"
                    :default-expand-all="true"
                    :default-checked-keys="checkedKeys"
                    :props="defaultProps">
            </el-tree>
            <span slot="footer" class="dialog-footer">
            <el-button @click="showSetRightsDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="setRights()">确 定</el-button>
          </span>
        </el-dialog>

        <!--添加角色对话框-->
        <el-dialog
                title="添加角色"
                :visible.sync="showAddRoleDialogVisible"
                width="30%"
                center>
            <el-form label-position="left" label-width="80px" :model="addRoleFrom">
                <el-form-item label="角色名称:">
                    <el-input v-model="addRoleFrom.roleName" clearable></el-input>
                </el-form-item>
                <el-form-item label="角色描述:">
                    <el-input v-model="addRoleFrom.roleDesc" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showAddRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRole()">确 定</el-button>
            </span>
        </el-dialog>

        <!--编辑角色对话框-->
        <el-dialog
                title="编辑角色"
                :visible.sync="showEditRoleDialogVisible"
                width="30%"
                center>
            <el-form label-position="left" label-width="80px" :model="editRoleFrom">
                <el-form-item label="角色名称:">
                    <el-input v-model="editRoleFrom.roleName" clearable></el-input>
                </el-form-item>
                <el-form-item label="角色描述:">
                    <el-input v-model="editRoleFrom.roleDesc" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showEditRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateRole()">确 定</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>

<script>
  export default {
    name: "role",
    data() {
      return {
        roleList: [],
        showAddRoleDialogVisible: false,//显示添加角色对话框
        showSetRightsDialogVisible: false,//显示分配权限对话框
        showEditRoleDialogVisible: false,//显示编辑角色对话框
        addRoleFrom: {},//添加角色表单数据
        editRoleFrom: {
          rid: -1,
          roleName: "",
          roleDesc: ""
        },//编辑角色表单数据
        // 树形控件属性
        currentRoleId: -1,
        rightsList: [],
        expandedKeys: [],
        checkedKeys: [],
        defaultProps: {
          label: "authName",
          children: "children"
        }
      };
    },
    mounted() {
      this.getRoleList();
    },
    methods: {
      // 显示编辑角色对话框
      async showEditUserDialog(role) {
        // 显示对话框
        this.showEditRoleDialogVisible = true;
        // 请求当前用户数据
        const resp = await this._service.get(`roles/${role.id}`);
        const { data, meta: { msg, status } } = resp.data;
        if (status === 200) {
          this.editRoleFrom.rid = data.roleId;
          this.editRoleFrom.roleName = data.roleName;
          this.editRoleFrom.roleDesc = data.roleDesc;
        } else {
          this.$message.error(msg);
        }
      },
      // 更新用户信息
      async updateRole() {
        const resp = await this._service.put(`roles/${this.editRoleFrom.rid}`, this.editRoleFrom);
        const { meta: { msg, status } } = resp.data;
        if (status === 200) {
          // 提示信息
          // console.log(msg); //提示获取成功 ?
          // this.$message.success(msg);
          // 清除对话框内容
          this.editRoleFrom= {
            rid: -1,
            roleName: "",
            roleDesc: ""
          };
          // 重新加载 roleList
          this.getRoleList();
          // 关闭对话框
          this.showEditRoleDialogVisible = false;
        } else {
          this.$message.error(msg);
        }
      },

      // 显示删除角色对话框 + 删除
      showDelRoleDialog(role) {
        this.$confirm("此操作将永久删除角色?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(async () => {
          const resp = await this._service.delete(`roles/${role.id}`);
          const { meta: { msg, status } } = resp.data;
          if (status === 200) {
            this.$message.success(msg);
            // 重新加载角色列表
            this.getRoleList();
          } else {
            this.$message.error(msg);
          }
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },


      // 显示添加角色对话框
      showAddRoleDialog() {
        this.showAddRoleDialogVisible = true;
      },
      // 添加角色
      async addRole() {
        const resp = await this._service.post(`roles`, this.addRoleFrom);
        const { meta: { status, msg } } = resp.data;
        if (status === 201) {
          this.addRoleFrom = {};
          this.showAddRoleDialogVisible = false;
          this.getRoleList();
          this.$message.success(msg);
        } else {
          this.$message.error(msg);
        }
      },

      // 获取角色列表: roles
      async getRoleList() {
        const resp = await this._service.get("roles");
        const { data, meta: { msg, status } } = resp.data;
        if (status === 200) {
          this.roleList = data;
          // // 权限列表 (这里的数据为什么不能用做树形图展示呢 ?)
          // for (const role1 of data) {
          //   // 第一层
          //   const rights = role1.children;
          //   this.rightsList.push(rights[0]);
          //   // 第二层
          //   for (const role2 in this.rightsList[0].children) {
          //     const rights = role2.children;
          //     this.rightsList.push(rights[0]);
          //     // 第三层
          //     for (const role3 in this.rightsList[0].children) {
          //       const rights = role3.children;
          //       this.rightsList.push(rights[0]);
          //     }
          //   }
          // }
          // console.log(this.rightsList);
          this.$message.success(msg);
        } else {
          this.$message.error(msg);
        }
      },

      // 删除权限: roles/:roleId/rights/:rightId
      async deleteRights(role, rightsId) {
        const resp = await this._service.delete(`roles/${role.id}/rights/${rightsId}`);
        const { data, meta: { msg, status } } = resp.data;
        if (status === 200) {
          // 更新权限列表数据, 找到对应的 role, 将data设置给 children 属性
          // data 是该角色的一, 二, 三级权限
          role.children = data;
          this.$message.success(msg);
        } else {
          this.$message.error(msg);
        }
      },

      // 显示分配权限对话框
      async showSetRightsDialog(role) {
        this.showSetRightsDialogVisible = true;
        this.checkedKeys = [];
        this.currentRoleId = role.id;
        // 获取权限列表: rights/:type type: list(列表形式) tree(树状图形式)
        const resp = await this._service.get("rights/tree");
        const { data, meta: { msg, status } } = resp.data;
        if (status === 200) {
          this.rightsList = data;
          // 默认展开所有权限
          // data.forEach((item1) => {
          //   this.expandedKeys.push(item1.id);
          //   item1.children.forEach((item2) => {
          //     this.expandedKeys.push(item2.id);
          //     item2.children.forEach((item3) => {
          //       this.expandedKeys.push(item3.id);
          //     });
          //   });
          // });
          // console.log(this.expandedKeys);

          // 获取已设置权限的 id 值 (3级权限全部勾选, 则2级选线自动勾选, 一级权限同理)
          role.children.forEach(item1 => {
            // this.checkedKeys.push(item1.id);
            item1.children.forEach(item2 => {
              // this.checkedKeys.push(item2.id);
              item2.children.forEach(item3 => {
                this.checkedKeys.push(item3.id);
              });
            });
          });
          // console.log(this.checkedKeys);
        } else {
          this.$message.error(msg);
        }
      },

      // 分配权限: roles/:roleId/rights
      async setRights() {
        // 1.获取全选的节点 id 数组: getCheckedKeys()
        // 2.获取半选的节点 id 数组: getHalfCheckedKeys()
        // 使用el-tree 标签对象调用方法
        // ES-6: 展开运算符, 将两个数组拼接在一起
        let arr1 = this.$refs.tree.getCheckedKeys();
        let arr2 = this.$refs.tree.getHalfCheckedKeys();
        let rids = [...arr1, ...arr2];
        const resp = this._service.post(`roles/${this.currentRoleId}/rights`, { rids: rids.toString() });
        console.log(resp);
        this.getRoleList();
        this.showSetRightsDialogVisible = false;
        // const {meta: {msg, status}} = resp.data;
        // if (status === 200) {
        //   this.showSetRightsDialogVisible = false;
        //   this.$message.success(msg);
        // } else {
        //   this.$message.error(msg);
        // }
      }
    }
  };
</script>

<style scoped lang="less">
    .box-card {
        height: 100%;
        width: 100%;
        box-sizing: border-box;

        .add-role {
            margin: 20px 0;
        }

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
