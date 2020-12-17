<template>
  <div>
    <h1>欢迎来到 {{ userinfo.username }} 的个人信息修改页面</h1>
    <el-form :label-position="labelPosition" label-width="80px" :model="userinfo">
      <el-form-item label="用户名">
        <el-input v-model="userinfo.username"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="userinfo.basic_info"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userinfo.email"></el-input>
      </el-form-item>
      <el-form-item label="原密码">
        <el-input v-model="userinfo.password1"></el-input>
      </el-form-item>
      <el-form-item label= "新密码">
        <el-input v-model="userinfo.password2"></el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-check" @click="saveChange('userinfo')">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'messageModify',
  data() {
    return {
      labelPosition: 'right',
      userinfo: {
        username: '',
        userid: '',
        password1: '',
        password2: '',
        email: '',
        basic_info: '',
      },
    };
  },
  mounted () {
    this.userinfo.username = localStorage.getItem("username");
    this.userinfo.userid = localStorage.getItem("userid")
    this.userinfo.email = localStorage.getItem("email")
    this.userinfo.basic_info = localStorage.getItem("basic_info")
  },
  methods: {
    saveChange(formName) {
      var _this = this;
      let formData = new FormData();
      formData.append('user_id', localStorage.getItem('userid'));
      formData.append('username', this.userinfo.username);
      formData.append('email', this.userinfo.email);
      formData.append('info', this.userinfo.basic_info);
      formData.append('password1', this.userinfo.password1);
      formData.append('password2', this.userinfo.password2);
      //formData.append('token', localStorage.getItem('token'));
      //console.log(localStorage.getItem('token')); // 验证
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          //Authorization: localStorage.getItem('token')
        }
      };
      axios.post('https://go-service-296709.df.r.appspot.com/api/v1/user/modify', formData,config)
        .then(function (response) {
          if (response){
            console.log(response)
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
          else {
            console.log("error2");
          }
        })
        .catch(function () {
          console.log("error");
        });
    },
    getInfo() {
      let formData = new FormData();
      console.log(localStorage.getItem('userid'));
      formData.append('user_id', localStorage.getItem('userid'));
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      var _this = this;
      axios.post('https://go-service-296709.df.r.appspot.com/api/v1/user/info', formData, config).then(response => {
        if(response) {
          if(response) {
            if(response.data.success) {
              console.log(response.data)
              _this.userinfo.username = response.data.data.username
              _this.userinfo.email = response.data.data.email
              _this.userinfo.basic_info = response.data.data.basic_info
              _this.userinfo.password = response.data.data.password
            }
            else {
              console.log(response.data)
              console.log("获取失败 " + response.data)
            }
          }
        }
        else {
          console.log("error");
        }
      })
      // var _this = this;
      // axios.post('https://go-service-296709.df.r.appspot.com/api/v1/user/return/account_info/:userid', formData, config)
      // .then(function(response) {
      // if(response) {
      //     if(response.data.success) {
      //         console.log(response)
      //         _this.userinfo.username = response.data.data.username
      //         _this.userinfo.email = response.data.data.email
      //         _this.userinfo.basic_info = response.data.data.basic_info
      //         _this.userinfo.password = response.data.data.password
      //     }
      //     else {
      //         console.log(userid)
      //         console.log(response.data)
      //         console.log("获取失败 " + response.data)
      //     }
      //     //_this.username = response.data.
      // }
      // }).catch(error=> {
      //     console.log('error', error);
      // })
    }
  },
}
</script>

<style scoped>

</style>
