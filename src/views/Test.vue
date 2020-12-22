<template>
  <div id="root">
    <h1>Test Page</h1>

    <!-- <RelationMap/> -->
    <!-- <organization-year-paper-chart :type="'Citation'"></organization-year-paper-chart>
    <organization-year-paper-chart :type="'Paper'"></organization-year-paper-chart> -->
    <!-- <author-year-paper-chart></author-year-paper-chart> -->
    <!-- <author-compare-chart></author-compare-chart>


    <SelectTitle :buttons='buttons'/> -->
    <!-- <author-relation-map></author-relation-map> -->
    <reference-chart></reference-chart>
  </div>
</template>

<script>
import RelationMap from '../components/common/RelationMap.vue'
import OrganizationYearPaperChart from "@/components/common/OrganizationYearPaperChart";
import AuthorYearPaperChart from "@/components/common/AuthorYearPaperChart";
import SelectTitle from '../components/common/SelectTitle.vue'
import AuthorRelationMap from '../components/common/AuthorRelationMap.vue'
import AuthorCompareChart from "@/components/common/AuthorCompareChart";
import ReferenceChart from "../components/common/ReferenceChart.vue";

export default {
  name: 'Test',
  components: {
    AuthorCompareChart,
    AuthorYearPaperChart,
    OrganizationYearPaperChart,
    RelationMap,
    SelectTitle,
    AuthorRelationMap,
    ReferenceChart,
  },
  data() {
    return {
      buttons: ['语言分析数据', '时间分析数据', '来源分析数据']
    }
  },
  methods: {
    selected(index) {
      console.log(index)
    }
  }
}
</script>

<style scoped>
#root {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>
