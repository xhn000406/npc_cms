<template>
  <div class="container">
    <div class="data_list">
      <blue-table
        v-loading="loading"
        :data="tableOptions.data"
        :options="tableOptions.options"
        @delItem="delItem"
        @editItem="editItem"
      />
    </div>
  </div>
</template>
<script>
import {
  apiGetRoleList,
  apiEditRoleInfo,
  apiDeleteRole
} from '@/api/system'
export default {
  data() {
    return {
      loading: false,
      tableOptions: {
        data: [],
        options: [
          {
            title: '编号',
            prop: 'roleId',
            formItem: true,
            type: 'text',
            disabled: true,
            formOptions: {
              rules: [
                { required: true, message: '请输入活动名称', trigger: 'blur' }
              ]
            }
          },
          {
            title: '角色名',
            prop: 'roleName',
            formItem: true,
            type: 'text',
            formOptions: {
              rules: [
                { required: true, message: '请输入角色名', trigger: 'blur' }
              ]
            }
          },
          {
            title: '角色标识',
            prop: 'roleKey',
            formItem: true,
            type: 'text',
            formOptions: {
              rules: [
                { required: true, message: '请输入角色标识', trigger: 'blur' }
              ]
            }
          },
          {
            title: '创建时间',
            prop: 'createTime',
            disabled: true,
            formItem: true,
            type: 'datetime'
          },
          {
            title: '更新时间',
            prop: 'updateTime',
            formItem: true,
            disabled: true,
            type: 'datetime'
          }
        ]
      }
    }
  },

  mounted() {
    this.getRoleList()
  },

  methods: {
    async delItem(item) {
      const { roleId } = item
      await apiDeleteRole(roleId)
      await this.getRoleList()
    },

    async editItem(item) {
      await apiEditRoleInfo(item)
      await this.getRoleList()
    },

    async getRoleList() {
      this.loading = true
      const { records } = await apiGetRoleList()
      this.tableOptions.data = records
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
</style>
