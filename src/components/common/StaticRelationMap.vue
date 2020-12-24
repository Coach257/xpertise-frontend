<template>
  <div>
    <div id="chartContainer" style="width: 900px;height: 700px"></div>
  </div>
</template>

<script>
import {response_data} from './resdata'

export default {
  name: "StaticRelationMap",
  data() {
    return {}
  },
  created() {

  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById('chartContainer'));
    this.loadOption()
  },
  methods: {
    loadOption() {
      let map_data = response_data.message
      console.log(response_data.success)
      let option = {
        title: {
          text: 'Top 30 Author Relations',
          left: 'center',
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            zoom: 1.5,
            // progressiveThreshold: 700,
            data: map_data.nodes.map(function (node) {
              return {
                id: node.id,
                name: node.text,
                symbolSize: node.size,
                x: node.x,
                y: node.y,
                itemStyle: {
                  color: node.color
                }

              }
            }),
            links: map_data.links.map(function (edge) {
              return {
                source: edge.from,
                target: edge.to
              };
            }),
            roam: true,
            lineStyle: {
              width: 0.5,
              opacity: 0.7
            }
          }
        ]
      }
      this.myChart.setOption(option)
    }
  }
}
</script>

<!--<style scoped>-->
<!--#paper-chart {-->
<!--  width: 600px;-->
<!--  height: 400px;-->
<!--}-->
<!--</style>-->
