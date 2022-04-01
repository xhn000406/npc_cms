<template>
  <div class="container">
    <div class="role_select">
      <h1>请选择角色</h1>
      <el-select
        v-model="form.roleId"
        placeholder="请选择"
        size="mini"
        @change="selectRole"
      >
        <el-option
          v-for="item in roleList"
          :key="item.roleId"
          :label="item.roleName"
          :value="item.roleId"
        />
      </el-select>
    </div>
    <div v-loading="loading" class="role_control">
      <div class="role_control_tree">
        <el-tree
          :data="menuList"
          :default-checked-keys="checkGroups"
          show-checkbox
          default-expand-all
          node-key="menuId"
          :props="{
            label: 'menuName',
            children: 'children'
          }"
          @check="associationRoleMenu"
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
  apiGetRoleMenu,
  apiAssociationRoleMenu
} from '@/api/system'
export default {
  data() {
    return {
      loading: false,
      showPopup: false,
      menuList: [],
      roleList: [],
      checkGroups: [],
      form: {
        roleId: null
      }
    }
  },

  mounted() {
    this.getRoleList()
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

    // 获取角色菜单
    async getRoleMenu(roleId) {
      this.loading = true
      const mMenu = await apiGetRoleMenu(roleId)
      this.checkGroups = this.getHasMenu(mMenu)
      this.menuList = mMenu
      this.loading = false
    },

    // 增加菜单
    async addMenu() {
      this.showPopup = true
    },

    // 增加菜单
    async delMenu(menuId) {
      console.log(menuId)
    },

    // 选中角色
    async selectRole(roleId) {
      this.form.roleId = roleId
      this.getRoleMenu(roleId)
    },

    // 关联角色与菜单 
    async associationRoleMenu(item) {
      const { menuId } = item
      const { roleId }  = this.form
      await apiAssociationRoleMenu({ menuId, roleId })
    },

    // 获取角色拥有的菜单项
    getHasMenu(menu) {
      let mKey = []
      menu.forEach(item => {
        if (item.has) {
          mKey.push(item.menuId)
        }
        if (item.children) {
          mKey.push(...this.getHasMenu(item.children))
        }
      })
      return mKey
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
