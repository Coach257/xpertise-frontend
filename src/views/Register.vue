<template>
    <div>
      <el-card class="box-card" shadow = "hover" style="position:fixed; width:400px; height:500px; margin-left: 300px auto; margin-top:200px auto">
        <div slot="header" class="clearfix">
            <span>Xpertise Scholar</span>
        </div>

        <div >
            <div>
                <span style="font-size: 26px"> 注册 </span>
            </div>

            <div style="margin-top: 20px">
                <div style="text-align:left; margin-left:100px">创建您的用户名</div>
                <el-input v-model="RegistForm.username" placeholder="Username" style="border-radius: 50px; margin-left:30px; width: 280px; margin-top:5px">
                    <i class="el-icon-user-solid"></i>
                </el-input >
            </div>

            <div style="margin-top: 20px">
                <div style="text-align:left; margin-left:100px">输入您的邮箱</div>
                <el-input v-model="RegistForm.email" placeholder="Email" style="border-radius: 50px; margin-left:30px; width: 280px; margin-top:5px">
                    <i class="el-icon-user-solid"></i>
                </el-input >
            </div>

            <div style="margin-top: 20px;">
                <div style="text-align:left; margin-left:100px">设置您的密码</div>
                <el-input v-model="RegistForm.password" placeholder="Password" style="border-radius: 50px; margin-left:30px; width: 280px; margin-top:5px">
                    <i class="el-icon-user-solid"></i>
                </el-input >
            </div>

            <div style="margin-top: 20px;">
                <div style="text-align:left; margin-left:100px">确认您的密码</div>
                <el-input v-model="RegistForm.confirmation" placeholder="Confirmation" style="border-radius: 50px; margin-left:30px; width: 280px; margin-top:5px">
                    <i class="el-icon-user-solid"></i>
                </el-input >
            </div>

            <div style = "margin-top:20px;">
              <button @click="regist()"> 注册 </button>
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
    name: 'RegistPage',
    data() {
      return {
        RegistForm:{
          username : '',
          password : '',
          email : '', 
          confirmation : '',
        }
      };
    },

    methods: {
      regist(){
        let formData = new FormData();
        formData.append('username', this.RegistForm.username);
        formData.append('password', this.RegistForm.password);
        formData.append('password2', this.RegistForm.confirmation);
        formData.append('email', this.RegistForm.email);
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        var _this = this
        axios.post('https://go-service-296709.df.r.appspot.com/api/v1/user/register',formData, config)
            .then(function (response)  {
                if (response.data.success) {
                   console.log("注册成功");
                }else {
                   console.log("注册失败");
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
