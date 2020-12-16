<template>
  <el-scrollbar style="height: 100%">
    <report-card></report-card>
    <report-card></report-card>
    <report-card></report-card>
    <report-card></report-card>
  </el-scrollbar>
</template>

<script>

import ReportCard from "@/components/admin/ReportCard";

export default {
  name: "ReportManage",
  components: {ReportCard},

}
</script>
