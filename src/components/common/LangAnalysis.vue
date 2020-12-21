<template>
  <div>
    <div id="LangAnalysis" style="width: 25vw; height: 25vw"></div>
  </div>
</template>

<script>
export default {
  name: "LangAnalysis",
  props: ["data"],
  data() {
    return {
      option: {
        backgroundColor: "#2c343c",

        title: {
          text: "Customized Pie",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc",
          },
        },

        tooltip: {
          trigger: "item",
          formatter: "{b} <br/>篇数 : {c} ({d}%)",
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1],
          },
        },
        series: [
          {
            name: "语言",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              color: "rgba(255, 255, 255, 0.3)",
            },
            labelLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)",
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            itemStyle: {
              color: "#c23531",
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function (idx) {
              return Math.random() * 200;
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.loadoption();
    let myChart = this.$echarts.init(document.getElementById("LangAnalysis"));
    myChart.setOption(this.option);
  },
  methods: {
    loadoption() {
      var data = this.$props.data[0].data;
      var value ="";
      for (let i = 0; i < data.length; i++) {
          if(data[i].value == "en")value="英文";
          else value="中文"; 
        this.option.series[0].data.push({
          value: data[i].count,
          name: value,
        });
      }
    },
  },
};
</script>
