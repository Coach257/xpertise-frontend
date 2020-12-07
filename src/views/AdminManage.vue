<template>
  <div data-title="管理页面" class="admin_page">
    <!--      <h1>AdminManagePage</h1>-->
    <el-container>
      <el-header>
        <NavBar></NavBar>
      </el-header>
      <el-container>
        <el-aside width="225px" id="aside_left">
          <admin-menu></admin-menu>
        </el-aside>
        <el-main :style="{height: spaceHeight}">
          <el-scrollbar style="height: 100%">
            <!--            <DocumentCard context="isWorkingSpace" v-for="(doc,index) in docList" :key="index" :doc="doc" :doc-type="'isDefault'"/>-->
            <!--            <div v-if="docList.length===0 && !isLoading" class="list_empty_notice">工作台空空如也</div>-->
          </el-scrollbar>
        </el-main><!--主体-->
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import NavBar from "@/components/common/NavBar";
  import AdminMenu from "@/components/admin/AdminMenu";

  export default {
    name: 'AdminManagePage',
    components: {AdminMenu, NavBar},
    data() {
      return {
        spaceHeight: window.innerHeight - 80 + 'px',
      }
    },
    mounted() {
      window.onresize = () => {
        return (() => {
          this.spaceHeight = window.innerHeight - 80 + 'px'
          if (!this.isScreenWide && window.innerWidth > 1500) {
            this.isScreenWide = !this.isScreenWide
            $(".doc_item").css("width", "30%")
          }
          if (this.isScreenWide && window.innerWidth <= 1500) {
            this.isScreenWide = !this.isScreenWide
            $(".doc_item").css("width", "45%")
          }
        })()
      }
    }
  }
</script>

<style scoped>
  #aside_left {
    border-right: 1px solid #DEDFE6;
    height: auto;
    padding: 10px;
  }

  .admin_page {
    min-width: 1000px;
  }
</style>
