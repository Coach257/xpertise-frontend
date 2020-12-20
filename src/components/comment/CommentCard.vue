<template>
  <div>
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <div class="comment_avatar"></div>
        <div>
        <span>{{ this.comment.username }}</span>
        </div>
      <div>
        <span>{{ this.comment.create_time }}</span>
      </div>
        <el-button-group>
          <el-button icon="el-icon-top" @click="dislikeOrLikeComment(1)">顶</el-button>
          <el-button icon="el-icon-bottom" @click="dislikeOrLikeComment(2)">踩</el-button>
          <el-button icon="el-icon-more">操作</el-button>
        </el-button-group>
      </div>
      <div class="card_info">
        <span>
          {{ this.comment.content }}
        </span>
      </div>
    </el-card>
  </div>
</template>
<script>
import axios from 'axios'
const testurl = "https://go-service-296709.df.r.appspot.com/api/v1/branch/comment/give_a_like_or_dislike"
export default {
  name: "Drawer",
  props: {
    comment: Object,
  },
  mounted() {
    console.log("评论");
    console.log(this.comment);
  },
  methods: {
    dislikeOrLikeComment(method) {
      let that = this;
      let formData = new FormData();
      formData.append("comment_id", this.comment.comment_id);
      formData.append("user_id", localStorage.getItem("userid"));
      formData.append("method", method);
      let config = { headers: { "Content-Type": "multipart/form-data", }, };
      axios.post(testurl, formData, config).then((response) => {
        if (response) {
          console.log(response);
          if (response.data.success) {

          } else {
            console.log(response)
          }
        }
      });
    },
  },
  data() {
    return {
    }
  },
};
</script>
