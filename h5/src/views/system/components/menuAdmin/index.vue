<template>
  <div class="container">
    <div class="role_control">
      <div class="role_control_list">
        <el-table :data="roleList">
          <el-table-column label="角色名称" prop="roleName" />
        </el-table>
      </div>
      <div class="role_control_tree">
        <h1>改角色所拥有的可操作菜单</h1>
        <el-tree
          :data="menuList"
          show-checkbox
          default-expand-all
          node-key="menuId"
          :props="{
            label: 'menuName',
            children: 'children'
          }"
        >
          <template slot-scope="scope">
            <div class="control">
              <div>
                <span>{{ scope.data.menuName }}</span>
              </div>
              <div @click.stop>
                <span
                  class="button"
                  @click="addMenu"
                >
                  增加菜单
                </span>
                <span
                  class="button primary"
                  @click="delMenu(scope.data.menuId)"
                >
                  修改菜单
                </span>
                <span
                  class="button danger"
                  @click="delMenu(scope.data.menuId)"
                >
                  删除菜单
                </span>
              </div>
            </div>
          </template>
        </el-tree>
      </div>
    </div>
    <blue-popup :show="showPopup" @hide="showPopup = false">sss</blue-popup>
  </div>
</template>
<script>
import {
  apiGetMenuList,
  apiGetRoleList,
  apiGetRoleInfo
} from '@/api/system'
export default {
  data() {
    return {
      showPopup: false,
      menuList: [],
      roleList: []
    }
  },

  mounted() {
    this.getMenuList()
    this.getRoleList()
    this.getRoleInfo(1)
  },

  methods: {
    // 获取全部路由菜单
    async getMenuList() {
      const mList = await apiGetMenuList()
      this.menuList = mList
    },

    // 获取角色列表
    async getRoleList() {
      const { records } = await apiGetRoleList()
      this.roleList = records
    },

    // 获取角色信息
    async getRoleInfo(roleId) {
      const mInfo = await apiGetRoleInfo(roleId)
      console.log(mInfo)
    },

    // 增加菜单
    async addMenu() {
      this.showPopup = true
    },

    // 增加菜单
    async delMenu(menuId) {
      console.log(menuId)
    }
  }
}
</script>
<style lang="less" scoped>
.container{
  ::v-deep.el-tree-node__content{
    padding: 5px 0;
  }
  .role_control{
    display: flex;
    .role_control_list{
      width: 300px;
    }
    .role_control_tree{
      flex: 1;
      border-left: 1px solid #f4f4f4;
      margin-left: 10px;
      h1{
        margin: 10px;
      }
      .control{
        font-size: 13px;
        width: 100%;
        align-items: center;
        display: flex;
        justify-content: space-between;
        .button{
          display: inline-block;
          margin-right: 10px;
          border: 1px solid #e0e0e0;
          padding: 2px 10px;
          transition: all .2s;
          border-radius: 2px;
          &.danger{
            background-color: #F23A3A;
            border-color: #F23A3A;
            color: #fff;
          }
          &.primary{
            background-color: #4b5cc4;
            border-color: #4b5cc4;
            color: #fff;
          }
          &:hover{
            background-color: var(--globalColor);
            color: #fff;
            border: 1px solid var(--globalColor);
          }
          &:active{
            background-color: #fff;
            color: #000;
            border: 1px solid var(--globalColor);
          }
        }
      }
    }
  }
}
</style>
