<template>
  <div class="search">
    <div
      v-for="(searchItem, i) in searchOption"
      :class="{
        search_input: true,
        setMargin: setInputMargin
      }"
      :key="i"
    >
      <select
        v-model="searchItem.prop"
      >
        <option
          v-for="(item, n) in searchItem.option"
          :key="n"
          :value="item.prop"
        >
          {{ item.title }}
        </option>
      </select>
      <input v-model="searchItem.value" placeholder="请输入关键词" type="text">
    </div>
    <div class="search_button">
      <el-button
        v-if="searchOption.length > 1"
        title="删除一个项"
        icon="el-icon-minus"
        size="mini"
        type="danger"
        @click="subSearchItem"
      />
      <el-button
        title="增加搜索项"
        icon="el-icon-plus"
        size="mini"
        type="primary"
        @click="addSearchItem"
      />
      <el-button
        title="搜索"
        icon="el-icon-search"
        size="mini"
        type="primary"
        @click="getAllSearchItem"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    selectOptions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      setInputMargin: false,
      queryType: [
        { type: '=', value: 0 }
      ],
      searchOption: []
    }
  },

  watch: {
    searchOption: function() {
      if (this.searchOption.length >= 3) {
        this.setInputMargin = true
      } else {
        this.setInputMargin = false
      }
    }
  },

  mounted() {
    this.addSearchItem()
  },

  methods: {
    // 增加一个模糊搜索
    addSearchItem() {
      this.searchOption.push({
        option: this.selectOptions,
        prop: this.selectOptions ? this.selectOptions[0].prop : null,
        value: null
      })
    },

    // 获取所有的模糊搜索结果
    getAllSearchItem() {
      const mResult = {}
      this.searchOption.forEach(item => {
        mResult[item.prop] = item.value
      })
      this.$emit('searchItem', mResult)
    },

    subSearchItem() {
      this.searchOption.pop()
    }
  }
}
</script>
<style lang="less" scoped>
.search{
  display: flex;
  flex-wrap: wrap;
  .search_input{
    border-radius: 5px;
    background-color: #fff;
    padding: 5px 10px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    &.setMargin{
      margin-bottom: 5px;
    }
    select, input{
      border: none;
      outline: none;
    }
    select {
      margin-right: 5px;
      appearance: none;
    }
    input{
      width: 200px;
      margin-left: 5px;
      &::placeholder{
        color: #ccc;
      }
    }
  }
  .search_button{
  }
}
</style>
