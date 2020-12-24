<template>
    <div id="recommend_section" v-if="examplerecommends.length<1">
        <el-divider  content-position="left">暂无专家推荐</el-divider>
    </div>
    <div v-else>
      <RecommendCard v-for="(item, index) in examplerecommends" :key="index" :recommend="item"/>
    </div>
</template>

<script>
import RecommendCard from "./RecommendCard";
import axios from 'axios';
import moment from 'moment';
const testurl = "https://go-service-296709.df.r.appspot.com/api/v1/portal/recommend/recommends_from_one_paper"
export default{
  components: { RecommendCard },
  name: "RecommendSection",
  props: ['recommends'],
  mounted() {
      this.getRecommendation();
  },
  methods: {
    getRecommendation(){
      this.examplerecommends = [];
      let that = this;
      let formData = new FormData();
      formData.append("paper_id", this.$route.params.docid);
      let config = { headers: { "Content-Type": "multipart/form-data", }, };
      axios.post(testurl, formData, config).then((response) => {
        if (response) {
          if (response.data.success) {
            let list = response.data.data;
            for(let i = 0; i < list.length; i++) {
              this.examplerecommends.push({
                username: list[i].author_name,
                recommend: list[i].reason,
                create_time: moment(list[i].recommend_time).fromNow(),
              })
            }
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
      /*
      recommendExample: {
        username:"专家名称",
        create_time:"2020-12-18 20:23:23",
        recommend:"this is an example recommend",
        upvote:12,
        downvote:11,
      },
      */
      examplerecommends:[
      ]
    };
  },
};
</script>
