<template>
  <div>
    <div id="author-year-paper-chart-container" style="width: 600px;height: 400px"></div>
  </div>
</template>

<script>
export default {
  name: "AuthorYearPaperChart",
  data() {
    const colors = ['#5793f3', '#d14a61'];

    return {
      option: {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          right: '20%'
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['Published', 'Citations']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: ['2011', '2012', '2013', '2014', '2015',
              '2016', '2017', '2018', '2019', '2020'] //?
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Published',
            min: 0,
            max: 20,//?
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
            max: 1000,//?
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
            data: [3, 2, 7, 3, 12, 6, 5, 2, 2, 1] //?
          },
          {
            name: 'Citations',
            type: 'bar',
            yAxisIndex: 1,
            data: [20, 53, 90, 24, 27, 70, 175, 182, 48, 18, 60, 23] //?
          },
        ]
      }
    }
  },
  mounted() {
    let myChart = this.$echarts.init(document.getElementById('author-year-paper-chart-container'));
    myChart.setOption(this.option)
  },
  methods: {}
}
</script>
