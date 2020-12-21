<template>
  <div style="width:100%;">
    <request-card v-for="(request,index) in resultList" :key="index" :request="request" :index="index"></request-card>
  </div>
</template>
<script>
import axios from 'axios';
const testUrl = "https://go-service-296709.df.r.appspot.com/api/v1/user/authorize/get"
import RequestCard from "@/components/admin/RequestCard";

export default {
  name: 'MessageCentre',
  components: {RequestCard},
  data() {
    return {
      resultList: [

      ]
    }
  },
  mounted() {
    var _this = this;
    let formData = new FormData();
    formData.append('user_id', localStorage.getItem("userid"));
    console.log(localStorage.getItem("userid"));
    let config = {headers: {'Content-Type': 'multipart/form-data'} };
    axios.post(testUrl, formData, config).then(response => {
      if(response) {
        console.log(response);
        if(response.data.success == true) {
          console.log(response.data.data);
          let list = response.data.data;
          for (let i = 0; i < list.length; i++) {
            this.resultList.push({
              requestId: list[i]['authreq_id'],
              userId: list[i]['user_id'],
              citizen_id: list[i]['citizen_id'],
              requestTime: list[i]['request_time'],
              organization: list[i]['organization']
            })
          }
        }
        else {
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
      }
      else {
        console.log("error");
      }
    })
  }

}



</script>

<style scoped>

</style>
