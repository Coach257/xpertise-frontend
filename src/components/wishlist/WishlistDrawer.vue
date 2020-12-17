<template>
  <div id="wishlist_drawer">
    <el-button
      icon="el-icon-shopping-cart-full"
      @click="openDrawer()"
      circle
    ></el-button>
    <el-drawer
      title="个人清单"
      :visible.sync="drawer"
      :before-close="beforeCloseDrawer"
      :with-header="false"
    >
    </el-drawer>
    <WishlistCard v-for="(item) in items" :key="item" :item="item"></WishlistCard>
  </div>
</template>
<script>
import WishlistCard from "./WishlistCard.vue";
export default {
  name: "WishlistDrawer",
  methods: {
    openDrawer() {
      this.$data.drawer = true;
    },
    beforeCloseDrawer() {

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
          "id":"id",
          "abstract":"abstract",
          "title":"title",
        }
      ],
    };
  },
};
</script>