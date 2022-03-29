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
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ['show'],
  data() {
    return {}
  },

  methods: {
    hidePopup() {
      this.$emit('hide')
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
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  .body{
    padding: 20px;
    min-width: 500px;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 0 4px 1px #ccc;
  }
}
</style>
