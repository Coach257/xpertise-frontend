<template>
  <div v-if="!requestError">
    <div id="author-year-paper-chart-container" style="width: 600px;height: 500px"></div>
  </div>
</template>

<script>
/**
 * Response Data Structure
 *
 * success: *response status <boolean>*,
 * data:
 * [
 *    {
 *      year: *year <int/str>*  // note: 都能处理
 *      published: *number of papers published in that year <int>*
 *      citation: *number of citations in that year <int>*
 *    }
 * ]
 */
export default {
  name: "AuthorYearPaperChart",
  data() {
    const colors = ['#5793f3', '#d14a61'];

    return {
      requestError: false,
      chartData: [],
      option: {
        color: colors,
        tooltip: {
          trigger: 'yAxis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Published', 'Citations']
        },
        xAxis: [
          {
            type: 'category',
            data:  []//?
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Published',
            min: 0,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value} 篇'
            }
          },
          {
            type: 'value',
            name: 'Citations',
            min: 0,
            position: 'left',
            offset: 0,
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value} 篇次'
            }
          }
        ],
        series: [
          {
            name: 'Published',
            type: 'bar',
            data: [] //?
          },
          {
            name: 'Citations',
            type: 'bar',
            yAxisIndex: 1,
            data: [] //?
          },
        ]
      }
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById('author-year-paper-chart-container'));
    this.myChart.showLoading()
    this.getData()
  },
  methods: {
    getData() {
      const data = {}
      const config = {}
      const h = this.$createElement
      this.$axios.post('url', data, config).then(res => {
        if (res.data.success) {
          const chartData = res.data.data
          this.option.xAxis[0].data = chartData.map(item => {
            return item.year.toString()
          })
          this.option.series[0].data = chartData.map(item => {
            return item.published
          })
          this.option.series[1].data = chartData.map(item => {
            return item.citation
          })
          this.option.yAxis[0].max = Math.ceil(Math.max(...this.option.series[0].data) / 10) * 10
          this.option.yAxis[1].max = Math.ceil(Math.max(...this.option.series[1].data) / 100) * 100
        } else {
          this.$notify({
            title: "Warning",
            message: h("div", {
              class: 'el-icon-close',
              style: 'color: red'
            }, " Error When Getting Statistics"),
          })
          this.requestError = true
        }
      }).catch(err => {
        console.log(err)
        this.$notify({
          title: "Network Error",
          message: h("div", {
            class: 'el-icon-close',
            style: 'color: red'
          }, " Please Check Your Internet Connection"),
        })
        this.requestError = true

        // DEBUG CODE (should be commented when release)
        this.requestError = false
        this.option.xAxis[0].data = ['2011', '2012', '2013', '2014', '2015',
          '2016', '2017', '2018', '2019', '2020']
        this.option.series[0].data = [3, 2, 7, 3, 12, 6, 5, 2, 2, 1]
        this.option.series[1].data = [20, 53, 90, 24, 27, 70, 175, 182, 48, 18]
        this.option.yAxis[0].max = Math.ceil(Math.max(...this.option.series[0].data) / 10) * 10
        this.option.yAxis[1].max = Math.ceil(Math.max(...this.option.series[1].data) / 100) * 100

      }).finally(() => {
        this.myChart.hideLoading()
        this.myChart.setOption(this.option)
      })
    }
  }
}
</script>
