<template>
  <div>
    <div id="organization-year-paper-chart-container" style="width: 600px;height: 400px"></div>
  </div>
</template>

<script>
/**
 *  data structure:
 *  {
 *    name: *author name*,
 *    value: *corresponding value*
 *  }
 */
export default {
  name: "OrganizationYearPaperChart",
  props: {
    type: String
  },
  data() {
    return {
      chartData: [{}],
      option: {
        title: {
          text: 'Statistics',
          subtext: 'Author Total ' + this.type + 's',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ' + this.type + 's ({d}%)'
        },
        series: [
          {
            name: 'Author',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '50%'],
            data: this.chartData,
            label: {
              alignTo: 'labelLine'
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  created() {
  },
  mounted() {
    let myChart = this.$echarts.init(document.getElementById('organization-year-paper-chart-container'));
    myChart.setOption(this.option)
  },
  methods: {}
}
</script>
