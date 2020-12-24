<template>
  <div class = "comment_card">
    <el-card shadow="hover">
      <div slot="header" class="comment_header_area">
        <div class="comment_head">
        <div class="comment_avatar"><i class="el-icon-success" v-if=this.comment.on_top>置顶 </i>
          <i class="el-icon-user"/></div>
          <div class="comment_username" v-if="judgeSettle">  {{ this.comment.author_name.toUpperCase() }} (作者本人)</div>
          <div class="comment_username" v-else>  {{ this.comment.username }}</div>
          <br/>
        <div class="comment_create_time">{{ this.comment.create_time }}</div></div>
        <div class="comment_actions">
        <el-button-group>
          <el-button icon="el-icon-top" :type="getLikeType()" @click="dislikeOrLikeComment(1)" :disabled="cannotlike()">顶 {{this.getLikeCount()}}</el-button>
          <el-button icon="el-icon-bottom" :type="getDislikeType()" @click="dislikeOrLikeComment(2)" :disabled="cannotdislike()">踩 {{this.getDislikeCount()}}</el-button>
          <el-button icon="el-icon-bottom" @click="operateComment(1)" v-if="this.commentOperate">置顶</el-button>
          <el-button icon="el-icon-bottom" @click="operateComment(3)" v-if=this.commentOperate>删除</el-button>
        </el-button-group>
      </div></div>
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
const opeurl = "https://go-service-296709.df.r.appspot.com/api/v1/branch/comment/operate"
export default {
  name: "Drawer",
  props: {
    comment: Object,
  },
  mounted() {
    console.log(this.comment)
    let list = JSON.parse(localStorage.getItem("paper_info"));
    if(list === null) return
    for(let i = 0; i < list.length; i++) {
      let tmpt = JSON.parse(list[i]);
      if(tmpt.id == this.comment.paper_id)
        this.commentOperate = true;
    }
    this.judgeSettle = this.comment.author_name.length > 0;
  },
  methods: {
    getLikeCount(){return this.comment.like + (this.vote === 1?1:0);},
    getDislikeCount(){return this.comment.dislike + (this.vote === 2?1:0);},
    getLikeType(){
      if(this.cannotlike())return "success";
      else return "plain";
    },
    getDislikeType(){
      if(this.cannotdislike())return "success";
      else return "plain";
    },
    cannotlike(){
      if(this.comment.status =='该条评论该用户已点赞')return true;
      else return false;
    },
    cannotdislike(){
      if(this.comment.status == '该条评论该用户已点踩')return true;
      else return false;
    },
    handleClick2(method) {
      console.log(method);
    },
    dislikeOrLikeComment(method) {
      let that = this;
      let formData = new FormData();
      formData.append("comment_id", this.comment.comment_id);
      formData.append("user_id", localStorage.getItem("userid"));
      if(method === this.vote) method = 0;
      formData.append("method", method);
      let config = { headers: { "Content-Type": "multipart/form-data", }, };
      axios.post(testurl, formData, config).then((response) => {
        if (response) {
          if (response.data.success) {
            this.vote = method;
            this.$parent.getCommentList();
          } else {
            console.log(response)
          }
        }
      });
    },
    operateComment(method) {
      let that = this;
      let formData = new FormData();
      formData.append("comment_id", this.comment.comment_id);
      //formData.append("user_id", localStorage.getItem("userid"));
      formData.append("method", method);
      let config= { headers: { "Content-Type": "multipart/form-data", }, };
      axios.post(opeurl, formData, config).then((response) => {
        if (response) {
          if (response.data.success) {
            this.$parent.getCommentList();
          } else {
            console.log(response)
          }
        }
      });
    },
  },
  data() {
    return {
      short_abstract: "",
      itemExample: {
        username: "",
        create_time:"2020-12-18 20:23:23",
        comment:"this is an example comment",
      },
      vote:0,
      commentOperate: false,
      judgeSettle: false,
    };
  },
};
</script>

<style scoped>
.comment_header_area{
  display: flex; justify-content: "space-between"
}
.comment_avatar{
  display: inline;
}
.comment_username{
  display:inline;
  font-weight: bold;
}
.comment_create_time{
  display: inline-block;
  font-size: small;
}
.comment_head{
  /* float: left; */
  display: inline-block;
}
.comment_actions{
  display: inline-block;
  position: relative;
  right:0;
  margin-left:auto; margin-right:0;
  vertical-align: middle;

}

</style>
