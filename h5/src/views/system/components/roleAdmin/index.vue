<template>
  <div class="container">
    <div class="data_list">
      <blue-table
        v-loading="loading"
        :data="tableOptions.data"
        :options="tableOptions.options"
        @delItem="delItem"
        @editItem="editItem"
      >
        <div slot="slot_status" slot-scope="scope">
          <div v-if="scope.item.status === '0'">正常</div>
          <div v-else>停用</div>
        </div>
      </blue-table>
    </div>
  </div>
</template>
<script>
import {
  apiGetRoleList,
  apiEditRoleInfo,
  apiDeleteRole,
  apiAddRole
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
            disabled: true
          },
          {
            title: '角色序号',
            prop: 'roleSort',
            formItem: true,
            type: 'text',
            formOptions: {
              rules: [
                { required: true, message: '角色序号', trigger: 'blur' }
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
            title: '角色状态',
            prop: 'status',
            slot: 'slot_status',
            formItem: true,
            type: 'select',
            formOptions: {
              options: [
                { label: '正常', value: '0' },
                { label: '停用', value: '1' }
              ],
              rules: [
                { required: true, message: '请输入角色标识', trigger: 'blur' }
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
      if (item.roleId) {
        await apiEditRoleInfo(item)
      } else {
        await apiAddRole(item)
      }
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
