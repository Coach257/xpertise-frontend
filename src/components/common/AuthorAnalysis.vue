<template>
  <div>
    <div id="AuthorAnalysis" style="width: 25vw; height: 25vw"></div>
  </div>
</template>

<script>
import commonApi from "../../commonApi"
export default {
  name: "AuthorAnalysis",
  props: ["data"],
  data() {
    return {
      option: {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "篇数",
            type: "bar",
            barWidth: "60%",
            data: [],
          },
        ],
      },
    };
  },
  mounted() {
    this.loadoption();
    let myChart = this.$echarts.init(document.getElementById("AuthorAnalysis"));
    myChart.setOption(this.option);
  },
  methods: {
    loadoption() {
      var authors = this.$props.data[0].data;
      for (let i = 0; i < authors.length; i++) {
          var author = JSON.parse(authors[i].value);
          if(author.name && author.name.search("NA")==-1 && author.name.search("null")==-1){
              this.option.xAxis[0].data.push(this.commonApi.titleCase(author.name));
              this.option.series[0].data.push(authors[i].count);
          }
      }
    },
  },
};
</script>
