<template>
  <div>
    <blue-table
      v-loading="loading"
      useSelect
      :tableData="tableOptions.yearList"
      :totalCount="tableOptions.totalCount"
      :options="tableOptions.options"
      @editItem="editItem"
      @delItem="delItem"
      @delItems="delItem"
      @searchItem="searchItem"
    >
      <div slot="slot_status" slot-scope="scope">
        <el-tag v-if="scope.item.yearStatus === 1" size="mini">正常</el-tag>
        <el-tag v-if="scope.item.yearStatus === 2" size="mini">冻结</el-tag>
      </div>
    </blue-table>
  </div>
</template>
<script>
import {
  apiGetYearAdminList,
  apiEditYearAdminList,
  apiAddYearAdminList,
  apiDelYearAdminList
} from '@/api/baseInfo'
export default {
  data () {
    return {
      loading: false,
      tableOptions: {
        yearList: [],
        totalCount: 0,
        options: [
          {
            title: '编号',
            prop: 'yearId',
            formItem: true,
            disabled: true,
            hidden: true,
            type: 'text'
          },
          {
            title: '年度',
            prop: 'yearName',
            formItem: true,
            type: 'text',
            formOptions: {
              rules: [
                { required: true, message: '请输入年度名称', trigger: 'blur' }
              ]
            }
          },
          {
            title: '状态',
            prop: 'yearStatus',
            slot: 'slot_status',
            formItem: true,
            type: 'select',
            formOptions: {
              options: [
                { label: '正常', value: 1 },
                { label: '冻结', value: 2 }
              ],
              rules: [
                { required: true, message: '请输入年度名称', trigger: 'blur' }
              ]
            }
          },
          {
            title: '备注',
            prop: 'yearMemo',
            formItem: true,
            hidden: true,
            type: 'textarea',
            formOptions: {
              rules: [
                { required: true, message: '请输入年度名称', trigger: 'blur' }
              ]
            }
          },
          {
            title: '创建时间',
            prop: 'createTime',
            type: 'datetime',
            formOptions: {
              rules: [
                { required: true, message: '请选择时间', trigger: 'blur' }
              ]
            }
          }
        ]
      }
    }
  },

  mounted() {
    this.getData()
  },

  methods: {
    async getData(params) {
      this.loading = true
      const { records: mYearList, total: totalCount } = await apiGetYearAdminList(params)
      this.tableOptions.yearList = mYearList
      this.tableOptions.totalCount = totalCount
      this.loading = false
    },

    // 修改
    async editItem(item) {
      // 当接收到的一个叫编号的东西为空的时候，则为新增，反之则为编辑
      if (item.yearId) {
        await apiEditYearAdminList(item)
      } else {
        await apiAddYearAdminList(item)
      }
      await this.getData()
    },

    // 删除
    async delItem(item) {
      // 当被删除项目为数组的时候是多选
      if (item instanceof Array) {
        await apiDelYearAdminList(item.map(year => year.yearId).join(','))
      } else {
        item.yearId && await apiDelYearAdminList(item.yearId)
      }
      await this.getData()
    },

    // 搜索
    async searchItem(params) {
      await this.getData(params)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
