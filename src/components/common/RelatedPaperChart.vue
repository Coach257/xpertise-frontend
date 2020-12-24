<template>
  <div>
    <div id="chartContainer" style="width: 100%; height: 35vw"></div>
  </div>
</template>

<script>
import commonApi from '../../commonApi'
export default {
  name: "RelatedPaperChart",
  props: ["data", "type"],
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{b} <br/>相关性: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          width: "100%",
          height: 500,
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
            data: [],
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
    loadoption() {
      var data = this.$props.data;
      for (let i = 0; i < data.length; i++) {
        data[i].title.raw=this.commonApi.titleCase(data[i].title.raw)
        data[i].title.raw =
          data[i].title.raw.length < (this.funcChina(data[i].title.raw)?15:35)
            ? data[i].title.raw
            : data[i].title.raw.substring(0, (this.funcChina(data[i].title.raw)?15:35)) + "...";
        this.option.legend.data.push(data[i].title.raw);
        this.option.series[0].data.push({
          value: data[i]._meta.score,
          name: data[i].title.raw,
          url: "/detail/" + this.$props.type + "/" + data[i].id.raw,
        });
      }
    },
    funcChina(str) {
      return (/.*[\u4e00-\u9fa5]+.*/.test(str));

    },
  },
};
</script>
