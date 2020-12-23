<template>
  <div>
    <div
      :id="'organization-year-' + this.type + '-chart-container'"
      style="width: 600px; height: 400px"
    ></div>
  </div>
</template>

<script>
/**
 *  props:
 *  @type ['Paper','Citation']
 *  Response Data Structure:
 *
 *  success: *response status <boolean>*,
 *  data:
 *  [
 *    {
 *      name: *author name <string>*,
 *      value: *corresponding value <int>*
 *    },
 *    {
 *      ...
 *    }
 *  ]
 */
export default {
  name: "OrganizationYearPaperChart",
  props: {
    type: String,
    author: Array,
  },
  data() {
    return {
      chartData: [],
      option: {
        title: {
          text: "Statistics",
          subtext: "Author Total " + this.type + "s",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} <br/> Total {c} " + "Citation" + "s ({d}%)",
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
        series: [
          {
            name: "Author",
            type: "pie",
            radius: ["40%", "60%"],
            center: ["50%", "50%"],
            data: this.chartData,
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
      document.getElementById(
        "organization-year-" + this.type + "-chart-container"
      )
    );
    this.loadOption();
    this.myChart.setOption(this.option);
    this.myChart.on("click", function (e) {
      if (e.data.url) {
        window.open(e.data.url);
      }
    });
    // this.myChart.showLoading()
  },
  methods: {
    loadOption() {
      if (this.type === 'Paper') {
        this.author.sort(function (a, b) {
          return b.n_pubs - a.n_pubs;
        })
        let len = this.author.length < 30 ? this.author.length : 30

        for (let i = 0; i < len; i++) {
          var author = this.author[i];
          this.chartData.push({
            name: author.name,
            value: author.n_pubs,
            url: '/author/cs/' + author.id,
          })
        }
        var num = 0;
        if (this.author.length > 30) {
          for (let i = 30; i < this.author.length; i++) {
            num += this.author[i].n_pubs;
          }
        }
        if (num != 0) {
          this.chartData.push({
            name: "其他",
            value: num,
          })
        }
      } else {
        this.author.sort(function (a, b) {
          return b.n_citation - a.n_citation;
        })
        let len = this.author.length < 30 ? this.author.length : 30
        for (let i = 0; i < len; i++) {
          var author = this.author[i];
          this.chartData.push({
            name: author.name,
            value: author.n_citation,
            url: '/author/cs/' + author.id,
          })
        }
        var num = 0;
        if (this.author.length > 30) {
          for (let i = 30; i < this.author.length; i++) {
            num += this.author[i].n_citation;
          }
        }
        if (num != 0) {
          this.chartData.push({
            name: "其他",
            value: num,
          })
        }
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
