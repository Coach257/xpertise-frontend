<template>
  <div>
    <div id="AuthorRelationMap" style="width: 600px;height: 400px"></div>
  </div>
</template>
<script>
export default {
  name: "AuthorRelationMap",
  props: ["data"],
  data() {
    return {
      option: {
        title: {
          text: "作者合作关系图",
          top: "top",
          left: "center",
        },
        tooltip: {
            trigger:'item',
            formatter:function(params) {
                if(params.data.source||params.data.target){
                    return params.data.source + '与'+params.data.target+'</br>'+'合作文献数量:'+params.data.num
                } else{
                    return params.data.name+"</br>"+"h_index: "+params.data.value
                }
            }
        },
        animationDuration: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            name: "作者合作关系图",
            type: "graph",
            layout: "force",
            data: [],
            links: [],
            roam: true,
            focusNodeAdjacency: true,
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.3)",
            },
            label: {
                show:false,
              position: "right",
              formatter: "",
            },
            lineStyle: {
              color: "source",
              curveness: 0.3,
            },
            emphasis: {
              lineStyle: {
                width: 10,
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    console.log(this.$props.data);
    this.loadoption();
    let myChart = this.$echarts.init(document.getElementById("AuthorRelationMap"));
    myChart.setOption(this.option);
  },
  methods: {
    loadoption() {
      this.option.series[0].data = this.$props.data.data;
      this.option.series[0].links = this.$props.data.links;
    },
  },
};
</script>
