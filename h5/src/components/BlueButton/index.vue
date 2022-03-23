<template>
  <div
    :class="{
      blue_button: true,
      [buttonClass]: buttonClass || false
    }"
  >
    <slot />
  </div>
</template>
<script>
export default {
  props: ['power', 'buttonClass'],
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.blue_button{
  cursor: pointer;
  display: inline-block;
  background-color: var(--globalColor);
  color: #fff;
  padding: 4px 10px;
  border-radius: 3px;
  font-size: 14px;
  transition: all .2s;
  user-select: none;
  &:hover{
    background-color: #fff;
    color: var(--globalColor);
    box-shadow: 0 0 4px 1px var(--globalColor);
  }
  &:active{
    filter: contrast(80%);
  }
}
</style>
