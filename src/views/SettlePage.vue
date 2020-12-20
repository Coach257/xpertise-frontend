<template>
   
    <div>
      <h1>欢迎来到 {{ settleForm.username }} 进行平台入驻服务 </h1>
        <el-form :label-position="labelPosition" label-width="80px" :model="settleForm">
            <el-form-item label="用户ID">
                <el-input v-model="settleForm.userid" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="settleForm.username" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="settleForm.email" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
                <el-input v-model="settleForm.idnum" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="所属单位">
                <el-input v-model="settleForm.school" :disabled="false"></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="submitForm('settleForm')">提交</el-button>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: 'UserInfo'
  }
</script>

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
            formData.append('user_id', localStorage.getItem('userid'));
            formData.append('username', this.userinfo.username);
            formData.append('email', this.userinfo.email);
            formData.append('info', this.userinfo.basic_info);
            console.log(localStorage.getItem('token')); // 验证
            // 在form中附上token字段
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token')
                }
            };
            axios.post('https://go-service-296709.df.r.appspot.com/api/v1/user/reset/account_info', formData,config)
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
    },
    mounted() {
        this.settleForm.username = localStorage.getItem('username')
        this.settleForm.userid = localStorage.getItem('userid')
        this.settleForm.email = localStorage.getItem('email')
  }
}
</script>
