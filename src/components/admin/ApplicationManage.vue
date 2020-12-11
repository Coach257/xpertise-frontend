<template>
  <el-scrollbar style="height: 100%">
    <request-card></request-card>
    <request-card></request-card>
    <request-card></request-card>
  </el-scrollbar>
</template>

<script>
import RequestCard from "@/components/admin/RequestCard";
import $ from 'jquery'

export default {
  components: {RequestCard},
  data() {
    return {
      isScreenWide: false,
    }
  },
  mounted() {
    this.isScreenWide = window.innerWidth > 1500
    $(".request-card").css("width", this.isScreenWide ? "30%" : "45%")
    window.addEventListener('resize', () => {
      if (!this.isScreenWide && window.innerWidth > 1500) {
        this.isScreenWide = !this.isScreenWide
        $(".request-card").css("width", "30%")
      }
      if (this.isScreenWide && window.innerWidth <= 1500) {
        this.isScreenWide = !this.isScreenWide
        $(".request-card").css("width", "45%")
      }
    }, false)
  }
}
</script>

<style>
.admin_page .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
