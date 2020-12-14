<template>
  <div data-title="管理页面" class="admin_page">
    <!--      <h1>AdminManagePage</h1>-->
    <el-container>
      <el-aside width="225px" id="aside_left">
        <el-menu active-text-color="#1A1A1A"
                 text-color="#5E5E5E"
                 mode="vertical"
                 :default-active="this.$route.path">

          <router-link :to="{name: 'ApplicationManage'}">
            <el-menu-item index="/admin/application-manage">
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

          <el-divider class="divider"></el-divider>

          <router-link :to="{name: 'SettleManage'}">
            <el-menu-item index="/admin/settle-manage">
              <i class=""></i>
              <span slot="title">入驻处理</span>
            </el-menu-item>
          </router-link>

        </el-menu>
      </el-aside>
      <el-main :style="{height: spaceHeight}">
        <router-view></router-view>
        <!--          <el-scrollbar style="height: 100%">-->
        <!--            <request-card></request-card>-->
        <!--            <request-card></request-card>-->
        <!--            <request-card></request-card>-->
        <!--            <request-card></request-card>-->
        <!--            <request-card></request-card>-->

        <!--            &lt;!&ndash;            <DocumentCard context="isWorkingSpace" v-for="(doc,index) in docList" :key="index" :doc="doc" :doc-type="'isDefault'"/>&ndash;&gt;-->
        <!--            &lt;!&ndash;            <div v-if="docList.length===0 && !isLoading" class="list_empty_notice">工作台空空如也</div>&ndash;&gt;-->
        <!--            -->
        <!--            ?-->
        <!--          </el-scrollbar>-->
      </el-main><!--主体-->
    </el-container>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
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


