<template>
  <div id="wishlist_card">
    <el-card class="wishlist_card" shadow="hover">
      <div slot="header">
        <span>{{ this.$props.wish.title }}</span>
        <el-button
          style="float: right"
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="onDelete"
          circle
        ></el-button>
      </div>
      <div class="wishlist_card_info">
        <el-divider content-position="left">操作</el-divider>
        <!-- <el-popover
          placement="left"
          width="600"
          trigger="hover"
          content="this is content, this is content, this is content"
        >
          <el-button
            slot="reference"
            style="height: 50"
            type="primary"
            icon="el-icon-document"
            plain
            >预览</el-button
          >
          <detail-preview type="main" :docid="getid" />
        </el-popover> -->
        <el-button
          style="height: 50; margin-left: 10px"
          type="primary"
          @click="onShare"
          icon="el-icon-share"
          >分享链接</el-button
        >
      </div>
    </el-card>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: "WishlistCard",
  props: {
    wish: {},
    click_call_back: {
      //定义一个外来方法
      type: Function,
    },
  },
  mounted() {
  },
  methods: {
    getid() {
      return this.$props.wish.paper_id;
    },
    onShare(){

    },
    onDelete() {
      let that = this;
      let formData = new FormData();
      formData.append("wish_id", this.wish.wish_id);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(
          "https://go-service-296709.df.r.appspot.com/api/v1/user/wish/remove",
          formData,
          config
        )
        .then((response) => {
          if (response) {
            if (response.data.success) {
              console.log("删除成功", response.data);
              this.delete_call_back();
            } else {
              console.log("删除失败", response.data);
              alert("删除失败，请检查网络");
            }
          } else {
            console.log("收藏失败", response.data);
            alert("删除失败，请检查网络");
          }
        });
    },
  },
  data() {
    return {
      short_abstract: "",
      itemExample: {
        wish_id: 1,
        user_id: 2,
        title: "title",
        paper_id: "id",
        n_citation: 0,
        paper_publish_year: "",
        url: "url",
      },
    };
  },
};
</script>

<style scoped>
.wishlist_card {
  margin: 20px;
}
</style>