
<template>
  <div style="width:100%;">
    <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入内容"
      v-model="textarea">
    </el-input>
    <el-button style="margin:10px" type="primary" @click="submitComment">提交评论</el-button>
    <el-divider v-if="commentList!=null&&commentList.length<1" content-position="left">暂无评论</el-divider>
    <el-divider v-else content-position="left">评论列表</el-divider>
    <CommentCard v-for="(comment,index) in commentList" :key="index" :comment="comment"
                  :index="index"></CommentCard>
  </div>
</template>

<script>
import CommentCard from '@/components/comment/CommentCard';
import axios from 'axios';
import moment from 'moment';
const testurl = "https://go-service-296709.df.r.appspot.com/api/v1/branch/comment/list_all_comments"
const commenturl = "https://go-service-296709.df.r.appspot.com/api/v1/branch/comment/create"
export default {
  name: "CommentCards",
  props: {
    id: String,
    paper: Object,
  },
  components: {
    CommentCard
  },
  data() {
    return{
      commentList: [],
      textarea: "",
    }
  },
  mounted () {
    this.getCommentList();
    console.log("传入的paper");
    console.log(this.paper);
  },
  methods: {
    getCommentList() {
      this.commentList = [];
      let that = this;
      let formData = new FormData();
      formData.append("paper_id", this.id);
      formData.append("user_id",localStorage.getItem("userid"))
      let config = { headers: { "Content-Type": "multipart/form-data", }, };
      axios.post(testurl, formData, config).then((response) => {
        if (response) {
          if (response.data.success) {
            let list = response.data.data;
            if(list == null) return ;
            for (let i = 0; i < list.length; i++) {
              this.commentList.push({
                create_time: moment(list[i]['comment_time']).fromNow(),
                content: list[i]['content'],
                dislike: list[i]['dislike'],
                like: list[i]['like'],
                username: list[i]['username'],
                comment_id: list[i]['comment_id'],
                on_top: list[i]['on_top'],
                paper_id: list[i]['paper_id'],
                user_id: list[i]['user_id'],
                author_name: list[i]['author_name'],
                status:list[i]['status'],
              })
            }
          } else {
            console.log(response)
          }
        }
      });
      if(this.commentList!=null)
        this.commentList.sort(
          function(x,y){
            if(x.on_top == y.on_top){
              if(x.like > y.on_top) return 1;
              else if(x.like < y.on_top) return -1;
              else return x.create_time > y.create_time;
            }
            else return x.on_top > y.on_top;
          }
        );
    },
    submitComment() {
      let that = this;
      let formData = new FormData();
      let list = this.paper.authors;
      var addition = "";
      for(let i = 0; i < list.length; i++) {
        if(list[i].name == localStorage.getItem("name"))
          addition = "(作者本人)";
      }
      formData.append("paper_id", this.id);
      formData.append("content", this.textarea);
      formData.append("user_id", localStorage.getItem("userid"));
      formData.append("author_name", localStorage.getItem("name") + addition);
      let config = { headers: { "Content-Type": "multipart/form-data", }, };
      axios.post(commenturl, formData, config).then((response) => {
        if (response) {
          if (response.data.success) {
            that.getCommentList();
          } else {
            console.log(response);
          }
        }x
      }).catch(function(e){console.log(e)});
    },
  },

}

</script>

<style scoped>

</style>
