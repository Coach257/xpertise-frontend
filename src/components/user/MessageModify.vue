<template>
  <div>

		<h1>欢迎来到 {{ userinfo.username }} 的个人信息修改页面</h1>

		<div class="wrapper">
		<el-form :label-position="labelPosition" label-width="80px" :model="userinfo">
		  <el-form-item label="用户名">
			<el-input v-model="userinfo.username"></el-input>
		  </el-form-item>
      <!-- TODO：基本信息 -->
      <el-form-item label="基本信息">
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

      <center>
		  <el-button type="primary" icon="el-icon-check" @click="saveChange('userinfo')">保存</el-button>
      </center>
		</el-form>
		</div>


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
    success() {
      this.$message({
        message: '修改成功',
        type: 'success'
      });
    },
    fail() {
      this.$message.error('修改失败');
    },
    saveChange(formName) {
      var _this = this;
      let formData = new FormData();
      formData.append('user_id', localStorage.getItem('userid'));
      formData.append('username', this.userinfo.username);
      formData.append('email', this.userinfo.email);
      formData.append('info', this.userinfo.basic_info);
      formData.append('password1', this.userinfo.password1);
      formData.append('password2', this.userinfo.password2);
      let config = { headers: { 'Content-Type': 'multipart/form-data', } };
      axios.post('https://go-service-296709.df.r.appspot.com/api/v1/user/modify', formData,config)
        .then(function (response) {
          if (response.data.success){
            _this.success();
          }
          else
            _this.fail();
        })
        .catch(function () {
          _this.fail();
        });
    },
    getInfo() {
      let formData = new FormData();
      console.log(localStorage.getItem('userid'));
      formData.append('user_id', localStorage.getItem('userid'));
      let config = { headers: { 'Content-Type': 'multipart/form-data' } };
      var _this = this;
      axios.post('https://go-service-296709.df.r.appspot.com/api/v1/user/info', formData, config).then(response => {
        if(response) {
          if(response.data.success) {
            _this.success();
            _this.userinfo.username = response.data.data.username;
            _this.userinfo.email = response.data.data.email;
            _this.userinfo.basic_info = response.data.data.basic_info;
            _this.userinfo.password = response.data.data.password;
          }
          else
            _this.fail();
        }
        else {
          _this.fail();
        }
      })
    }
  },
}
</script>

<style scoped>
.wrapper {
  border: #e6e6e6 solid thin;
  border-radius: 30px;
  box-shadow: 0px 0px 50px 10px rgba(127, 127, 127, 0.2);
  padding: 20px;
  margin: 40px;
  width: 1000px;

}
</style>
