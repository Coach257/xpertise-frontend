<template>
  <el-scrollbar style="height: 100%">
    <request-card v-for="request in requestList" :key="request" :report="report"></request-card>

  </el-scrollbar>
</template>

<script>
import RequestCard from "@/components/admin/RequestCard";
import $ from 'jquery'

const testUrl = ""
export default {
  name: "RequestManage",
  components: {RequestCard},
  data() {
    return {
      isScreenWide: false,
      requestList: [],
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
    // TODO: request info parse
    this.$axios.get(testUrl).then((res) => {
      let list = res['result']
      for (let i = 0; i < list.length; i++) {
        this.requestList.push({
          userId: 0,
          requestDetail: "",
          requestTime: "",
        })
      }
    }).catch(err => {
      console.log(err)
      for (let i = 0; i < 4; i++) {
        this.requestList.push({
          userId: -1,
          requestDetail: "Test Details xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          requestTime: "Test Report Time",
        })
      }
    })
  }
}
</script>
