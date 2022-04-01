<template>
  <div class="container">
    <el-button @click="selectItem">增加数据</el-button>
    <table
      class="data_table"
      cellpadding="0"
      cellspacing="0"
    >
      <tr>
        <th v-if="useSelect">
          <el-checkbox />
        </th>
        <th v-for="(title, i) in tableOption.titleGroup" :key="i">
          <div>{{ title }}</div>
        </th>
        <th v-if="useControl">操作</th>
      </tr>
      <tr v-for="(item, i) in data" :key="i">
        <td v-if="useSelect">
          <el-checkbox />
        </td>
        <template v-for="(key, n) in options">
          <td v-if="!key.hidden" :key="n">
            <slot v-if="key.slot" :name="key.slot" :item="item"></slot>
            <div v-else>{{ item[key.prop] }}</div>
          </td>
        </template>
        <td v-if="useControl">
          <el-button
            size="mini"
            type="primary"
            circle
            icon="el-icon-edit"
            title="编辑"
            @click="selectItem(item)"
          />
          <el-button
            size="mini"
            type="danger"
            circle
            title="删除"
            icon="el-icon-delete"
            @click="deleteItem(item)"
          />
        </td>
      </tr>
    </table>
    <blue-popup
      :show="showPopup"
      :formName="formName"
      @hide="showPopup = false"
      @submit="editItem"
    >
      <el-form
        :model="selectForm"
        :rules="formOption.rules"
      >
        <template v-for="(item, i) in options">
          <el-form-item
            v-if="item.formItem"
            :prop="item.prop"
            :key="i"
            :label="item.title"
          >
            <el-input
              v-if="item.type === 'text'"
              clearable
              size="mini"
              :placeholder="'请输入' + item.title"
              :disabled="item.disabled"
              v-model="selectForm[item.prop]"
            />
            <el-date-picker
              v-if="item.type === 'datetime'"
              v-model="selectForm[item.prop]"
              type="datetime"
              size="mini"
              clearable
              value-format="yyyy-MM-dd HH:mm:ss"
              :disabled="item.disabled"
              placeholder="选择日期"
            />
            <el-date-picker
              v-if="item.type === 'date'"
              v-model="selectForm[item.prop]"
              type="date"
              size="mini"
              clearable
              :disabled="item.disabled"
              placeholder="选择日期"
            />
            <el-time-select
              v-if="item.type === 'time'"
              v-model="selectForm[item.prop]"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:45'
              }"
              size="mini"
              clearable
              :disabled="item.disabled"
              placeholder="选择时间"
            />
            <el-select
              v-if="item.type === 'select'"
              v-model="selectForm[item.prop]"
              placeholder="请选择"
              size="mini"
              :disabled="item.disabled"
            >
              <el-option
                v-for="option in item.formOptions.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </template>
      </el-form>
    </blue-popup>
  </div>
</template>
<script>
export default {
  props: {
    useControl: {
      type: Boolean,
      default: true
    },
    useSelect: {
      type: Boolean,
      default: false
    },
    formName: {
      type: String,
      default: '编辑数据'
    },
    data: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    formatDate(date) {
      console.log(date)
      return date
    }
  },
  
  data() {
    return {
      showPopup: false,
      tableOption: {
        titleGroup: []
      },
      formOption: {
        formItems: [],
        rules: []
      },
      checkItems: [],
      selectForm: {}
    }
  },

  methods: {
    // 选中某一条表项进行修改
    selectItem(item) {
      this.showPopup = true
      this.selectForm = JSON.parse(JSON.stringify(item))
    },

    // 选中某一条表项进行删除
    deleteItem(item) {
      this.$confirm('确定删除该条目？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$msg({
          type: 'success',
          message: '删除成功!'
        })
        this.$emit('delItem', item)
      }).catch(() => {
        this.$msg({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 当用户点击了确定修改的按钮
    editItem() {
      this.$emit('editItem', this.selectForm)
    }
  },

  mounted() {
    const mTitleGroup = []
    const mRules = {}
    this.options.forEach(item => {
      !item.hidden && mTitleGroup.push(item.title)
      if (item.formItem) {
        const mFormItemOptions = item.formOptions
        if (mFormItemOptions){
          mRules[item.prop] = mFormItemOptions.rules
        }
      }
    })
    this.formOption = {
      rules: mRules,
      formItems: this.options
    }
    this.tableOption.titleGroup = mTitleGroup
  }
}
</script>
<style lang="less" scoped>
.container {
  .data_table {
    text-align: center;
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
    font-size: 14px;
    th {
      background-color: #f4f4f4;
      font-weight: 400;
      color: #666;
      font-size: 14px;
      user-select: none;
    }
    td,
    th {
      padding: 10px;
      border-bottom: 1px solid #f4f4f4;
    }
    td {
      padding: 20px 10px;
    }
    tr {
      &:hover {
        background-color: #f4f4f4;
      }
    }
  }
}
</style>
