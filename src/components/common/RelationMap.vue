<template>
  <div>
    <div id="graph">
    <RelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" />
    </div>
  </div>
</template>

<script>
  import RelationGraph from 'relation-graph'
   export default {
     name: 'RelationMap',
     components: { RelationGraph },
     data() {
       return {
         graphOptions: {
          "layouts": [
              {
                "label": "中心",
                "layoutName": "force",
                "layoutClassName": "seeks-layout-center",
                "defaultExpandHolderPosition": "hide",
                "defaultJunctionPoint": "border"
              }
           ],
          "defaultLineMarker": {
            "markerWidth": 20,
            "markerHeight": 20,
            "refX": 3,
            "refY": 3,
            "data": "M 0 0, V 6, L 4 3, Z"
          },
          "allowShowMiniNameFilter": false,
          "allowShowMiniView": false,
          "hideNodeContentByZoom": false,
          "defaultNodeShape": 0,
          "defaultLineShape": 5,
          "disableZoom": true,
          "disableDragNode": true,
          "allowShowMiniToolBar": false
         }
       }
     },
     mounted() {
       this.showSeeksGraph()
     },
     methods: {
       showSeeksGraph(query) {
         var __graph_json_data = {
           rootId: '1',
           nodes: [
             { id: '1', text: '张恒喜'},
             { id: '2', text: '张喜斌'},
             { id: '3', text: '虞健飞'},
             { id: '4', text: '孟科'},
             { id: '5', text: '杨云'},
             { id: '6', text: '董彦非'},
             { id: '7', text: '郭基联'},
             { id: '8', text: '李寿安'},
             { id: '9', text: '王卓健'},
           ],
           links: [
             { from: '1', to: '2', text: '关系1' },
             { from: '1', to: '3', text: '关系1' },
             { from: '1', to: '4', text: '关系1' },
             { from: '1', to: '5', text: '关系1' },
             { from: '1', to: '6', text: '关系1' },
             { from: '1', to: '7', text: '关系1' },
             { from: '1', to: '8', text: '关系1' },
             { from: '2', to: '9', text: '关系1' },
           ]
         }
         this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
           // Called when the relation-graph is completed
         })
       },
       onNodeClick(nodeObject, $event) {
         console.log('onNodeClick:', nodeObject)
       },
       onLineClick(lineObject, $event) {
         console.log('onLineClick:', lineObject)
       }
     }
   }
</script>

<style>
#graph {
  outline:#00ff00 dotted thick;
  height: 1000px;
}
</style>
