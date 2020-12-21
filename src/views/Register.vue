<template>
    <div id="root">
      <div id="RegisterCard">

        <div id="title">
            <span style="font-weight: bold;">Xpertise</span>  <span>Scholar</span>
        </div>

        <div>
            <span style="font-size: 45px; font-weight: bold;"> Register </span>
        </div>


        <!-- 用户名 -->
        <div style="margin-top: 10px" id="UserNameInput" class="input">
            <div style="font-size: 14px; padding: 5px;">创建您的用户名</div>
            <el-input v-model="RegistForm.username" placeholder="Username">
                <i slot="prefix" class="el-input__icon el-icon-user" style="font-size: 17px;"></i>
            </el-input >
        </div>

        <!-- 邮箱 -->
        <div style="margin-top: 10px" id="EmailInput" class="input">
            <div style="font-size: 14px; padding: 5px;">输入您的邮箱</div>
            <el-input v-model="RegistForm.email" placeholder="Email">
                <i slot="prefix" class="el-input__icon el-icon-receiving" style="font-size: 17px;"></i>
            </el-input >
        </div>

        <!-- 密码 -->
        <div style="margin-top: 10px;" id="PWInput" class="input">
            <div style="font-size: 14px; padding: 5px;">设置您的密码</div>
            <el-input v-model="RegistForm.password" placeholder="Password" show-password>
                <i slot="prefix" class="el-input__icon el-icon-lock" style="font-size: 17px;"></i>
            </el-input >
        </div>

        <!-- 确认 -->
        <div style="margin-top: 10px;" id="PWConfirmInput" class="input">
            <div style="font-size: 14px; padding: 5px;">确认您的密码</div>
            <el-input v-model="RegistForm.confirmation" placeholder="Password" show-password>
                <i slot="prefix" class="el-input__icon el-icon-lock" style="font-size: 17px;"></i>
            </el-input >
        </div>


        <!-- 注册按钮 -->
        <div id="RegisterButton" @mouseenter="mouseOver()" @mouseleave="mouseLeave()">
          <i class="el-icon-arrow-right" @click="regist()"></i>
        </div>

      </div>
    </div>


</template>

<style scoped>

 #root {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    background-image: url(../assets/RegisterBack.jpeg);
    background-repeat:no-repeat;
    background-size:100% 100%;
    
    width: 100vw;
    height: 100vh;
  }


  #RegisterCard {
    /* outline: #808080 dotted thick;*/
    border: #cccccc solid thin;
    border-radius: 30px;

    backdrop-filter: blur(20px);
    background-color: rgba(255,255,255,0.5);

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 400px;
    height: 650px;
  }


 #title {
    /* outline: #00ff00 dotted thick; */
    font-size: 30px;
    width: 230px;

    margin-top: 50px;
    margin-bottom: 15px;
  }

.input {
    /* outline: #00ff00 dotted thick; */

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    width: 300px;
    position: relative;
    top: 20px;
  }

  #RegisterButton {
    /* outline: #00ff00 dotted thick; */
    border-radius: 70px;
    background-color: #e6e6e6;
    /* opacity: 0.3; */
    height: 70px;
    width: 70px;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    top: 60px;
  }

  #RegisterButton i {
    /* outline: #00ff00 dotted thick; */
    font-size: 35px;
    color: black;
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
    mounted() {
      
    },
    methods: {
      regist(){
        let formData = new FormData();
        formData.append('username', this.RegistForm.username);
        formData.append('password1', this.RegistForm.password);
        formData.append('password2', this.RegistForm.confirmation);
        formData.append('email', this.RegistForm.email);
        formData.append('info', this.RegistForm.username);
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        var _this = this;
        axios.post('https://go-service-296709.df.r.appspot.com/api/v1/user/register',formData, config)
            .then(function (response)  {
                console.log(response)
                if (response.data.success) {
                   console.log("注册成功");
                   _this.$router.replace('/login');
                }else {
                   console.log("注册失败");
                   _this.$router.replace('/login');
                }
            })
     },
     getallinfo(){
       axios.get('https://go-service-296709.df.r.appspot.com/api/v1/user/query/all')
       .then(function(response){
         console.log(response);
       })
     },
     mouseOver () {
       this.$gsap.to("#RegisterButton", {duration: 0.1, height: '85px', width: '85px', top: '52px',  boxShadow:'0px 0px 10px 10px rgba(128, 128, 128, 0.3)'})
     },
     mouseLeave () {
       this.$gsap.to("#RegisterButton", {duration: 0.1, height: '70px', width: '70px', top: '60px',  boxShadow:'0px 0px 10px 0px #b3b3b3'})
     }
    }
  }
</script>
