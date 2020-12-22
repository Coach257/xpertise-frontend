<template>
  <div>
    <div id="chartContainer" style="width: 25vw; height: 25vw"></div>
  </div>
</template>

<script>
export default {
  name: "RelatedPaperChart",
  props: ["data", "authorid"],
  data() {
    return {
      option: {
        title: {
          text: "合作作者",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} <br/>合作篇数 : {c} ({d}%)",
        },
        legend: {
          left: "right",
          top: "bottom",
          data: [],
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
            },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "合作伙伴",
            type: "pie",
            radius: [20, 110],
            center: ["40%", "50%"],
            roseType: "radius",
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
              },
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
      if (e.data.url) {
        window.open(e.data.url);
      }
    });
  },
  methods: {
    loadoption() {
      var data = this.$props.data;
      var id = this.$props.authorid;
      var len = data.length < 10 ? data.length : 10;
      var i = 0;
      for (i; i < len; i++) {
        if (id == data[i].author2_id) {
          this.option.legend.data.push(data[i].author1_name);
          this.option.series[0].data.push({
            value: data[i].co_num,
            name: data[i].author1_name,
            url: "/author/cs/" + data[i].author1_id,
          });
        } else {
          this.option.legend.data.push(data[i].author2_name);
          this.option.series[0].data.push({
            value: data[i].co_num,
            name: data[i].author2_name,
            url: "/author/cs/" + data[i].author2_id,
          });
        }
      }
    },
  },
};
</script>
