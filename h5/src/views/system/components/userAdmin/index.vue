<template>
  <div class="container">
    <div class="data_list">
      <blue-table
        v-loading="loading"
        useSelect
        :tableData="tableOptions.data"
        :options="tableOptions.options"
        @delItem="delItem"
        @editItem="editItem"
        @delItems="delItems"
      >
        <div slot="slot_sex" slot-scope="scope">
          <div v-if="scope.item.sex === '0'">男</div>
          <div v-else>女</div>
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
  apiEditUserInfo
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
            prop: 'userId',
            formItem: true,
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
      }
    }
  },

  mounted() {
    this.getUserList()
  },

  methods: {
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

    async getUserList() {
      this.loading = true
      const { records } = await apiGetUserList()
      this.tableOptions.data = records
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
</style>
