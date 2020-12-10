<template>
  <div class="request-card">
    <el-card>
      <div slot="header">
        <span class="request-card-header">{{ this.type }}</span>
      </div>
      <div>
        <div class="request-card-content">
          <!--          TODO: display request info-->
          <div class="request-card-content-item"> 申请详情：{{ this.detail }}</div>
          <div class="request-card-content-item"> 申请时间：{{ this.time }}</div>
        </div>
        <el-button-group style="width: 90px;height: 30px;right: 0">
          <el-button class="el-icon-check" size="mini" round type="my_success"></el-button>
          <el-button class="el-icon-close" size="mini" round type="danger"></el-button>
        </el-button-group>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "RequestCard",
  props: {
    request: Object
  },
  data() {
    return {
      type: "请求",
      time: "xxxx-xx-xx xx:xx:xx",
      detail: "xxxxxxxxdetailxxxxxxxxxx"
    }
  },
  mounted() {
    // TODO: parsing request prop
  },
  methods: {}
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
.request-card .el-card__header, .el-card__body {
  padding: 10px 15px;
}
</style>
