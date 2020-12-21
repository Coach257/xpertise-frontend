<template>
  <div>
    <div id="YearAnalysis" style="width: 25vw; height: 25vw"></div>
  </div>
</template>

<script>
export default {
  name: "YearAnalysis",
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
    let myChart = this.$echarts.init(document.getElementById("YearAnalysis"));
    myChart.setOption(this.option);
  },
  methods: {
    loadoption() {
      var data = this.$props.data[0].data;
      var list = new Array();
      for (let i = 0; i < data.length; i++) {
          list.push({
              year:data[i].value,
              count:data[i].count,
          })
      }
       for(var i=0;i<list.length;i++)
    {
        for(var u=i+1;u<list.length;u++)
        {
            if(parseInt(list[i].year)>parseFloat(list[u].year))
            {
                    var num={};
                    num=list[i];
                    list[i]=list[u];
                    list[u]=num;                
            }
        }
    }
      for (let i = 0;i<list.length;i++){
          this.option.xAxis[0].data.push(list[i].year);
        this.option.series[0].data.push(list[i].count);
      }
    },
  },
};
</script>
