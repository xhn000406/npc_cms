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
      <div class="role_select_button">
        <el-button @click="showAddMenuForm(0)">增加菜单</el-button>
      </div>
    </div>
    <div v-loading="loading" class="role_control">
      <h1>该角色所拥有的菜单</h1>
      <div class="role_control_tree">
        <el-tree
          :check-strictly="true"
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
                  v-if="scope.data.menuType !== 'F'"
                  class="button"
                  @click="showAddMenuForm(scope.data.menuId)"
                >
                  增加菜单
                </span>
                <span
                  class="button primary"
                  @click="editMenu(scope.data)"
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
    <blue-popup
      :show="showPopup"
      formName="增加菜单"
      @hide="showPopup = false"
      @submit="addMenu"
    >
      <el-form
        :model="menuForm"
        :rules="rules"
      >
        <el-form-item label="编号" prop="parentId">
          <el-input
            v-model="menuForm.parentId"
            disabled
            size="mini"
          />
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-select
            v-model="menuForm.menuType"
            size="mini"
          >
            <el-option label="目录" value="M" />
            <el-option label="菜单" value="C" />
            <el-option label="按钮" value="F" />
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="menuName">
          <el-input
            v-model="menuForm.menuName"
            size="mini"
            placeholder="例如：年度管理"
          />
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input
            v-model="menuForm.component"
            placeholder="例如：baseInfo/components/yearAdmin"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="浏览器显示标识符" prop="path">
          <el-input
            v-model="menuForm.path"
            placeholder="例如：yearAdmin"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="路由跳转标志符" prop="url">
          <el-input
            v-model="menuForm.url"
            placeholder="例如：YearAdmin"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input
            v-model="menuForm.icon"
            size="mini"
            placeholder="例如：menu_set"
          />
        </el-form-item>
      </el-form>
    </blue-popup>
  </div>
</template>
<script>
import {
  apiGetMenuList,
  apiAssociationRoleMenu,
  apiRemoveRoleMenu,
  apiEditMenuItem
} from '@/api/system/menu'
import {
  apiGetRoleList,
  apiGetRoleMenu,
  apiAddRoleMenu
} from '@/api/system/role'
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
      },
      menuForm: {
        parentId: 0,
        component: null,
        createUserno: null,
        icon: null,
        menuName: null,
        menuType: 'C',
        path: null,
        query: null,
        remark: null,
        url: null
      },
      rules: {
        component: [
          { required: true, message: '请输入组件路径', trigger: 'blur' }
        ],
        menuName: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        menuType: [
          { required: true, message: '请选择菜单类型', trigger: 'change' }
        ],
        path: [
          { required: true, message: '请输入浏览器显示标识符', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入路由跳转标志符', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请输入菜单图标', trigger: 'blur' }
        ],
      }
    }
  },

  mounted() {
    this.getData()
  },

  methods: {
    async getData() {
      this.loading = true
      await this.getRoleList()
      if (this.roleList && this.roleList.length > 0) {
        const mRoleId = this.roleList[0].roleId
        this.form.roleId = mRoleId
        await this.getRoleMenu(mRoleId)
      }
      this.loading = false
    },

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
      if (this.menuForm.menuId) {
        await apiEditMenuItem(this.menuForm)
      } else {
        await apiAddRoleMenu(this.menuForm)
      }
      await this.getRoleMenu(this.form.roleId)
    },

    showAddMenuForm(parentId) {
      this.menuForm = {}
      this.menuForm.parentId = parentId
      this.showPopup = true
    },

    // 增加菜单
    async delMenu(menuId) {
      console.log(menuId)
    },

    // 修改菜单
    async editMenu(item) {
      this.menuForm = item
      this.showPopup = true
      console.log(item)
    },

    // 选中角色
    async selectRole(roleId) {
      this.form.roleId = roleId
      this.getRoleMenu(roleId)
    },

    // 关联角色与菜单 
    async associationRoleMenu(item) {
      console.log(item)
      const { menuId, has } = item
      const { roleId }  = this.form
      if (has) {
        await apiRemoveRoleMenu({ menuId, roleId })
      } else {
        await apiAssociationRoleMenu({ menuId, roleId })
      }
      this.$msg({
        message: '操作成功',
        type: 'success'
      })
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
  display: flex;
  .role_select{
    .role_select_button{
      width: 100%;
    }
  }
  .role_control{
    border-left: 1px solid #f4f4f4;
    margin-left: 10px;
    padding: 0 10px;
    flex: 1;
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
h1{
  margin: 0 0 10px;
}
</style>
