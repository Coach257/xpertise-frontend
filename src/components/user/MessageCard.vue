<template>
  <div class="message-card" v-if="!isRead">

      <div class="message-card-content">
        <!--          TODO: display message info-->
        <div id = 'leftinfo'>
          <div id = 'mes' style="font-weight: bold;"> {{ this.mes }}</div>
          <div id = 'mestime' style="margin-top: 10px; color: #666666"> {{ this.time }}</div>
        </div>
        <el-button type="my_success" size="small" class="el-icon-check" @click="readMessage()" circle></el-button>
      </div>

  </div>
</template>

<script>
const testUrl = "https://go-service-296709.df.r.appspot.com/api/v1/user/authorize/read"
const deployUrl = ""
import axios from 'axios';
import moment from 'moment';

export default {
  name: "MessageCard",
  props: {
    message: Object
  },
  data() {
    return {
      mes: "",
      time: "",
      isRead: false,
    }
  },
  mounted() {
    this.time = this.message.time
    this.detail = this.message.detail;
    if(this.message.status == "Accepted")
      this.mes = "您已成功入驻"
    else
      this.mes = "您的入驻正在审核中"
    this.time = moment(this.message.request_time).fromNow();
  },
  methods: {
    readMessage() {
      var _this = this;
      let formData = new FormData();
      formData.append("user_id", localStorage.getItem("user_id"));
      formData.append("authreq_id", this.message.authreq_id);
      let config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const h = this.$createElement
      axios.post(testUrl, formData, config).then(res => {
        if (res.data.success) {
          _this.isRead = true
        } else {
          this.$notify({
            title: "提示",
            message: h("div", {class: 'el-icon-close', style: 'color: red'}, " 系统出现异常！"),
          })
        }
      }).catch(err => {
        this.$notify({
          title: "提示",
          message: h("div", {class: 'el-icon-close', style: 'color: red'}, " 网络出现异常！"),
        })
      })
    }
  }

}
</script>

<style scoped>
.message-card {
  display: block;
  float: left;
  width: 300px;
  margin: 15px;
  padding: 10px;

  border: 1px solid #e8e6e9;
  border-radius: 10px;
  box-shadow: 0px 0px 8px 4px rgb(127,127,127,0.1);
}
.message-card-content {
  /* outline:#00ff00 dotted thick; */

  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
}
#leftinfo {
  display: flex;
  flex-direction: column;
}

.el-button--my_success.is-active,
.el-button--my_success:active {
  background: #30C2BA;
  border-color: #30C2BA;
  color: #fff;
}

.el-button--my_success:focus,
.el-button--my_success:hover {
  background: #58E1DC;
  border-color: #58E1DC;
  color: #fff;
}

.el-button--my_success {
  color: #FFF;
  background-color: #30C2BA;
  border-color: #30C2BA;
}


</style>

<style>
.message-card .el-card__header, .el-card__body {
  padding: 10px 15px;
}
</style>
