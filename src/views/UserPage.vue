<template>

    <div>
      <h1>欢迎来到 {{ this.$route.params.userid }} 的个人信息页面 </h1>
        <div>
            <el-avatar> {{ userinfo.username }} </el-avatar>
        </div>
        <el-form :label-position="labelPosition" label-width="80px" :model="userinfo">
            <el-form-item label="用户名">
                <el-row> {{ userinfo.username}}</el-row>
            </el-form-item>
            <el-form-item label="描述">
                <el-row> {{ userinfo.basic_info }}</el-row>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-row> {{ userinfo.email }}</el-row>
            </el-form-item>
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
                basic_info: '',
            },
        };

    },
    methods: {
        getInfo() {
            let formData = new FormData();
            //console.log(this.$route.params.userid);
            formData.append('user_id', localStorage.getItem('userid'));
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            var _this = this;
            axios.post('https://go-service-296709.df.r.appspot.com/api/v1/user/info', formData, config).then(response => {
                 if(response) {
                    if(response.data.success) {
                      _this.userinfo.username = response.data.data.username
                      _this.userinfo.email = response.data.data.email
                      _this.userinfo.basic_info = response.data.data.basic_info
                      _this.userinfo.password = response.data.data.password
                    }
                    else
                      console.log("获取失败 " + response.data)
                }
                else {
                    console.log("error");
                }
            })
        }
    },
    mounted() {
        this.getInfo();
    }
}
</script>
