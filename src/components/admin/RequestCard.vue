<template>
  <div class="request-card">
    <el-dialog title="申请处理" :visible.sync="show_dialog" width="40%">
      <div style="">
        <el-form :model="idForm" :rules="rules" ref="idForm">
          <el-form-item label="申请用户ID" prop="user_id">
            <el-input v-model="idForm.user_id" disabled></el-input>
          </el-form-item>
          <el-form-item label="匹配作者门户ID" prop="portal_id">
            <el-input type="number" v-model="idForm.portal_id" placeholder="请输入ID"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button class="el-icon-check" size="mini" round type="my_success"
                   @click="checkConfirm('idForm')"> 提交</el-button>
        <el-button class="el-icon-close" size="mini" round type="default" @click="show_dialog = false"> 取消</el-button>
      </span>
    </el-dialog>
    <el-card>
      <div slot="header">
        <span class="request-card-header">{{ this.type }}</span>
      </div>
      <div>
        <div class="request-card-content">
          <!--          TODO: display request info-->
          <div class="request-card-content-item"> 申请时间：{{ this.time }}</div>
          <div class="request-card-content-item"> 申请详情：{{ this.detail }}</div>
        </div>
        <el-button type="my_success" size="small" @click="show_dialog = true">处理</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
const testUrl = ""
const deployUrl = ""
export default {
  name: "RequestCard",
  props: {
    request: Object
  },
  data() {
    return {
      type: "请求",
      time: "xxxx-xx-xx xx:xx:xx",
      detail: "xxxxxxxxdetailxxxxxxxxxx",

      idForm: {
        user_id: '',
        portal_id: ''
      },
      rules: {
        portal_id: [
          {
            required: true,
            message: '请输入对应作者门户ID',
            trigger: 'blur'
          }
        ]
      },

      show_dialog: false,
    }
  },
  mounted() {
    // TODO: parsing request prop
    this.idForm.user_id = this.request['userId']
    this.time = this.request['requestTime']
    this.detail = this.request['requestDetail']
  },
  methods: {
    checkConfirm(form_name) {
      this.$refs[form_name].validate((valid) => {
        if (valid) {
          this.$confirm('此操作将通过该申请，是否继续？', '确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.confirmRequest()
          }).finally(() => {
            this.show_dialog = false
          })
        }
      })
    },
    confirmRequest() {
      const h = this.$createElement
      let data = {
        portal_id: parseInt(this.idForm.portal_id),
        user_id: this.idForm.user_id
      }
      this.$axios.post(testUrl, JSON.stringify(data)).then(() => {
        this.$notify({
          title: "提示",
          message: h("div", {class: 'el-icon-check', style: 'color: green'}, " 处理成功！"),
        })
      }).catch(err => {
        this.$notify({
          title: "提示",
          message: h("div", {class: 'el-icon-close', style: 'color: red'}, " 处理失败：" + err.status),
        })
      })
    },
  },
}
</script>

<style scoped>

.request-card-content-item {
  width: 100%;
  clear: both;
  margin: 5px 0;
}

.request-card-header {
  font-size: 20px;
  /*font-family: ;*/
}

.request-card-content {
  width: 100%;
  height: 100px;
  font-size: 15px;
}

.request-card {
  display: block;
  float: left;
  width: 45%;
  height: 50%;
  margin: 10px;
}

.request-card-header {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.el-button--my_success.is-active,
.el-button--my_success:active {
  background: #30C2BA;
  border-color: #30C2BA;
  color: #fff;
}

.el-button--my_success:focus,
.el-button--my_success:hover {
  background: #58E1DC;
  border-color: #58E1DC;
  color: #fff;
}

.el-button--my_success {
  color: #FFF;
  background-color: #30C2BA;
  border-color: #30C2BA;
}
</style>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.request-card .el-card__header, .el-card__body {
  padding: 10px 15px;
}
</style>
