<template>
  <div>
    <div id="chartContainer" style="width: 25vw; height: 25vw"></div>
  </div>
</template>

<script>
export default {
  name: "RelatedPaperChart",
  props: ["data","type"],
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{b} <br/>相关性: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 1,
          data: [],
        },
        series: [
          {
            name: "相关文章",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "10",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.loadoption();
    let myChart = this.$echarts.init(document.getElementById("chartContainer"));
    myChart.setOption(this.option);
    myChart.on("click", function (e) {
      window.open(e.data.url);
    });
  },
  methods: {
      loadoption(){
          var data = this.$props.data;
          for(let i = 0;i<data.length;i++){
              this.option.legend.data.push(data[i].title.raw)
              this.option.series[0].data.push({
                  value:data[i]._meta.score,
                  name:data[i].title.raw,
                  url:"/detail/"+this.$props.type+"/"+data[i].id.raw,
              })
          }
      }
  },
};
</script>
