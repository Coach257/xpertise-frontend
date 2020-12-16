<template>
  <el-scrollbar style="height: 100%">
    <report-card v-for="report in reportList" :key="report" :report="report"></report-card>
  </el-scrollbar>
</template>

<script>

import ReportCard from "@/components/admin/ReportCard";

const testUrl = ""
export default {
  name: "ReportManage",
  components: {ReportCard},
  data() {
    return {
      reportList: []
    }
  },
  mounted() {
    // TODO: parsing report prop
    this.$axios.get(testUrl).then((res) => {
      let list = res['result']
      for (let i = 0; i < list.length; i++) {
        this.reportList.push({
          userId: 0,
          commitId: 0,
          reportDetail: "",
          reportTime: "",
        })
      }
    }).catch(err => {
      console.log(err)
      for (let i = 0; i < 4; i++) {
        this.reportList.push({
          userId: -1,
          commitId: -1,
          reportDetail: "Test Details xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          reportTime: "Test Report Time",
        })
      }
    })
  }

}
</script>
