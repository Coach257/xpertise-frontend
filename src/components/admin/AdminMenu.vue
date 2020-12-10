<template>
  <div>
    <div class="aside_menu">
      <el-menu active-text-color="#1A1A1A"
               text-color="#5E5E5E"
               mode="vertical"
               :default-active="this.$route.path"
               @select="handleSelect"
               router>
        <el-menu-item index="/admin/application-manage">
          <i class=""></i>
          <span slot="title">申请处理</span>
        </el-menu-item>

        <el-divider class="divider"></el-divider>

        <el-menu-item index="report-manage">
          <i class=""></i>
          <span slot="title">举报处理</span>
        </el-menu-item>

        <el-divider class="divider"></el-divider>

        <el-menu-item index="settle-manage">
          <i class=""></i>
          <span slot="title">入驻处理</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminMenu",
  data() {
    return {
      activeIndex: 'report-manage',
    };
  },
  mounted() {
    console.log(this.$route.path)
  },
  methods: {
    handleSelect(key) {
      console.log(key)
      switch (key) {
        case "report-manage":
          console.log("举报处理");
          this.$router.push('/report-manage')
          break;
        case "application-manage":
          console.log("申请处理");
          this.$router.push('/application-manage')
          break;
        case "settle-manage":
          console.log("入驻处理");
          this.$router.push('/settle-manage')
          break;
      }
    }
  }
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
