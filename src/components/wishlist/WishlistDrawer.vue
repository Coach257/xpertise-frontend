<template>
  <div id="wishlist_drawer">
    <el-button
      class="wishlist_button"
      icon="el-icon-shopping-cart-full"
      type="success"
      @click="openDrawer"
      circle
    ></el-button>
    <el-drawer
      title="个人清单"
      :visible.sync="drawer"
      :before-close="beforeCloseDrawer"
      v-if="userid"
      :with-header="true"
    >
      <el-divider content-position="left">我的清单</el-divider>
      <WishlistCard v-for="(wish,index) in items" :key="index" :wish="wish" :click_call_back="refreshData" />
    </el-drawer>
  </div>
</template>
<script>
import WishlistCard from "../wishlist/WishlistCard";
import axios from "axios";
export default {
  name: "WishlistDrawer",
  components: { WishlistCard },
  methods: {
    openDrawer() {
      if(this.userid){
        this.refreshData()
        this.drawer = true;
      } else {
        alert("请先登录")
      }
    },
    beforeCloseDrawer(done) {
      this.drawer = false;
      done();
    },
    refreshData() {
      var _this = this;
      let formData = new FormData();
      formData.append("user_id", this.userid);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(
          "https://go-service-296709.df.r.appspot.com/api/v1/user/wish/list",
          formData,
          config
        )
        .then(function (response) {
          if (response && response.data.success === true) {
            _this.items = response.data.data;
          }
          else {
            alert("更新失败");
          }
        })
        .catch(function (e) {
          console.log(e);
        });
    },
  },
  created() {
    this.userid = localStorage.getItem("userid");
    if(this.userid != null){
      this.refreshData();
    }
  },
  data() {
    return {
      drawer: false,
      items: [
        // {
        //   wish_id: 1,
        //   user_id:2,
        //   title:"title",
        //   paper_id:"id",
        //   n_citation:0,
        //   paper_publish_year:"",
        //   url:"url",
        // },
      ],
      userid: null,
    };
  },
};
</script>
<style scoped>
.wishlist_button {
  position: fixed;
  z-index: 1001;
  bottom: 20px;
  right: 20px;
  height: 46px;
  width: 46px;
}
</style>