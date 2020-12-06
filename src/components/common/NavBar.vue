<template>
  <div id="nav_bar">
    <div class="nav_bar_frame">
      <div class="nav_bar_icon">
        <div class="nav_bar_icon_title_bold">Xpertise</div>
        <div class="nav_bar_icon_title">Scholar</div>
      </div>
      <div class="nav_bar_item_outer_frame">
        <router-link
          :to="item.url"
          tag="div"
          class="nav_bar_item_frame"
          v-for="(item, i) in pages"
          :key="item"
          @click="onIndexChange(i)"
        >
          <div class="nav_bar_active_item" v-if="i === active_index">
            {{ item.title }}
          </div>
          <div class="nav_bar_inactive_item" v-else>
            {{ item.title }}
          </div>
        </router-link>
      </div>
      <div class="nav_bar_action_frame">
        <div v-if="logged_in === false">
          <router-link tag="div" class="nav_bar_action_link" to="/register">
            注冊
          </router-link>
          <router-link tag="div" class="nav_bar_action_link" to="/login">
            登录
          </router-link>
        </div>
        <div v-else>
          <router-link
            tag="div"
            class="nav_bar_action_link"
            :to="'/userinfo/' + user_info.id"
          >
            个人中心
          </router-link>
        </div>
      </div>
    </div>
    <div class="nav_bar_underline"></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: [],
  mounted() {
    /**
     * 获取登录状态
     *
     */
    var result = {
      logged_in: false,
      user_info: { avatar_url: null, name: null, id: null },
    };
    this.logged_in = result.logged_in;
    this.user_info = result.user_info;
  },
  data() {
    return {
      pages: [
        {
          title: "首页",
          url: "/",
        },
        {
          title: "学科",
          url: "/categories",
        },
        {
          title: "学者",
          url: "/scholars",
        },
      ],
      active_index: 0,
      logged_in: false,
      user_info: {
        avatar_url: null,
        name: null,
        id: null,
      },
    };
  },
  methods: {
    onIndexChange(i) {
      this.active_index = i;
      this.$root.$router.push(pages[this.active_index].url);
    },
  },
};
</script>

<style scoped>
#nav_bar {
  position: fixed;
  top: 0px;
  height: 46px;
  width: 100%;

  vertical-align: middle;
}
.nav_bar_frame {
  vertical-align: middle;
  height: 45px;
  background-color: white;
  opacity: 50%;
  backdrop-filter: blur(50px);
  width: 100%;
}
.nav_bar_underline {
  /* position: relative; */
  bottom: 0px;
  height: 0.5px;
  opacity: 50%;
  background-color: grey;
  width: 100vw;
}

.nav_bar_icon {
  margin-left: 25px;
  float: left;
  line-height: 45px;
  font-family: "MavenPro";
  vertical-align: middle;
  height: 45px;
}
.nav_bar_icon_title_bold {
  display: inline;
  font-weight: bold;
}
.nav_bar_icon_title {
  display: inline;
}
.nav_bar_item_outer_frame {
  float: left;
  margin-left: 20px;
}
.nav_bar_item_frame {
  display: inline;
  color: black;
  margin: 0px 10px 10px 0px;
  line-height: 45px;
}
.nav_bar_active_item {
  display: inline;
  line-height: 45px;
  border-bottom-style: outset;
  border-bottom-color: black;
  border-bottom-width: 2px;
  font-weight: bold;
  height: 45px;
  width: 100%;
}
.nav_bar_inactive_item {
  display: inline;
}
.nav_bar_action_frame {
  float: right;
  margin-right: 50px;
}
.nav_bar_action_link {
  display: inline;
  line-height: 45px;
}
</style>