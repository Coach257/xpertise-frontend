<template>
    <div>
      <el-card class="box-card" shadow = "hover" style="position:fixed; width:400px; height:500px; margin-left: 300px auto; margin-top:200px auto">
        <div slot="header" class="clearfix">
            <span>Xpertise Scholar</span>
        </div>

        <div >
            <div>
                <span style="font-size: 20px"> Login </span>
            </div>

            <div style="margin-top: 20px">
                <div style="text-align:left; margin-left:100px">用户名</div>
                <el-input v-model="loginForm.username" placeholder="Username" style="border-radius: 50px; margin-left:30px; width: 280px; margin-top:5px">
                    <i class="el-icon-user-solid"></i>
                </el-input >
            </div>

            <div style="margin-top: 20px;">
                <div style="text-align:left; margin-left:100px">密码</div>
                <el-input v-model="loginForm.password" placeholder="Username" style="border-radius: 50px; margin-left:30px; width: 280px; margin-top:5px">
                    <i class="el-icon-user-solid"></i>
                </el-input >
            </div>
            <div style = "margin-top:20px;">
            <button @click="checklogin()">登录</button>
            </div>
               <div style = "margin-top:20px;">
            <button @click="getallinfo()">get</button>
            </div>

        </div>
      </el-card>
    </div>

    
</template>

<style>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    height: 400px;
    margin-left: 400px;
    margin-top: 150px;
    /* border-radius: 180px; */
  }
</style>

<script>
import axios from "axios"
  export default {
    name: 'LoginPage',
    data() {
      return {
        loginForm:{
          username:'',
          password:'',
        }
      };
    },
    methods: {
      checklogin(){
        let formData = new FormData();
        formData.append('username', this.loginForm.username);
        formData.append('password', this.loginForm.password);
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        var _this = this
        axios.post('https://go-service-296709.df.r.appspot.com/api/v1/user/login',formData, config)
            .then(function (response)  {
                if (response.data.success) {
                   console.log("登陆成功");
                }else {
                   console.log("登录失败");
                }
            })
     },
     getallinfo(){
       axios.get('https://go-service-296709.df.r.appspot.com/api/v1/user/query/all')
       .then(function(response){
         console.log(response);
       })
     },
    }
  }
</script>
