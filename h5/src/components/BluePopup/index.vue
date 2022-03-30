<template>
  <div
    v-if="show"
    :class="{
      blue_popup: true
    }"
    @click="hidePopup"
  >
    <div
      class="body"
      @click.stop
    >
      <div class="body_detail">
        <el-page-header
          :content="formName"
          @back="hidePopup"
        />
      </div>
      <div class="body_content">
        <slot></slot>
      </div>
      <div class="body_button">
        <div v-throttle class="button button-submit" @click="onSubmit">确定</div>
        <div class="button button-cancel" @click="hidePopup">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    formName: {
      type: String,
      default: '编辑数据'
    }
  },
  data() {
    return {}
  },

  methods: {
    hidePopup() {
      this.$emit('hide')
    },

    onSubmit() {
      this.$emit('submit')
    }
  }
}
</script>
<style lang="less" scoped>
@keyframes showPopup{
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
}
.blue_popup{
  animation: showPopup .5s;
  height: 100vh;
  width: 100vw;
  position: fixed;
  background-color: rgba(0,0,0,.3);
  top: 0;
  left: 0;
  z-index: 10000;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  box-shadow: 0 0 4px 1px #ccc;
  .body{
    min-width: 500px;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-flow: column;
    .body_detail{
      padding: 10px;
    }
    .body_content{
      flex: 1;
      padding: 20px;
      overflow: auto;
    }
    .body_button{
      display: flex;
      .button{
        flex: 1;
        text-align: center;
        padding: 20px;
        letter-spacing: 4px;
        font-weight: bold;
        color: #fff;
        cursor: pointer;
        user-select: none;
        transition: background .2s;
        &.button-submit{
          background-color: var(--globalColor);
        }
        &.button-cancel{
          background-color: #f4f4f4;
          color: #666;
        }
        &:hover{
          background-color: #ccc;
          color: #fff;
        }
        &:active{
          background-color: #fff;
          color: #ccc;
        }
      }
    }
  }
}
</style>
