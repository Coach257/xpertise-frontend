<template>
  <div v-if="!requestError">
    <div :id="'organization-year-'+this.type+'-chart-container'" style="width: 600px;height: 400px"></div>
  </div>
</template>

<script>
/**
 *  props:
 *  @type ['Paper','Citation']
 *  Response Data Structure:
 *
 *  success: *response status <boolean>*,
 *  data:
 *  [
 *    {
 *      name: *author name <string>*,
 *      value: *corresponding value <int>*
 *    },
 *    {
 *      ...
 *    }
 *  ]
 */
export default {
  name: "OrganizationYearPaperChart",
  props: {
    type: String
  },
  data() {
    return {
      requestError: false,
      chartData: [],
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
    const config = {}
    const data = {}
    const h = this.$createElement
    this.$axios.post('url', data, config).then(res => {
      if (res.data.success) {
        this.chartData = res.data.data
      } else {
        this.$notify({
          title: "Warning",
          message: h("div", {
            class: 'el-icon-close',
            style: 'color: red'
          }, " Error When Getting Statistics")
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
      this.chartData = [
        {
          name: 'alphar',
          value: 23
        },
        {
          name: 'szl',
          value: 34
        },
        {
          name: 'hahahaha',
          value: 44
        }
      ]

    }).finally(() => {
        this.option.series[0].data = this.chartData
        this.myChart.hideLoading()
        this.myChart.setOption(this.option)
      }
    )
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById('organization-year-' + this.type + '-chart-container'));
    this.myChart.showLoading()
  },
  methods: {}
}
</script>
