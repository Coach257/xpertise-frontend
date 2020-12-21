<template>
    <div id="comment_section">
        <CommentCard v-for="(item) in exampleComments" :key="item" :comment="item"/>
    </div>
</template>

<script>
import CommentCard from "./CommentCard";
export default{
  components: { CommentCard },
  name: "CommentSection",
  props: ['comments'],
  mounted() {
      this.exampleComments.push(this.commentExample)
    //   this.exampleComments.push(this.commentExample),
    //   this.exampleComments.push(this.commentExample)
    // this.$data.itemExample;
  },
  methods: {},
  data() {
    return {
      short_abstract: "",
      commentExample: {
        username:"usernmae",
        create_time:"2020-12-18 20:23:23",
        comment:"this is an example comment",
        upvote:12,
        downvote:11,
      },
      exampleComments:[
         
      ]
    };
  },
};
</script>