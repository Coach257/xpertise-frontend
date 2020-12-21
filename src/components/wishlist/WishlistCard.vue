<template>
  <div id="wishlist_card">
    <el-card class="wishlist_card" shadow="hover">
      <div slot="header">
        <span>{{ this.$props.wish.title }}</span>
      </div>
      <div class="wishlist_card_info">
        <el-divider content-position="left">摘要</el-divider>
        <span>
          {{ this.$data.short_abstract }}
        </span>
        <el-divider content-position="left">操作</el-divider>
        <el-button-group>
          <el-button type="primary" icon="el-icon-document">查看</el-button>
          <el-button type="primary" icon="el-icon-share">分享链接</el-button>
          <el-button type="danger" icon="el-icon-delete">移除</el-button>
        </el-button-group>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "WishlistCard",
  props:["wish"],
  mounted() {
    this.$data.short_abstract = 
         this.$props.wish.abstract.substring(0, 40) + "...";
  },
  methods: {},
  data() {
    return {
      short_abstract: "",
      itemExample: {
        title: "title",
        abstract: "abstract",
        authors: "authors",
        id: "id",
      },
    };
  },
};
</script>

<style scoped>
.wishlist_card{
  margin:20px
}
</style>