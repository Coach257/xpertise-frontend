<template>
  <div>
    <div
      :id="'organization-total-paper-chart-container'"
      style="width: 600px; height: 400px"
    ></div>
  </div>
</template>

<script>
export default {
  name: "OrganizationTotalPaperChart",
  props: ['pubs'],
  data() {
    return {
      chartData: [],
      paper: [],
      option: {
        title: {
          text: "Statistics",
          subtext: "Paper Total Citations",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} " + "Citation" + "s ({d}%)",
        },
        series: [
          {
            name: "Paper",
            type: "pie",
            radius: ["40%", "60%"],
            center: ["50%", "50%"],
            data: [],
            label: {
              alignTo: "labelLine",
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  created() {
  },
  mounted() {
    this.loadOption();
    this.myChart = this.$echarts.init(
      document.getElementById("organization-total-paper-chart-container")
    );
    this.myChart.showLoading()
    this.myChart.setOption(this.option);
    this.myChart.on("click", function (e) {
      if (e.data.url) {
        window.open(e.data.url);
      }
    });
  },
  methods: {
    loadOption() {
      this.paper = this.$props.pubs;
      this.paper.sort(function (a, b) {
        return b.n_citation - a.n_citation;
      });
      let len = this.paper.length < 30 ? this.paper.length : 30;
      for (let i = 0; i < len; i++) {
        var paper = this.paper[i];
        this.chartData.push({
          name: paper.title,
          value: paper.n_citation,
          url: "/detail/cs/" + paper.id,
        });
      }
      var num = 0;
      if (this.paper.length > 30) {
        for (let i = 30; i < this.paper.length; i++) {
          num += this.paper[i].n_citation;
        }
      }
      if (num != 0) {
        this.chartData.push({
          name: "其他",
          value: num,
        });
      }
      this.option.series[0].data = this.chartData;
    },
  },
  display() {
    this.myChart.hideLoading()
  }
};
</script>
