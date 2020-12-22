<template>
    <div id="author-compare-chart-container" style="width: 600px;height: 500px"></div>
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
  props:['h_index','n_citation','n_pubs'],
  data() {
    const colors = ['#5793f3', '#d14a61'];

    return {
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
            data: ['H Index', 'Papers', 'Citations', 'Influence', 'Prof', 'Prod'],
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
    this.getData();
    let myChart = this.$echarts.init(document.getElementById('author-compare-chart-container'));
    myChart.setOption(this.option);
  },
  methods: {
    getData() {
      var h_index = this.$props.h_index;
      var n_pubs = this.$props.n_pubs;
      var n_citation = this.$props.n_citation;
      this.option.series[0].data = [h_index, n_pubs, n_citation, Math.log(h_index).toFixed(3), Math.log(n_pubs).toFixed(3), Math.log(n_citation).toFixed(3)]
      this.option.series[1].data = [171, 2484, 259517, Math.log(171).toFixed(3), Math.log(259517).toFixed(3), Math.log(2484).toFixed(3)]
      this.option.series[2].data = [6.06, 33.89, 854.77, Math.log(6.06).toFixed(3), Math.log(854.77).toFixed(3), Math.log(33.89).toFixed(3)]
    }
  }
}
</script>
