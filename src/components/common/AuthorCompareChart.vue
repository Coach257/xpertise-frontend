<template>
  <div v-if="!requestError">
    <div id="author-compare-chart-container" style="width: 600px;height: 500px"></div>
  </div>
</template>

<script>
/**
 * Response Data Structure
 *
 * success: *response status <boolean>*,
 * data:
 * {
 *    // Note: Array<float> -> [*H Index*, *Papers*, *Citations*]
 *    max:[],
 *    avg:[],
 *    author:[]
 * }
 */
export default {
  name: "AuthorCompareChart",
  data() {
    const colors = ['#5793f3', '#d14a61'];

    return {
      requestError: false,
      chartData: [],
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['Current Author', 'Global Hightest', 'Global Average']
        },

        xAxis: [
          {
            type: 'category',
            data: ['H Index', 'Papers', 'Citations', 'L Index', 'Influence', 'Activation'],
            gridIndex: 0,
            axisPointer: {
              type: 'shadow'
            }
          },
        ],
        yAxis: [
          {
            type: 'log',
            name: 'Count / Index',
            logBase: 10
          }
        ],
        series: [
          {
            name: 'Current Author',
            type: 'bar',
            itemStyle: {
              color: '#669'
            },
            data: []
          },

          {
            name: 'Global Hightest',
            type: 'line',
            data: []
          },
          {
            name: 'Global Average',
            type: 'line',
            data: []
          }
        ]
      }


    }
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById('author-compare-chart-container'));
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

          let arr = chartData.author
          arr.push(Math.log[arr[0]])
          arr.push(Math.log[arr[2]])
          arr.push(Math.log[arr[1]])
          this.option.series[0].data = arr

          arr = chartData.max
          arr.push(Math.log[arr[0]])
          arr.push(Math.log[arr[2]])
          arr.push(Math.log[arr[1]])
          this.option.series[1].data = arr

          arr = chartData.avg
          arr.push(Math.log[arr[0]])
          arr.push(Math.log[arr[2]])
          arr.push(Math.log[arr[1]])
          this.option.series[2].data = arr

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
        this.option.series[0].data = [3.5, 25.9, 291, Math.log(3.5), Math.log(291), Math.log(25.9)]
        this.option.series[1].data = [250, 2500, 450000, Math.log(250), Math.log(450000), Math.log(2500)]
        this.option.series[2].data = [6.06, 33.89, 854.77, Math.log(6.06), Math.log(854.77), Math.log(33.89)]

      }).finally(() => {
        this.myChart.hideLoading()
        this.myChart.setOption(this.option)
      })
    }
  }
}
</script>
