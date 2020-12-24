<template>
  <div data-title="管理页面" class="user_page">
    <!--      <h1>AdminManagePage</h1>-->
    <el-container>
      <el-aside width="225px" id="aside_left">
        <el-menu active-text-color="#1A1A1A"
                 text-color="#5E5E5E"
                 mode="vertical"
                 :default-active="this.$route.path">

          <router-link :to="{name: 'MessageModify'}">
            <el-menu-item index="/user/message-modify">
              <i class=""></i>
              <span slot="title">个人信息修改</span>
            </el-menu-item>
          </router-link>

          <el-divider class="divider"></el-divider>

          <router-link :to="{name: 'MyCollection'}">
            <el-menu-item index="/user/my-collection">
              <i class=""></i>
              <span slot="title">我的收藏</span>
            </el-menu-item>
          </router-link>

          <el-divider class="divider"></el-divider>

          <router-link :to="{name: 'MessageCentre'}">
            <el-menu-item index="/user/message-contre">
              <i class=""></i>
              <span slot="title">消息中心</span>
            </el-menu-item>
          </router-link>

        </el-menu>
      </el-aside>
      <el-main :style="{height: spaceHeight}">
        <router-view></router-view>
      </el-main><!--主体-->
    </el-container>
  </div>
</template>


<script>
export default {
  name : 'UserInfo',
  data() {
    return {
      activeIndex: 'message-modify',
      spaceHeight: window.innerHeight - 80 + 'px',
    };
  },
  methods: {
  },
  mounted() {
    console.log(this.$route.path)
    window.addEventListener('resize', () => {
      this.spaceHeight = window.innerHeight - 80 + 'px'
    }, false)
  }
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

.user_page {
  min-width: 1000px;
}
</style>
