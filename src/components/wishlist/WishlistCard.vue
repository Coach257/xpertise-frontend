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

        <el-button
          slot="reference"
          style="height: 50"
          type="primary"
          icon="el-icon-document"
          @click="onSee"
          plain
          >查看</el-button
        >

        <el-button
          style="height: 50; margin-left: 10px"
          type="primary"
          v-clipboard:copy="copylink"
          icon="el-icon-share"
          >分享链接</el-button
        >
      </div>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
import DetailPreview from "./DetailPreview";
export default {
  name: "WishlistCard",
  components: {
    DetailPreview,
  },
  props: {
    wish: {
    },
    click_call_back: {
      //定义一个外来方法
      type: Function,
    },
    url:"",
  },
  computed: {
    copylink(){
      return window.location.href.split('/')[2]+ '/detail/' + this.$props.wish.type + '/' + this.$props.wish.paper_id;
    } 
  },
  methods: {
    getid() {
      return this.$props.wish.paper_id;
    },
    onSee() {
      window.open('/detail/' + this.$props.wish.type + '/' + this.$props.wish.paper_id);
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