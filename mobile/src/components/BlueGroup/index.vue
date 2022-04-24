<template>
  <div class="power_group">
    <div class="power_group_title">{{ title }}</div>
    <div class="power_group_content">
      <template v-for="(item, i) in power">
        <div
          v-if="item.meta"
          :key="i"
          class="power_group_item"
          @click="goPower(item.name)"
        >
          <blue-icon size="2em" :svg-name="item.meta.icon" />
          <div>{{ item.meta.title }}</div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    power: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {}
  },

  methods: {
    goPower(name) {
      this.$router.push({ name })
    }
  }
}
</script>
<style lang="less" scoped>
.power_group{
  background-color: #fff;
  margin: 10px;
  border-radius: 8px;
  .power_group_title{
    font-size: 14px;
    padding: 10px;
    border-bottom: 1px solid #f4f4f4;
    color: #999;
  }
  .power_group_content{
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    .power_group_item{
      &>div{
        margin-top: 5px;
      }
      letter-spacing: 2px;
      width: 33.33%;
      box-sizing: border-box;
      border-right: 1px solid #f4f4f4;
      text-align: center;
      border-bottom: 1px solid #f4f4f4;
      padding: 20px 0;
      &.hover{
        background-color: rgba(#000, .1);
      }
    }
  }
}
</style>
