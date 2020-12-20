<template>

    <div>
      <h1>欢迎来到 {{ settleForm.username }} 进行平台入驻服务 </h1>
        <el-form :label-position="labelPosition" label-width="80px" :model="settleForm">
            <el-form-item label="用户ID">
                <el-input v-model="settleForm.userid" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="settleForm.username" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="settleForm.email" :disabled="true"></el-input>
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
    },
    mounted() {
        this.settleForm.username = localStorage.getItem('username')
        this.settleForm.userid = localStorage.getItem('userid')
        this.settleForm.email = localStorage.getItem('email')
  }
}
</script>
