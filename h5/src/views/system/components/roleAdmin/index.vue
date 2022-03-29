<template>
  <div class="container">
    <div class="data_list">
      <el-table :data="roleList">
        <el-table-column align="center" type="selection" />
        <el-table-column prop="roleId" label="编号" />
        <el-table-column prop="roleName" label="角色名" />
        <el-table-column prop="roleKey" label="角色标识" />
        <el-table-column label="操作">
          <el-button
            size="mini"
            type="primary"
            circle
            icon="el-icon-edit"
            @click="showPopup = true"
          />
          <el-button
            size="mini"
            type="danger"
            circle
            icon="el-icon-delete"
          />
        </el-table-column>
      </el-table>
    </div>
    <div class="data_edit">
      <blue-popup :show="showPopup" @hide="showPopup = false">
        <el-form>
          <el-form-item label="改东西">
            <el-input />
          </el-form-item>
        </el-form>
      </blue-popup>
    </div>
  </div>
</template>
<script>
import {
  apiGetRoleList
} from '@/api/system'
export default {
  data() {
    return {
      showPopup: false,
      roleList: []
    }
  },

  mounted() {
    this.getRoleList()
  },

  methods: {
    async getRoleList() {
      const { records } = await apiGetRoleList()
      this.roleList = records
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  .data_list {
  }
  .data_edit {
  }
}
</style>
