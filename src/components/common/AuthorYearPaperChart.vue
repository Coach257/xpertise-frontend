<template>
  <div
    id="author-year-paper-chart-container"
    style="width: 600px; height: 500px"
  ></div>
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
  props: ["year_citation", "year_pubs"],
  data() {
    const colors = ["#5793f3", "#d14a61"];

    return {
      chartData: [],
      option: {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {
          data: ["Published", "Citations"],
        },
        xAxis: [
          {
            type: "category",
            data: [], //?
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "Published",
            min: 0,
            position: "right",
            axisLine: {
              lineStyle: {
                color: colors[0],
              },
            },
            axisLabel: {
              formatter: "{value} 篇",
            },
          },
          {
            type: "value",
            name: "Citations",
            min: 0,
            position: "left",
            offset: 0,
            axisLine: {
              lineStyle: {
                color: colors[1],
              },
            },
            axisLabel: {
              formatter: "{value} 篇次",
            },
          },
        ],
        series: [
          {
            name: "Published",
            type: "bar",
            data: [], //?
          },
          {
            name: "Citations",
            type: "bar",
            yAxisIndex: 1,
            data: [], //?
          },
        ],
      },
    };
  },
  mounted() {
    this.myChart = this.$echarts.init(
      document.getElementById("author-year-paper-chart-container")
    );
    this.getData()
    this.myChart.setOption(this.option)
    // this.myChart.showLoading();
  },
  methods: {
    getMinYear(a, b) {
      var res = 2020;
      for (var key in a) {
        if (parseInt(key) < res) res = key;
      }
      for (var key in b) {
        if (parseInt(key) < res) res = key;
      }
      return res;
    },
    getMaxYear(a, b) {
      var res = 0;
      for (var key in a) {
        if (parseInt(key) > res) res = key;
      }
      for (var key in b) {
        if (parseInt(key) > res) res = key;
      }
      return res;
    },
    getData() {
      var year_citation = this.$props.year_citation;
      var year_pubs = this.$props.year_pubs;
      var min_year = this.getMinYear(year_citation, year_pubs);
      var max_year = this.getMaxYear(year_citation, year_pubs);
      for (let i = min_year; i <= max_year; i++) {
        this.option.xAxis[0].data.push(i.toString());
        if (year_citation[i]) this.option.series[0].data.push(year_citation[i])
        else this.option.series[0].data.push(0)
        if (year_pubs[i]) this.option.series[1].data.push(year_pubs[i])
        else this.option.series[1].data.push(0)
      }
      this.option.yAxis[0].max =
        Math.ceil(Math.max(...this.option.series[0].data) / 10) * 10;
      this.option.yAxis[1].max =
        Math.ceil(Math.max(...this.option.series[1].data) / 100) * 100;

      // this.myChart.hideLoading();

    },
    displayChart() {
      this.getData()
      this.myChart.setOption(this.option)
      this.myChart.hideLoading()
    }
  },
};
</script>
