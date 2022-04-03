<template>
  <div class="container">
    <div class="data_list">
      <blue-table
        v-if="tableOptions.options[0]"
        v-loading="loading"
        useSelect
        :tableData="tableOptions.data"
        :options="tableOptions.options"
        :totalCount="tableOptions.totalCount"
        @pageChange="pageChange"
        @searchItem="searchItem"
        @editItem="editItem"
        @delItem="delItem"
        @delItems="delItems"
      >
        <div slot="slot_sex" slot-scope="scope">
          <div v-if="scope.item.sex === '0'">男</div>
          <div v-else>女</div>
        </div>
        <div slot="slot_roleNamesList" slot-scope="scope">
          <el-tag
            v-for="(item, i) in scope.item.roleNamesList"
            :key="i"
            size="mini"
            type="info"
            style="margin-right: 5px;"
          >
            {{ item }}
          </el-tag>
        </div>
      </blue-table>
    </div>
  </div>
</template>
<script>
import {
  apiAddUser,
  apiGetUserList,
  apiDeleteUser,
  apiEditUserInfo,
  apiGetRoleList
} from '@/api/system'
export default {
  data() {
    return {
      loading: false,
      tableOptions: {
        data: [],
        roleData: [],
        totalCount: 0,
        options: []
      }
    }
  },

  mounted() {
    this.getUserList()
  },

  methods: {
    async pageChange(page) {
      console.log(page)
    },

    async searchItem(item) {
      this.getUserList(item)
    },

    async delItems(items) {
      console.log(items)
    },

    async delItem(item) {
      const { userId } = item
      await apiDeleteUser(userId)
      this.getUserList()
    },

    async editItem(item) {
      if (item.userId) {
        await apiEditUserInfo(item)
      } else {
        await apiAddUser(item)
      }
      this.getUserList()
    },

    async getUserList(params) {
      this.loading = true
      const { records: userList, total } = await apiGetUserList(params)
      this.tableOptions.data = userList

      if (!this.tableOptions.roleData[0]) {
        const { records: roleList } = await apiGetRoleList()
        this.tableOptions.roleData = roleList?.map(item => {
          return {
            label: item.roleName,
            value: item.roleId
          }
        }) || []
      }
      
      this.tableOptions.totalCount = total

      this.tableOptions.options = [
        {
          title: '编号',
          prop: 'userId',
          formItem: true,
          hidden: true,
          type: 'text',
          disabled: true
        },
        {
          title: '账号',
          prop: 'userName',
          formItem: true,
          type: 'text',
          formOptions: {
            rules: [
              { required: true, message: '请输入账号', trigger: 'blur' }
            ]
          }
        },
        {
          title: '昵称',
          prop: 'nickName',
          formItem: true,
          type: 'text',
          formOptions: {
            rules: [
              { required: true, message: '请输入昵称', trigger: 'blur' }
            ]
          }
        },
        {
          title: '所属角色',
          prop: 'roleIdsList',
          slot: 'slot_roleNamesList',
          formItem: true,
          multiple: true,
          type: 'select',
          formOptions: {
            options: this.tableOptions.roleData,
            rules: [
              { required: true, message: '请选择角色', trigger: 'change' }
            ]
          }
        },
        {
          title: '手机号',
          prop: 'phonenumber',
          formItem: true,
          type: 'text',
          formOptions: {
            rules: [
              { required: true, message: '请输入手机号', trigger: 'blur' }
            ]
          }
        },
        {
          title: '性别',
          prop: 'sex',
          slot: 'slot_sex',
          formItem: true,
          type: 'select',
          formOptions: {
            options: [
              { label: '男', value: '0' },
              { label: '女', value: '1' }
            ],
            rules: [
              { required: true, message: '请选择性别', trigger: 'change' }
            ]
          }
        },
        {
          title: '创建时间',
          prop: 'createTime',
          formItem: true,
          type: 'datetime'
        },
        {
          title: '更新时间',
          prop: 'updateTime',
          formItem: true,
          type: 'datetime'
        }
      ]

      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
</style>
