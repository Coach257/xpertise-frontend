<template>
  <div id="root">
    <div id="graph">
      <RelationGraph
        id="in"
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
      >
        <div slot="node" slot-scope="{ node }">
          <div id="node">
            {{ node.text }}
          </div>

          <i class="el-icon-user-solid"></i>
        </div>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
import RelationGraph from "relation-graph";
import axios from "axios"
export default {
  name: "RelationMap",
  props: ["data", "type"],
  components: { RelationGraph },
  data() {
    return {
      graphOptions: {
        layouts: [
          {
            label: "中心",
            layoutName: "center",
            layoutClassName: "seeks-layout-center",
            distance_coefficient: 1,
          },
        ],
        defaultLineMarker: {
          markerWidth: 20,
          markerHeight: 20,
          refX: 3,
          refY: 3,
          data: "M 0 0, V 6, L 4 3, Z",
        },
        allowShowMiniNameFilter: false,
        allowShowMiniView: false,
        hideNodeContentByZoom: false,
        defaultNodeShape: 0,
        defaultLineWidth: 2,
        defaultLineShape: 5,
        disableDragNode: true,
        disableZoom: true,
        allowShowMiniToolBar: false,
        defaultNodeColor: "rgba(11, 225, 218, 1)",
        defaultNodeBorderColor: "#00BABD",
        defaultShowLineLabel: false,
      },
      graph:{
          rootId: "1",
          nodes: [
            { id: "1", text: "张恒喜" },
            { id: "2", text: "张喜斌" },
            { id: "3", text: "虞健飞" },
            { id: "4", text: "孟科" },
            { id: "5", text: "杨云" },
            { id: "6", text: "董彦非" },
            { id: "7", text: "郭基联" },
            { id: "8", text: "李寿安" },
            { id: "9", text: "王卓健" },
            { id: "11", text: "张恒喜" },
            { id: "12", text: "张喜斌" },
            { id: "13", text: "虞健飞" },
            { id: "14", text: "孟科" },
            { id: "15", text: "杨云" },
            { id: "16", text: "董彦非" },
            { id: "17", text: "郭基联" },
            { id: "18", text: "李寿安" },
          ],
          links: [
            { from: "1", to: "2", text: "关系1" },
            { from: "1", to: "3", text: "关系1" },
            { from: "1", to: "4", text: "关系1" },
            { from: "1", to: "5", text: "关系1" },
            { from: "1", to: "6", text: "关系1" },
            { from: "1", to: "7", text: "关系1" },
            { from: "1", to: "8", text: "关系1" },
            { from: "2", to: "9", text: "关系1" },
            { from: "1", to: "11", text: "关系1" },
            { from: "1", to: "12", text: "关系1" },
            { from: "1", to: "13", text: "关系1" },
            { from: "1", to: "14", text: "关系1" },
            { from: "1", to: "15", text: "关系1" },
            { from: "1", to: "16", text: "关系1" },
            { from: "1", to: "17", text: "关系1" },
            { from: "1", to: "18", text: "关系1" },
          ],
        }
    };
  },
  watch:{
  },
  mounted() {
    this.init();
    this.showSeeksGraph();
    for (var i = 0; i < this.$refs.seeksRelationGraph.getNodes().length; i++) {
      this.$refs.seeksRelationGraph.getNodes()[i].width = 50;
      this.$refs.seeksRelationGraph.getNodes()[i].height = 50;
    }
  },
  methods: {
    init(){
      if (this.$props.type == "author_connection") {
        this.graph = this.$props.data;
      } else if (this.$props.type == "reference") {
        this.graph = this.$props.data;
        console.log(this.graph);
      }
    },
    showSeeksGraph(query) {
      var __graph_json_data = this.graph;

      this.$refs.seeksRelationGraph.setJsonData(
        __graph_json_data,
        (seeksRGGraph) => {
          // Called when the relation-graph is completed
        }
      );
    },
    onNodeClick(nodeObject, $event) {
      console.log("onNodeClick:", nodeObject);
    },
    onLineClick(lineObject, $event) {
      console.log("onLineClick:", lineObject);
    },
  },
};
</script>

<style>
#root {
  display: flex;
  justify-content: center;
}
#graph {
  /* outline:#00ff00 dotted thick; */
  height: 500px;
  width: 800px;

  position: relative;
}
#in {
  padding: 10px;
  border: #e6e6e6 solid thin;
  border-radius: 30px;
  box-shadow: 0px 0px 10px 1px #cccccc;
}
#node {
  color: forestgreen;
  font-size: 16px;
  position: absolute;
  left: -2px;
  top: 95px;

  width: 100px;
  height: 25px;
  text-align: center;
  background-color: rgba(66, 187, 66, 0.2);
}
.el-icon-user-solid {
  /* outline:#00ff00 dotted thick; */
  font-size: 35px;
  position: relative;
  top: 5px;
}
</style>
