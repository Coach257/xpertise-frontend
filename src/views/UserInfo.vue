<template>
   
    <div>
      <h1>欢迎来到 {{ this.$route.params.userid }} 的主页面</h1>
        <el-form :label-position="labelPosition" label-width="80px" :model="userinfo">
            <el-form-item label="用户名">
                <el-input v-model="userinfo.username"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="userinfo.description"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="userinfo.email"></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="saveChange('userinfo')">保存</el-button>
            <el-button type="primary" icon="el-icon-check" @click="getInfo()">获取</el-button>
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
            userinfo: {
                username: '',
                userid: '',
                password: '',
                email: '',
                info: '',
            },
        };
        
    },
    methods: {
        saveChange(formName) {
            var _this = this;
            this.$refs[formName].validate(valid => {
            if (valid) {
            let formData = new FormData();
            formData.append('new_username', this.userinfo.username);
            formData.append('new_password1', this.userinfo.password);
            formData.append('new_email', this.userinfo.email);
            formData.append('userid', this.localStorage['userid']);
            formData.append('new_description', this.ruleForm.description);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            axios.post('http://localhost:5000/api/modify_user_info/',formData,config)
                .then(function (response) {
                    if (response.data.message=="success"){
                        localStorage.setItem('token',_this.ruleForm.username);
                        _this.successmsg("修改成功")
                        setTimeout(() => {
                        myrefresh();
                        }, 2000);
                    }else {
                        _this.errormsg("用户名或邮箱已存在")
                    }
                })
                .catch(function () {
                    _this.errormsg("未知错误，请稍后重试")
                });
            } else {
            return false;
            }
        });
        },
        getInfo() {
            let formData = new FormData();
            console.log(this.$route.params.userid);
            console.log(localStorage.getItem("user_id"));
            formData.append("user_id", 1);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            var _this = this;
            axios.get('https://go-service-296709.df.r.appspot.com/api/v1/user/return/account_info', formData, config)
            .then(function(response) {
                if(response) {
                    console.log(response.data)
                    if(response.success) {
                        _this.username = response.data.username
                        _this.email = response.data.email
                        _this.info = response.data.info
                    }
                    else {
                        console.log("获取失败 " + response.data.message)
                    }
                    //_this.username = response.data.
                }
            }).catch(error=> {
                console.log('error', error);
            })
        }
    },
       
    mounted() {
        this.getInfo();
  }
}
</script>
