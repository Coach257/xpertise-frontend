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
                <el-input v-model="user_input" placeholder="Username" style="border-radius: 50px; margin-left:30px; width: 280px; margin-top:5px">
                    <i class="el-icon-user-solid"></i>
                </el-input >
            </div>

            <div style="margin-top: 20px;">
                <div style="text-align:left; margin-left:100px">密码</div>
                <el-input v-model="user_input" placeholder="Username" style="border-radius: 50px; margin-left:30px; width: 280px; margin-top:5px">
                    <i class="el-icon-user-solid"></i>
                </el-input >
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
  export default {
    name: 'LoginPage',
    data() {
    return {
      user_input: ''
    }
  }
  }
</script>
