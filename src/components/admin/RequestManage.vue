<template>
  <el-scrollbar style="height: 100%;display: flex">
    <request-card v-for="(request,index) in requestList" :key="index" :request="request"></request-card>
  </el-scrollbar>
</template>

<script>
import RequestCard from "@/components/admin/RequestCard";
import $ from 'jquery'

const testUrl = ""
const deployUrl = ""
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
    // TODO: request info parse
    this.$axios.get(testUrl).then((res) => {
      let list = res['data']
      for (let i = 0; i < list.length; i++) {
        this.requestList.push({
          requestId: list[i]['authreq_id'],
          userId: list[i]['user_id'],
          citizen_id: list[i]['citizen_id'],
          requestTime: list[i]['time'],
          organization: list[i]['org']
        })
      }
    }).catch(err => {
      console.log(err)
      for (let i = 0; i < 4; i++) {
        this.requestList.push({
          requestId: -1,
          userId: 0,
          citizen_id: "110000100001010000",
          requestTime: "XXXX-XX-XX xx:xx:xx",
          organization: "DEBUG XXX XX CN XXXX"
        })
      }
    })
  }
}
</script>
