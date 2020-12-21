
<template>
  <div style="width:100%;">
    <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入内容"
      v-model="textarea">
    </el-input>
    <el-button style="margin:10px" type="primary" @click="submitComment">提交评论</el-button>
    <HR style="border:1 dashed silver" color=silver SIZE=1 />
    <CommentCard v-for="(comment,index) in commentList" :key="index" :comment="comment"
                  :index="index"></CommentCard>
  </div>
</template>

<script>
import CommentCard from '@/components/comment/CommentCard'
import axios from 'axios'

const testurl = "https://go-service-296709.df.r.appspot.com/api/v1/branch/comment/list_all_comments"
const commenturl = "https://go-service-296709.df.r.appspot.com/api/v1/branch/comment/create"
export default {
  name: "CommentCards",
  props: {
    id: String
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
    console.log(this.id);
    let that = this;
    let formData = new FormData();
    formData.append("paper_id", this.id);
    let config = { headers: { "Content-Type": "multipart/form-data", }, };
    axios.post(testurl, formData, config).then((response) => {
        if (response) {
          if (response.data.success) {
            let list = response.data.data;
            for (let i = 0; i < list.length; i++) {
              this.commentList.push({
                create_time: list[i]['comment_time'],
                content: list[i]['content'],
                dislike: list[i]['dislike'],
                like: list[i]['like'],
                username: list[i]['username'],
                comment_id: list[i]['comment_id'],
                on_top: list[i]['on_top'],
                paper_id: list[i]['paper_id'],
                user_id: list[i]['user_id'],
              })
            }
          } else {
            console.log(response)
          }
        }
      });
  },
  methods: {
    submitComment() {
      let that = this;
      let formData = new FormData();
      formData.append("paper_id", this.id);
      formData.append("content", this.textarea);
      formData.append("user_id", localStorage.getItem("userid"));
      let config = { headers: { "Content-Type": "multipart/form-data", }, };
      axios.post(commenturl, formData, config).then((response) => {
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

}

</script>

<style scoped>

</style>
