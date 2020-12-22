<template>
  <div>
    <div id="ReferenceChart" style="width:1200px; height: 1000px"></div>
  </div>
</template>
<script>
export default {
  name: "ReferenceChart",
  props: ["data"],
  data() {
    return {
      option: {
        title:{
          text:"文献引用关系图",
          left:"center",
          top:"top"
        },
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
        },
        
        series: [
          {
            type: "tree",
            id: 0,
            data: [],
            roam: true,
            top: "10%",
            left: "400px",
            bottom: "22%",
            right: "20%",

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
    this.myChart = this.$echarts.init(document.getElementById("ReferenceChart"));
    this.myChart.showLoading();
    this.loadoption();
    this.myChart.on("click", function (e) {
      if (e.data.id) {
        window.open('/detail/cs/'+e.data.id);
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
