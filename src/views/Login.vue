<template>
    <div id="root">
      <div id = "LoginCard">


        <div id="title">
            <span style="font-weight: bold;">Xpertise</span>  <span>Scholar</span>
        </div>


        <div>
            <span style="font-size: 45px; font-weight: bold;"> Login </span>
        </div>


        <!-- 用户名 -->
        <div style="margin-top: 10px" id="UserNameInput">
            <div style="font-size: 14px; padding: 5px;">邮箱/用户名</div>
            <el-input v-model="loginForm.username" placeholder="Username">
                <i slot="prefix" class="el-input__icon el-icon-user" style="font-size: 17px;"></i>
            </el-input >
        </div>


        <!-- 密码 -->
        <div style="margin-top: 10px;" id="PWInput">
            <div style="font-size: 14px; padding: 5px;">密码</div>
            <el-input v-model="loginForm.password" placeholder="Password" show-password>
                <i slot="prefix" class="el-input__icon el-icon-lock" style="font-size: 17px;"></i>
            </el-input >
        </div>

        <!-- 登陆按钮 -->
        <div id="LoginButton" @mouseenter="mouseOver()" @mouseleave="mouseLeave()">
          <i class="el-icon-arrow-right" @click="checklogin()"></i>
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

    background-image: url(../assets/loginBack.jpeg);
    background-repeat:no-repeat;
    background-size:100% 100%;
  }


  #LoginCard {
    /* outline: #808080 dotted thick;*/
    border: #cccccc solid thin;
    border-radius: 30px;

    backdrop-filter: blur(20px);
    background-color: rgba(255,255,255,0.5);

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 350px;
    height: 500px;
  }


 #title {
    /* outline: #00ff00 dotted thick; */
    font-size: 30px;
    width: 230px;

    margin-top: 50px;
    margin-bottom: 15px;
  }
  #UserNameInput {
    /* outline: #00ff00 dotted thick; */

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    width: 270px;
    position: relative;
    top: 20px;
  }

  #PWInput {
    /* outline: #00ff00 dotted thick; */

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    width: 270px;
    position: relative;
    top: 20px;
  }

  #LoginButton {
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

  #LoginButton i {
    /* outline: #00ff00 dotted thick; */
    font-size: 35px;
    color: black;
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
    mounted() {
      this.$gsap.set("#root", {height: document.documentElement.clientHeight})
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

                   localStorage.clear()
                   localStorage.setItem('userid',response.data.data.user_id)
                   localStorage.setItem('username',response.data.data.username)
                   localStorage.setItem('email',response.data.data.email)
                   localStorage.setItem('user_type',response.data.data.user_type)
                   localStorage.setItem('ban',response.data.data.ban)

                   sessionStorage.clear()
                   sessionStorage.setItem('userid',response.data.data.user_id)
                   sessionStorage.setItem('username',response.data.data.username)
                   sessionStorage.setItem('email',response.data.data.email)
                   sessionStorage.setItem('user_type',response.data.data.user_type)
                   sessionStorage.setItem('ban',response.data.data.ban)

                   _this.$router.replace('/home');
                   setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                }else {
                   console.log("登录失败");
                }
            })
     },
     mouseOver () {
       this.$gsap.to("#LoginButton", {duration: 0.1, height: '85px', width: '85px', top: '52px',  boxShadow:'0px 0px 10px 10px rgba(128, 128, 128, 0.3)'})
     },
     mouseLeave () {
       this.$gsap.to("#LoginButton", {duration: 0.1, height: '70px', width: '70px', top: '60px',  boxShadow:'0px 0px 10px 0px #b3b3b3'})
     }
    }
  }
</script>
