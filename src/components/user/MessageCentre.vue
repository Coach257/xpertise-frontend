<template>
  <div style="width:100%;">
    <message-card v-for="(message,index) in resultList" :key="index" :message="message" :index="index"></message-card>
  </div>
</template>
<script>
const testUrl = "https://go-service-296709.df.r.appspot.com/api/v1/user/authorize/get"
import MessageCard from "@/components/user/MessageCard";

export default {
  name: 'MessageCentre',
  components: {MessageCard},
  data() {
    return {
      resultList: []
    }
  },
  mounted() {
    var _this = this;
    let formData = new FormData();
    formData.append('user_id', localStorage.getItem("userid"));
    let config = {headers: {'Content-Type': 'multipart/form-data'}};
    this.$axios.post(testUrl, formData, config).then(response => {
      if (response) {
        console.log(response);
        if (response.data.success) {
          console.log(response.data.data);
          let list = response.data.data;
          for (let i = 0; i < list.length; i++) {
            this.resultList.push({
              authreq_id: list[i]['authreq_id'],
              user_id: list[i]['user_id'],
              citizen_id: list[i]['citizen_id'],
              request_time: list[i]['request_time'],
              organization: list[i]['organization'],
              status: list[i]['status'],
            })
          }
        } else {
          for (let i = 0; i < 4; i++) {
            this.resultList.push({
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
    }).catch(() => {
      for (let i = 0; i < 4; i++) {
        this.resultList.push({
          requestId: -1,
          userId: 0,
          citizen_id: "110000100001010000",
          time: "XXXX-XX-XX xx:xx:xx",
          detail: "DEBUG XXX XX CN XXXX"
        })
      }
    })
  }

}


</script>

<style scoped>

</style>
