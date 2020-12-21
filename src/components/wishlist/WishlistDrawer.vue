<template>
  <div id="wishlist_drawer">
    <el-button
      class="wishlist_button"
      icon="el-icon-shopping-cart-full"
      type="success"
      @click="openDrawer()"
      circle
    ></el-button>
    <el-drawer
      title="个人清单"
      :visible.sync="drawer"
      :before-close="beforeCloseDrawer"
      :with-header="true"
    >
        <el-divider content-position="left">我的清单</el-divider>
        <WishlistCard v-for="(wish) in items" :key="wish" :wish="wish"/>
    </el-drawer>
  </div>
</template>
<script>
import RecommendCard from '../recommendation/RecommendCard';
import WishlistCard from "../wishlist/WishlistCard";
export default {
  name: "WishlistDrawer",
  components:{WishlistCard,RecommendCard},
  methods: {
    openDrawer() {
      this.$data.drawer = true;
    },
    beforeCloseDrawer(done) {
      done();
    },
    refreshData() {
      /**在这里获取清单内容*/
    },
  },
  data() {
    return {
      drawer: false,
      items:[
        {
          id:"id",
          abstract:"abstract",
          title:"title",
        }
      ],
    };
  },
};
</script>
<style scoped>
.wishlist_button{
  position: fixed;
  z-index:1001;
  bottom:20px;
  right: 20px;
  height: 46px;
  width: 46px;
}
</style>