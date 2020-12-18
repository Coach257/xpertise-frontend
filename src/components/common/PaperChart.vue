<template>
  <div id="paper-chart"></div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "PaperChart",
  data() {
    return {
      option: {}
    }
  },
  mounted() {
    let echarts = require('echarts')

    let myChart = echarts.init($("#paper-chart"))

    myChart.setOption(this.option)
  }
}
</script>

<style scoped>
#paper-chart {
  width: 600px;
  height: 400px;
}
</style>
