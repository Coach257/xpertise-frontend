<template>
  <div
    id="paper-citation"
    style="width: 30vw; height: 30vh;"
  ></div>
</template>

<script>
export default {
  name: "PaperCitation",
  props: ["year_citation"],
  data() {
    const colors = ["#d14a61"];

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
          data: [ "Citations"],
          width:"100%",
          height:"100%"
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
              formatter: "{value} 次",
            },
          },
        ],
        series: [
          {
            name: "Citations",
            type: "bar",
            yAxisIndex: 0,
            data: [], //?
          },
        ],
      },
    };
  },
  mounted() {
    this.myChart = this.$echarts.init(
      document.getElementById("paper-citation")
    );
    this.getData();
  },
  methods: {
    getMinYear(a) {
      var res = 2020;
      for (var key in a) {
        if (parseInt(key) < res) res = key;
      }
      return res;
    },
    getMaxYear(a) {
      var res = 0;
      for (var key in a) {
        if (parseInt(key) > res) res = key;
      }
      return res;
    },
    getData() {
      var min_year = this.getMinYear(this.year_citation);
      var max_year = this.getMaxYear(this.year_citation);
      for(let i=min_year;i<=max_year;i++){
        this.option.xAxis[0].data.push(i.toString());
        if(this.year_citation[i])this.option.series[0].data.push(this.year_citation[i])
        else this.option.series[0].data.push(0)
      }
      this.option.yAxis[0].max =
        Math.ceil(Math.max(...this.option.series[0].data) / 10) * 10;
      
      this.myChart.hideLoading();
      this.myChart.setOption(this.option);
    },
  },
};
</script>
