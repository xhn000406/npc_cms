<template>
  <div class="container">
    <div class="data_control">
      <div class="data_control_left">
        <div
          v-for="i in 3"
          :key="i"
          class="search_item"
        >
          <el-input
            placeholder="请输入搜索内容"
            size="mini"
          >
            <el-select
              slot="prepend"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, i) in options"
                :key="i"
                :label="item.title"
                :value="item.prop"
              />
            </el-select>
          </el-input>
        </div>
        <div>
          <el-button
            title="增加搜索项"
            icon="el-icon-plus"
            size="mini"
            type="primary"
          />
          <el-button
            title="搜索"
            icon="el-icon-search"
            size="mini"
            type="primary"
          />
        </div>
      </div>
      <div class="data_control_right">
        <el-button
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
        >
          导入数据
        </el-button>
        <el-button
          icon="el-icon-download"
          size="mini"
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
        </el-button>
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
    <!-- 分页条 -->
    <div class="data_page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
      />
    </div>
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
    tableData: {
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
      checkAll: false,
      showPopup: false,
      searchForm: [],
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
        this.$emit('delItem', item)
      })
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
      // if (this.checkAll) {
      //   this.showDeleteAllButton = true
      // } else {
      //   this.showDeleteAllButton = false
      // }
      this.tableData.forEach(item => {
        item.checked = this.checkAll
      })
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
    .data_control_left{
      display: flex;
      width: 60%;
      align-items: center;
      flex-wrap: wrap;
      .search_item{
        width: 200px;
        margin-right: 10px;
      }
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
</style>
