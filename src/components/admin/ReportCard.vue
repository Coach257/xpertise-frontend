<template>
  <div class="report-card">
    <el-dialog title="举报处理" :visible.sync="show_dialog" width="40%" >
      <div style="margin:10px auto">处理选项</div>
      <div style="">
        <el-checkbox-group size="medium" v-model="selections" @change="handleCheckboxChange">
          <el-checkbox-button v-for="option in options" :label="option" :key="option"
                              :disabled="isDenied&&option!=='驳回举报'">
            {{ option }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
      <span slot="footer">
        <el-button class="el-icon-check" size="mini" round type="my_success"> 提交</el-button>
        <el-button class="el-icon-close" size="mini" round type="default"> 取消</el-button>
      </span>
    </el-dialog>
    <el-card>
      <div slot="header">
        <span class="report-card-header">{{ this.type }}</span>
      </div>
      <div>
        <div class="report-card-content">
          <!--          TODO: display report info-->
          <div class="report-card-content-item"> 举报详情：{{ this.detail }}</div>
          <div class="report-card-content-item"> 举报时间：{{ this.time }}</div>
        </div>
        <el-button size="small" @click="show_dialog = true">处理</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: "ReportCard",
  props: {
    report: Object
  },
  data() {
    return {
      type: "举报",
      time: "xxxx-xx-xx xx:xx:xx",
      detail: "xxxxxxxxdetailxxxxxxxxxx",
      show_dialog: false,
      selections: [],
      isDenied: false,
      options: ["驳回举报", "删除条目", "禁言用户"]
    }
  },
  mounted() {
    // TODO: parsing report prop
  },
  methods: {
    handleCheckboxChange(val) {
      if (val.length === 0) {
        this.isDenied = false
        return
      }
      for (let i = 0; i < val.length; i++) {
        if (val[i] === "驳回举报") {
          this.selections = ["驳回举报"]
          this.isDenied = true
          return
        }
      }
    }
  }
}
</script>

<style scoped>

.report-card-content-item {
  width: 100%;
  clear: both;
  margin: 5px 0;
}

.report-card-header {
  font-size: 20px;
  /*font-family: ;*/
}

.report-card-content {
  width: 100%;
  height: 100px;
  font-size: 15px;
}

.report-card {
  display: block;
  float: left;
  width: 45%;
  height: 50%;
  margin: 10px;
}

.report-card-header {
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
.report-card .el-card__header, .el-card__body {
  padding: 10px 15px;
}
</style>
