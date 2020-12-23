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
        legend: {
          orient:'vertical',
          width: 30,
          right: 50,
          data:['其他'],
          selected: {
            '其他': false
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} <br/> Total {c} " + "Citation" + "s ({d}%)",
        },
        series: [
          {
            name: "Paper",
            type: "pie",
            radius: ["40%", "60%"],
            center: ["50%", "50%"],
            data: [],
            minShowLabelAngle:5,
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
    this.myChart = this.$echarts.init(
      document.getElementById("organization-total-paper-chart-container")
    );
    this.myChart.showLoading()
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
    displayChart() {
      this.loadOption();
      this.myChart.setOption(this.option);
      this.myChart.on("click", function (e) {
        if (e.data.url) {
          window.open(e.data.url);
        }
      });
      this.myChart.hideLoading()
    }
  },

};
</script>
