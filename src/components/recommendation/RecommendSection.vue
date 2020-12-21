<template>
    <div id="recommend_section">
        <RecommendCard v-for="(item) in examplerecommends" :key="item" :recommend="item"/>
    </div>
</template>

<script>
import RecommendCard from "./RecommendCard";
export default{
  components: { RecommendCard },
  name: "RecommendSection",
  props: ['recommends'],
  mounted() {
      this.examplerecommends.push(this.recommendExample)
    //   this.examplerecommends.push(this.recommendExample),
    //   this.examplerecommends.push(this.recommendExample)
    // this.$data.itemExample;
  },
  methods: {},
  data() {
    return {
      short_abstract: "",
      recommendExample: {
        username:"usernmae",
        create_time:"2020-12-18 20:23:23",
        recommend:"this is an example recommend",
        upvote:12,
        downvote:11,
      },
      examplerecommends:[
         
      ]
    };
  },
};
</script>