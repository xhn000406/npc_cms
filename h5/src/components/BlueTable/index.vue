<template>
  <div
    class="container"
  >
    <div class="data_control">
      <div class="data_control_left">
        <select-input
          :selectOptions="options"
          @searchItem="searchItem"
        />
      </div>
    </div>
    <div class="data_control">
      <div class="data_control_right">
        <template v-for="(button, i) in buttonGroup">
          <el-button
            v-if="button.show"
            :key="i"
            :icon="button.icon"
            :type="button.type"
            size="mini"
            @click="buttonClick(button.event)"
          >
            {{ button.title }}
          </el-button>
        </template>
        <!-- <el-button
          icon="el-icon-plus"
          size="mini"
          type="primary"
          @click="selectItem"
        >
          增加数据
        </el-button>
        <el-button
          icon="el-icon-upload2"
          size="mini"
          @click="showUpload = true"
        >
          导入数据
        </el-button>
        <el-button
          v-throttle
          icon="el-icon-download"
          size="mini"
          @click="$emit('exportData')"
        >
          导出数据
        </el-button>
        <el-button
          v-if="useSelect"
          icon="el-icon-delete"
          size="mini"
          type="danger"
          @click="deleteItems"
        >
          删除选中
        </el-button> -->
      </div>
    </div>
    <table
      class="data_table"
      cellpadding="0"
      cellspacing="0"
    >
      <tr>
        <th v-if="useSelect">
          <input type="checkbox" v-model="checkAll" @change="setCheckAll">
        </th>
        <th v-for="(title, i) in tableOption.titleGroup" :key="i">
          <div>{{ title }}</div>
        </th>
        <th v-if="useControl">操作</th>
      </tr>
      <tr v-for="(item, i) in tableData" :key="i">
        <td v-if="useSelect">
          <input type="checkbox" v-model="item.checked" @change="showDeleteAllButton = true">
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
    <div
      v-if="!tableData[0]"
      class="noContext"
    >
      没东西喔
    </div>
    <!-- 分页条 -->
    <div class="data_page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="changePage"
      />
    </div>
    <!-- 编辑表单 -->
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
            <el-input
              v-if="item.type === 'textarea'"
              type="textarea"
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
              :multiple="item.multiple"
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
    <blue-popup
      position="center"
      formName="导入数据"
      :useButton="false"
      :show="showUpload"
      @hide="showUpload = false"
    >
      <upload-panel
        :uploadApi="uploadApi"
        @downloadTemplate="$emit('downloadTemplate')"
      />
    </blue-popup>
  </div>
</template>
<script>
import UploadPanel from './components/UploadPanel'
import SelectInput from './components/SelectInput'
export default {
  components: { SelectInput, UploadPanel },
  props: {
    uploadApi: {
      type: String,
      default: ''
    },
    totalCount: {
      type: Number,
      default: 0
    },
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
    tableData: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    button: {
      type: Array,
      default: () => []
    },
    
  },
  
  data() {
    return {
      checkAll: false,
      showPopup: false,
      showUpload: false,
      searchForm: [],
      tableOption: {
        titleGroup: []
      },
      formOption: {
        formItems: [],
        rules: []
      },
      checkItems: [],
      selectForm: {},
      buttonGroup: [
        { title: '增加数据', show: true, type: 'primary', icon: 'el-icon-plus', event: 'add' },
        { title: '导入数据', show: true, type: 'default', icon: 'el-icon-upload2', event: 'import' },
        { title: '导出数据', show: true, type: 'default', icon: 'el-icon-download', event: 'export' },
        { title: '删除选中', show: this.useSelect, type: 'danger', icon: 'el-icon-delete', event: 'del' }
      ]
    }
  },

  methods: {
    buttonClick(type) {
      if (type === 'add') {
        this.selectItem({})
      }
      if (type === 'import') {
        this.showUpload = true
      }
      if (type === 'export') {
        this.$emit('exportData')
      }
      if (type === 'del') {
        this.deleteItems()
      }
    },

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
        this.$emit('delItem', item)
      })
    },

    // 搜索被点击
    searchItem(searchItem) {
      this.$emit('searchItem', searchItem)
    },

    // 删除多选选中项目
    deleteItems() {
      const mCheckItems = []
      this.tableData.map(item => {
        item.checked && mCheckItems.push(item)
      })
      if (mCheckItems.length === 0) {
        this.$msg({
          message: '未选中任何条目'
        })
      } else {
        this.$confirm('确定删除选中的条目？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delItems', mCheckItems)
        })
      }
    },

    // 当用户点击了确定修改的按钮
    editItem() {
      this.$emit('editItem', this.selectForm)
    },

    // 表格全选
    setCheckAll() {
      this.tableData.forEach(item => {
        item.checked = this.checkAll
      })
    },

    // 当前页面被改变
    changePage(currentPage) {
      this.$emit('pageChange', currentPage)
    }
  },

  mounted() {
    if (this.button.length > 0) {
      this.buttonGroup = this.buttonGroup.filter(item => this.button.indexOf(item.event) !== -1)
    }
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
  ::v-deep.el-input-group__prepend{
    background-color: #fff;
  }
  .data_control{
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    .data_control_right{
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }
  }
  .data_page{
    margin: 10px;
    text-align: right;
  }
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
.noContext{
  padding: 20px;
  user-select: none;
  text-align: center;
  font-size: 12px;
  color: #ccc;
  border-bottom: 1px solid #f4f4f4;
}
</style>
