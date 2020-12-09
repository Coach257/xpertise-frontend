<template>
  <div class="aside_menu">
    <el-menu active-text-color="#1A1A1A"
             text-color="#5E5E5E"
             @open=""
             @close=""
             mode="vertical">
      <el-menu-item>
        <i class=""></i>
        <span slot="title">申请处理</span>
      </el-menu-item>

      <el-divider class="divider"></el-divider>

      <el-menu-item>
        <i class=""></i>
        <span slot="title">举报处理</span>
      </el-menu-item>

      <el-divider class="divider"></el-divider>

      <el-menu-item>
        <i class=""></i>
        <span slot="title">举报处理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "AdminMenu"
  }
</script>



<style>
  .aside_menu {
  }

  .divider {
    margin: 5px 0 !important;
  }

  .el-menu {
    border: 0 !important;
  }
</style>
