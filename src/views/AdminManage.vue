<template>
  <div data-title="管理页面">
    <!--      <h1>AdminManagePage</h1>-->
    <el-container>
      <el-header>
        <NavBar></NavBar>
      </el-header>
      <el-container>
        <el-aside>

        </el-aside>
        <el-main>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";

export default {
  name: 'AdminManagePage',
  components: {NavBar}
}
</script>
