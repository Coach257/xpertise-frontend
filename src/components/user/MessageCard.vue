<template>
  <div class="message-card" v-if="!isRead">
    <el-card>
      <div class="message-card-content">
        <!--          TODO: display message info-->
        <div class="message-card-content-left"> {{ this.mes }}</div>
        <div class="message-card-content-main"> {{ this.time }}</div>
        <!--<div class="message-card-content-right"> {{  }}</div>-->
        <el-button type="my_success" size="small" class="el-icon-check" @click="readMessage()" circle></el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
const testUrl = "https://go-service-296709.df.r.appspot.com/api/v1/user/authorize/read"
const deployUrl = ""
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
          this.isRead = true
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

.message-card-content-main {
  display: inline-block;
  width: 50%;
  margin: 5px 0;
}

.message-card-content-right {
  display: inline-block;
  width: 30%;
  margin: 5px 0;
}

.message-card-content-left {
  display: inline-block;
  width: 12%;
  margin: 15px 0;
}


.message-card-header {
  font-size: 20px;
  /*font-family: ;*/
}

.message-card-content {
  width: 100%;
  height: 50px;
  font-size: 15px;
}

.message-card {
  display: block;
  float: left;
  width: 100%;
  max-width: 700px;
  height: 50%;
  margin: 10px;
}

.message-card-header {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
