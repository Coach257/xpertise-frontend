<template>
  <el-scrollbar style="height: 100%">
    <div style="width:100%;">
      <request-card v-for="(request,index) in requestList" :key="index" :request="request"
                    :index="index"></request-card>
    </div>
  </el-scrollbar>
</template>

<script>
import RequestCard from "@/components/admin/RequestCard";
import $ from 'jquery'
import axios from 'axios';

const testUrl = "https://go-service-296709.df.r.appspot.com/api/v1/admin/authorize/all"
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
    // TODO: request info parse
    var _this = this;
    axios.get(testUrl).then(response => {
      if (response) {
        if (response.data.success == true) {
          console.log(response.data.data);
          let list = response.data.data;
          for (let i = 0; i < list.length; i++) {
            this.requestList.push({
              requestId: list[i]['authreq_id'],
              userId: list[i]['user_id'],
              citizen_id: list[i]['citizen_id'],
              requestTime: list[i]['request_time'],
              organization: list[i]['organization']
            })
          }
        } else {
          for (let i = 0; i < 4; i++) {
            this.requestList.push({
              requestId: -1,
              userId: 0,
              citizen_id: "110000100001010000",
              requestTime: "XXXX-XX-XX xx:xx:xx",
              organization: "DEBUG XXX XX CN XXXX"
            })
          }
          console.log(response.data)
        }
      } else {
        console.log("error");
      }
    })
    // this.$axios.get(testUrl).then((res) => {
    //   let list = res['data']
    //   for (let i = 0; i < list.length; i++) {
    //     this.requestList.push({
    //       requestId: list[i]['authreq_id'],
    //       userId: list[i]['user_id'],
    //       citizen_id: list[i]['citizen_id'],
    //       requestTime: list[i]['time'],
    //       organization: list[i]['org']
    //     })
    //   }
    // }).catch(err => {
    //   console.log(err)
    //   for (let i = 0; i < 4; i++) {
    //     this.requestList.push({
    //       requestId: -1,
    //       userId: 0,
    //       citizen_id: "110000100001010000",
    //       requestTime: "XXXX-XX-XX xx:xx:xx",
    //       organization: "DEBUG XXX XX CN XXXX"
    //     })
    //   }
    // })
    this.$nextTick(() => {
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
    })

  }
}
</script>
