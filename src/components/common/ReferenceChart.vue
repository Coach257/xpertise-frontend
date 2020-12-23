<template>
  <div>
    <div id="ReferenceChart" style="width: 100%; height: 600px"></div>
  </div>
</template>
<script>
export default {
  name: "ReferenceChart",
  props: ["data"],
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
        },
        // legends: {
        //   width: "100%",
        // },
        series: [
          {
            type: "tree",
            id: 0,
            data: [],
            roam: true,
            top: "1%",
            left: "100px",
            bottom: "1%",
            right: "1%",

            symbolSize: 10,

            lineStyle: {
              width: 2,
            },

            label: {
              backgroundColor: "#fff",
              position: "top",
              verticalAlign: "middle",
              align: "right",
            },

            leaves: {
              label: {
                position: "right",
                verticalAlign: "middle",
                align: "top",
              },
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750,
          },
        ],
      },
    };
  },
  mounted() {
    //this.loadoption();
    this.myChart = this.$echarts.init(
      document.getElementById("ReferenceChart")
    );
    this.myChart.showLoading();
    this.loadoption();
    this.myChart.on("click", function (e) {
      if (e.data.id) {
        window.open("/detail/cs/" + e.data.id);
      }
    });
  },
  methods: {
    loadoption() {
      console.log(this.$props.data);
      this.option.series[0].data.push(this.$props.data);
      console.log(this.option.series[0].data);
      this.myChart.setOption(this.option);
      this.myChart.hideLoading();
    },
  },
};
</script>

<style scoped>
#ReferenceChart{
  -webkit-box-shadow: inset 2px 2px 29px -7px rgba(153,153,153,0.49);
  -moz-box-shadow: inset 2px 2px 29px -7px rgba(153,153,153,0.49);
  box-shadow: inset 2px 2px 29px -7px rgba(153,153,153,0.49);
  border-radius: 20px;
}
</style>
