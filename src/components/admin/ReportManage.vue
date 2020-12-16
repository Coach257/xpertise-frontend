<template>
  <el-scrollbar style="height: 100%">
    <report-card v-for="(report,index) in reportList" :key="index" :report="report"></report-card>
  </el-scrollbar>
</template>

<script>

import ReportCard from "@/components/admin/ReportCard";
import $ from "jquery";

const testUrl = ""
export default {
  name: "ReportManage",
  components: {ReportCard},
  data() {
    return {
      isScreenWide: false,
      reportList: []
    }
  },
  mounted() {
    this.isScreenWide = window.innerWidth > 1300
    $(".request-card").css("width", this.isScreenWide ? "30%" : "45%")
    window.addEventListener('resize', () => {
      if (!this.isScreenWide && window.innerWidth > 1300) {
        this.isScreenWide = !this.isScreenWide
        $(".request-card").css("width", "30%")
      }
      if (this.isScreenWide && window.innerWidth <= 1300) {
        this.isScreenWide = !this.isScreenWide
        $(".request-card").css("width", "45%")
      }
    }, false)
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
