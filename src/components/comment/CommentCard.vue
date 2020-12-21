<template>
  <div class = "comment_card">
    <el-card shadow="hover">
      <div slot="header" class="comment_header_area">
        <div class="comment_head">
        <div class="comment_avatar"><i class="el-icon-user"/></div>
        <div class="comment_username">  {{ this.$props.comment.username }}</div><br/>
        <div class="comment_create_time">{{ this.$props.comment.create_time }}</div></div>
        <div class="comment_actions">
        <el-button-group>
          <el-button icon="el-icon-top">顶</el-button>
          <el-button icon="el-icon-bottom">踩</el-button>
          <el-button icon="el-icon-more">操作</el-button>
        </el-button-group>
      </div></div>
      <div class="card_info">
        <span>
          {{ this.$props.comment.comment}}
        </span>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Drawer",
  props: ["comment"],
  mounted() {
    // this.$data.itemExample;
  },
  methods: {},
  data() {
    return {
      short_abstract: "",
      itemExample: {
        username:"usernmae",
        create_time:"2020-12-18 20:23:23",
        comment:"this is an example comment",
        upvote:12,
        downvote:11,
      },
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