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
          left: "right",
        },
        tooltip: {
            trigger:'item',
            formatter:function(params) {
                if(params.data.source||params.data.target){
                    return '合作数量:'+params.data.num
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
            layout: "circular",
            data: [{
                name:'szl',
                value:1,
            },{
                name:'zyh',
                value:2,
            },{
                name:'hpf',
                value:3,
            },{
                name:'zcy',
                value:1000000
            }
            ],
            links: [{
                source:'szl',
                target:'zyh',
                num :65535
            },{
                source:'zyh',
                target:'hpf'
            },{
                source:'hpf',
                target:'szl'
            },{
                source:'szl',
                target:'zcy',
            },{
                source:'zyh',
                target:'zcy'
            }
            ],
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
    // this.loadoption();
    let myChart = this.$echarts.init(document.getElementById("AuthorRelationMap"));
    myChart.setOption(this.option);
  },
  methods: {
    loadoption() {
      var data = this.$props.data[0].data;
      var list = new Array();
      for (let i = 0; i < data.length; i++) {
        this.option.xAxis[0].data.push(JSON.parse(data[i].value).raw);
        this.option.series[0].data.push(data[i].count);
      }
    },
  },
};
</script>
