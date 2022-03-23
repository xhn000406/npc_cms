<template>
  <svg :class="iconClass" aria-hidden="true" :style="iconSize">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
export default {
  props: ['svgClass', 'svgName', 'size'],
  data() {
    return {}
  },

  computed: {
    iconClass() {
      return this.svgClass ? `icon ${this.svgClass}` : 'icon'
    },

    iconName() {
      return `#icon-${this.svgName}`
    },

    iconSize() {
      return this.size ? `width: ${this.size};height: ${this.size};` : `width: 1em;height: 1em;`
    }
  }
}
</script>
<style lang="less" scoped>
.icon{
  fill: currentColor;
  overflow: hidden;
  vertical-align: middle;
}
</style>
