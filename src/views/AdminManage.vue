<template>
  <div data-title="管理页面" class="admin_page">
    <!--      <h1>AdminManagePage</h1>-->
    <el-container>
      <el-aside width="225px" id="aside_left">
        <el-menu active-text-color="#1A1A1A"
                 text-color="#5E5E5E"
                 mode="vertical"
                 :default-active="this.$route.path">

          <router-link :to="{name: 'RequestManage'}">
            <el-menu-item index="/admin/request-manage">
              <i class=""></i>
              <span slot="title">申请处理</span>
            </el-menu-item>
          </router-link>

          <el-divider class="divider"></el-divider>

          <router-link :to="{name: 'ReportManage'}">
            <el-menu-item index="/admin/report-manage">
              <i class=""></i>
              <span slot="title">举报处理</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-main :style="{height: spaceHeight}">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AdminMenu from "@/components/admin/AdminMenu";
import RequestCard from "@/components/admin/RequestCard";

export default {
  name: 'AdminManagePage',
  components: {AdminMenu, RequestCard},
  data() {
    return {
      activeIndex: 'report-manage',
      spaceHeight: window.innerHeight - 80 + 'px',
    };
  },
  mounted() {
    console.log(this.$route.path)
    window.addEventListener('resize', () => {
      this.spaceHeight = window.innerHeight - 80 + 'px'
    }, false)
  },
  methods: {}
}
</script>


<style>
/* scrollbar style */
.admin_page .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

<style scoped>
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

#aside_left {
  border-right: 1px solid #DEDFE6;
  height: auto;
  padding: 10px;
}

.admin_page {
  min-width: 1000px;
}
</style>


