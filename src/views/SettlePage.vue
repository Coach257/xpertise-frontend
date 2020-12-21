<template>
    <div id='root'>
    <div id="SettleCard">

      <div id="title">
          <span style="font-weight: bold;">Xpertise</span>  <span>Scholar</span>
      </div>

      <div>
          <span style="font-size: 40px; font-weight: bold;">Settle Service</span>
      </div>


      <!-- 用户ID -->
      <div style="margin-top: 10px" class="input">
          <div style="font-size: 14px; padding: 5px;">填写您的用户ID</div>
          <el-input v-model="settleForm.userid" placeholder="User ID">
              <i slot="prefix" class="el-input__icon el-icon-user" style="font-size: 17px;"></i>
          </el-input >
      </div>

      <!-- 用户名 -->
      <div style="margin-top: 10px" class="input">
          <div style="font-size: 14px; padding: 5px;">填写您的用户名</div>
          <el-input v-model="settleForm.username" placeholder="Username">
              <i slot="prefix" class="el-input__icon el-icon-user-solid" style="font-size: 17px;"></i>
          </el-input >
      </div>

      <!-- 邮箱 -->
      <div style="margin-top: 10px" class="input">
          <div style="font-size: 14px; padding: 5px;">输入您的邮箱</div>
          <el-input v-model="settleForm.email" placeholder="Email">
              <i slot="prefix" class="el-input__icon el-icon-receiving" style="font-size: 17px;"></i>
          </el-input >
      </div>

      <!-- 身份证 -->
      <div style="margin-top: 10px" class="input">
          <div style="font-size: 14px; padding: 5px;">输入您的身份证号</div>
          <el-input v-model="settleForm.idnum" placeholder="ID">
              <i slot="prefix" class="el-input__icon el-icon-bank-card" style="font-size: 17px;"></i>
          </el-input >
      </div>

      <!-- 所属单位 -->
      <div style="margin-top: 10px" class="input">
          <div style="font-size: 14px; padding: 5px;">输入您的所属单位</div>
          <el-input v-model="settleForm.school" placeholder="Affiliation">
              <i slot="prefix" class="el-input__icon el-icon-school" style="font-size: 17px;"></i>
          </el-input >
      </div>

      <!-- 提交按钮 -->
      <div id="RegisterButton" @mouseenter="mouseOver()" @mouseleave="mouseLeave()">
        <i class="el-icon-arrow-right" @click="submitForm('settleForm')"></i>
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

     background-image: url(../assets/csBack.png);
     background-repeat:no-repeat;
     background-size:100% 100%;

     width: 100vw;
     height: 100vh;

   }

   #SettleCard {
     /* outline: #808080 dotted thick;*/
     border: #cccccc solid thin;
     border-radius: 30px;

     backdrop-filter: blur(20px);
     background-color: rgba(255,255,255,0.5);

     display: flex;
     flex-direction: column;
     align-items: center;

     width: 400px;
     height: 730px;
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
import axios from 'axios';
export default {
    name : 'UserInfo',
    data() {
        return {
            labelPosition: 'right',
            settleForm: {
                userid: '',
                username: '',
                email: '',
                idnum: '',
                school: ''
            }
        };

    },
    methods: {
        submitForm(formName) {
            var _this = this;
            let formData = new FormData();
            formData.append('user_id', this.settleForm.userid);
            formData.append('organization', this.settleForm.school);
            formData.append('citizen_id', this.settleForm.idnum);
            let config = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            };
            axios.post('https://go-service-296709.df.r.appspot.com/api/v1/admin/authorize/request', formData,config)
                .then(function (response) {
                    if (response){
                        alert("申请成功")
                        _this.$router.replace("/home")
                    }
                    else {
                        console.log("error2");
                    }
                })
                .catch(function () {
                    console.log("error");
                });
        },
        mouseOver () {
          this.$gsap.to("#RegisterButton", {duration: 0.1, height: '85px', width: '85px', top: '52px',  boxShadow:'0px 0px 10px 10px rgba(128, 128, 128, 0.3)'})
        },
        mouseLeave () {
          this.$gsap.to("#RegisterButton", {duration: 0.1, height: '70px', width: '70px', top: '60px',  boxShadow:'0px 0px 10px 0px #b3b3b3'})
        }
    },
    mounted() {
        this.settleForm.username = localStorage.getItem('username')
        this.settleForm.userid = localStorage.getItem('userid')
        this.settleForm.email = localStorage.getItem('email')
  }
}
</script>
