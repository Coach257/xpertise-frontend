<template>
  <div>
    <div id="AuthorRelationMap" style="width: 600px; height: 500px"></div>
  </div>
</template>
<script>
import commonApi from '../../commonApi'
export default {
  name: "AuthorRelationMap",
  props: ["data"],
  data() {
    return {
      url: [],
      option: {
        title: {
          text: "作者合作关系图",
          top: "top",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            if (params.data.source || params.data.target) {
              return (
                params.data.source_name +
                "与" +
                params.data.target_name +
                "</br>" +
                "合作文献数量: " +
                params.data.value
              );
            } else {
              return (
                params.data.name + "</br>" + "h-index: " + params.data.value
              );
            }
          },
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
            symbolSize: (value, params) => {
              return value;
            },

            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.3)",
            },
            label: {
              show: false,
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
    this.loadoption();
    let myChart = this.$echarts.init(
      document.getElementById("AuthorRelationMap")
    );
    myChart.setOption(this.option);
    myChart.on("click", function (e) {
      if (e.data.id) {
        window.open("/author/cs/" + e.data.id);
      }
    });
  },
  methods: {
    loadoption() {
      // var len = this.$props.data.data.length;
      // for (let i=0;i<len;i++){
      //   this.url.push({
      //     name:this.$props.data.data[i].name,
      //     id:this.$props.data.data[i].id,
      //   })
      //   delete this.$props.data.data[i]['id'];
      // }
      // console.log(this.url)
      // console.log(this.$props.data.data)
      var len = this.$props.data.data.length
      for (let i=0;i<len;i++){
        // console.log(this.commonApi.titleCase(this.$props.data.data[i].name))
        this.$props.data.data[i].name=this.commonApi.titleCase(this.$props.data.data[i].name)
      }
      len=this.$props.data.links.length
      for (let i=0;i<len;i++){
        // console.log(this.$props.data.links[i])
        this.$props.data.links[i].source_name=this.commonApi.titleCase(this.$props.data.links[i].source_name)
        this.$props.data.links[i].target_name=this.commonApi.titleCase(this.$props.data.links[i].target_name)
      }
      this.option.series[0].data = this.$props.data.data;
      this.option.series[0].links = this.$props.data.links;
    },
  },
};
</script>
