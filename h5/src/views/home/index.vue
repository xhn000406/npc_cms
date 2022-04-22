<template>
  <div class="container">
    <h1>欢迎使用大学生体质健康监测系统v1.0-Beta</h1>
    <div class="pic_list">
      <div
        v-for="item in 4"
        :key="item"
        class="pic_list_item" ref="falsePic"></div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {
      option: {
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: [
              { value: 40, name: 'rose 1' },
              { value: 38, name: 'rose 2' },
              { value: 32, name: 'rose 3' },
              { value: 30, name: 'rose 4' },
              { value: 28, name: 'rose 5' },
              { value: 26, name: 'rose 6' },
              { value: 22, name: 'rose 7' },
              { value: 18, name: 'rose 8' }
            ]
          }
        ]
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.falsePic.forEach(item => {
        const myChart = echarts.init(item)
        myChart.setOption(this.option)
      })
    })
  }
}
</script>
<style lang="less" scoped>
.container{
  width: 100%;
  .pic_list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .pic_list_item{
      width: 50%;
      margin-top: 20px;
      height: 500px;
    }
  }
}
</style>
