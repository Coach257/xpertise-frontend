<template>
  <div id="result_detail_page" v-if="loadfinish">
    <div class="result_detail_page_container">
      <div class="result_detail_title_area">
        <div class="result_detail_title">
          {{ this.article.title }}
        </div>
        <div class="result_detail_author_container">
          <router-link
            tag="div"
            :to="'/author/' + $route.params.type + '/' + author.id"
            class="result_detail_author"
            v-for="(author, index) in this.article.authors"
            :key="author.id"
          >
            {{ author.name }}
            {{ author.org }} ,
            <div
              style="display: inline"
              v-if="index < article.authors_count - 1"
            >
              ,
            </div>
          </router-link>
        </div>
      </div>
      <div class="result_detail_article_area">
        <h3>摘要</h3>
        <p>{{ this.article.abstract }}</p>
        <h3>信息</h3>
        <!-- <p v-for="item in article.other" :key="item.name1">item</p> -->
        <p>{{ this.article.year }}</p>
        <p>{{ this.article.keywords }}</p>
        <p>{{ this.article.n_citation }}</p>
        <p>{{ this.article.page_start }} {{ this.article.page_end }}</p>
        <p>{{ this.article.lang }}</p>
        <p>{{ this.article.issue }}</p>
        <p>{{ this.article.venue }}</p>
        <p>{{ this.article.conference }}</p>
        <p>{{ this.article.issn }}</p>
        <p>{{ this.article.doi }}</p>
        <p>{{ this.article.url }}</p>
      </div>
      <div class="result_detail_side_area">
        <div class="result_detail_side_container">
          <h3>下载</h3>
          <el-button type="primary" icon="el-icon-document" plain
            >查看原文</el-button
          >
          <el-button icon="el-icon-download" plain>下载</el-button>
          <h3>引用</h3>
          <el-button icon="el-icon-document-copy" plain>复制引用信息</el-button>
          <h3>操作</h3>
          <el-button
            type="warning"
            icon="el-icon-star-off"
            v-if="article.starred === false"
            @click="addToFav"
            plain
            >收藏</el-button
          >
          <el-button
            type="warning"
            icon="el-icon-star-on"
            v-else
            @click="removeFromFav"
            >已收藏</el-button
          >
          <el-button type="warning" @click="showInfo">显示信息</el-button>
        </div>
      </div>
      <div v-if="referenceloadfinish">这里要加引用关系图谱</div>
    </div>
  </div>
</template>
<script>
import { SearchDriver } from "@elastic/search-ui";
import {
  mainpaperconfig,
  mainauthorconfig,
  cspaperconfig,
  csauthorconfig,
  csaffiliationconfig,
} from "../searchConfig";
import axios from "axios"
var driver = null;

export default {
  name: "Detail",
  props: [],
  components: {},
  mounted() {
    console.log(this.$route.params.type);
    if (this.$route.params.type == "cs") {
      driver = new SearchDriver(cspaperconfig);
    } else {
      driver = new SearchDriver(mainpaperconfig);
    }
    driver.reset()
    driver.setResultsPerPage(1)
    driver.addFilter("id", this.$route.params.docid, "any");
    driver.subscribeToStateChanges((state) => {
      this.searchState = state;
    });
  },
  data() {
    return {
      article: {
        paper_id: "",
        title: "",
        authors: [],
        abstract:"",
        year:"",
        keywords: [],
        n_citation:"",
        page_start:"",
        page_end:"",
        lang:"",
        issue:"",
        venue:"",
        conference:"",
        volume:"",
        issn:"",
        doi:"",
        url:"",
        listed: false,
        starred: false,
      },
      searchState: {},
      referenceloaded:false,
      articleloaded:false
    };
  },
  watch: {
    '$route':function(newVal,oldVal){
      console.log("路由"+newVal+"---"+oldVal);
      console.log("新")
      console.log(newVal)
      console.log(newVal.fullPath)
      console.log("老")
      console.log(oldVal)
      console.log(oldVal.fullPath)
      console.log(oldVal.fullPath[0]+oldVal.fullPath[1])
      console.log("判断")
      console.log(oldVal.fullPath[0]+"-----"+newVal.fullPath[0])
      console.log(oldVal.fullPath[1]+"-----"+newVal.fullPath[1])
      console.log(oldVal.fullPath[2]+"-----"+newVal.fullPath[2])
      console.log(oldVal.fullPath[3]+"-----"+newVal.fullPath[3])
      console.log(oldVal.fullPath[4]+"-----"+newVal.fullPath[4])
      console.log(oldVal.fullPath[5]+"-----"+newVal.fullPath[5])
      console.log(oldVal.fullPath[6]+"-----"+newVal.fullPath[6])
      console.log(oldVal.fullPath[7]+"-----"+newVal.fullPath[7])
      console.log(oldVal.fullPath[8]+"-----"+newVal.fullPath[8])
      console.log(oldVal.fullPath[9]+"-----"+newVal.fullPath[9])
      console.log(oldVal.fullPath[10]+"-----"+newVal.fullPath[10])
      console.log(oldVal.fullPath[11]+"-----"+newVal.fullPath[11])
      console.log(oldVal.fullPath[12]+"-----"+newVal.fullPath[12])
      console.log(oldVal.fullPath[13]+"-----"+newVal.fullPath[13])
      console.log(oldVal.fullPath[14]+"-----"+newVal.fullPath[14])
      console.log(oldVal.fullPath[15]+"-----"+newVal.fullPath[15])
      console.log(oldVal.fullPath[16]+"-----"+newVal.fullPath[16])
      console.log(oldVal.fullPath[17]+"-----"+newVal.fullPath[17])
      console.log(oldVal.fullPath[18]+"-----"+newVal.fullPath[18])
      console.log(oldVal.fullPath[19]+"-----"+newVal.fullPath[19])
      if (newVal.fullPath[0]==oldVal.fullPath[0]&&
          newVal.fullPath[1]==oldVal.fullPath[1]&&
          newVal.fullPath[2]==oldVal.fullPath[2]&&
          newVal.fullPath[3]==oldVal.fullPath[3]&&
          newVal.fullPath[4]==oldVal.fullPath[4]&&
          newVal.fullPath[5]==oldVal.fullPath[5]&&
          newVal.fullPath[6]==oldVal.fullPath[6]&&
          newVal.fullPath[7]==oldVal.fullPath[7]&&
          newVal.fullPath[8]==oldVal.fullPath[8]&&
          newVal.fullPath[9]==oldVal.fullPath[9]&&
          newVal.fullPath[10]==oldVal.fullPath[10]&&
          newVal.fullPath[11]==oldVal.fullPath[11]&&
          newVal.fullPath[12]==oldVal.fullPath[12]&&
          newVal.fullPath[13]==oldVal.fullPath[13]&&
          newVal.fullPath[14]==oldVal.fullPath[14]&&
          newVal.fullPath[15]==oldVal.fullPath[15]&&
          newVal.fullPath[16]==oldVal.fullPath[16]&&
          newVal.fullPath[17]==oldVal.fullPath[17]&&
          newVal.fullPath[18]==oldVal.fullPath[18]&&
          newVal.fullPath[19]==oldVal.fullPath[19]&&
          newVal.fullPath[20]==oldVal.fullPath[20]
          ){
        console.log("仍在原本的路由位置")
        this.$router.replace('/home');
        //this.$router.go(-10);
        window.location.reload();
      }
      else cosole.log("正常跳转到别的网页")
      console.log("路由结束")
    },
    searchState(newsearchState) {
      if (this.thereAreResults()) {
        // 任意一种result都有可能没有任意一种属性,任意一种属性的值都有可能为空
        var results = newsearchState.results[0];
        var raw;
        this.article.paper_id = results.id.raw;
        this.article.starred = this.isFav()
        // 更新标题
        if(results.title)this.article.title = results.title.raw;
        // 更新作者
        if(results.authors){
          raw = results.authors.raw;
          for (var i = 0; i<raw.length;i++){
            this.article.authors.push(JSON.parse(raw[i]));
          }
        }
        // 更新摘要
        if(results.abstract)this.article.abstract = results.abstract.raw;
        // 更新发布年份
        if(results.year)this.article.year = results.year.raw;
        // 更新关键词
        if(results.keywords){
          raw = results.keywords.raw;
          for (var i = 0; i<raw.length;i++){
            this.article.keywords.push(raw[i]);
          }
        }
        // 更新引用数
        if(results.n_citation)this.article.n_citation = results.n_citation.raw;
        // 更新页
        if(results.page_start){
          this.article.page_start = results.page_start.raw;
          this.article.page_end = results.page_end.raw;
        }      
        if(results.lang)this.article.lang = results.lang.raw;
        if(results.issue)this.article.issue = results.issue.raw;
        if(results.venue)this.article.venue = results.venue.raw;
        if(results.conference)this.article.conference = results.conference.raw;
        if(results.volume)this.article.volume = results.volume.raw;
        if(results.issn)this.article.issn = results.issn.raw;
        if(results.doi)this.article.doi = results.doi.raw;
        if(results.url)this.article.url = results.url.raw;
        if(this.$route.params.type=='cs'){
          this.loadreference();
        }
        this.articleloaded = true;
      }
      driver = null;
    },
  },
  computed: {
    //computed最高优先级，只有当loadfinish为true时,才开始页面加载
    loadfinish(){
      return this.articleloaded;
    },
    referenceloadfinish(){
      return this.referenceloaded;
    }
  },
  methods: {
    addToFav(){
      let that = this;
      let formData = new FormData();
      formData.append("user_id",localStorage.getItem("userid"));
      console.log(this.$data);
      formData.append("paper_id",this.article.paper_id);
      let paperInfo = JSON.stringify(this.article);
      let articleWithoutAbstract = JSON.parse(paperInfo);
      delete articleWithoutAbstract["abstract"];
      paperInfo = JSON.stringify(articleWithoutAbstract);
      formData.append("paper_info",paperInfo);
      let config = {headers: {'Content-Type': 'multipart/form-data'} };
      axios.post("https://go-service-296709.df.r.appspot.com/api/v1/user/favorite/add",formData,config).then(response => {
        if(response) {
          if(response.data.success) {
            console.log("收藏成功",response.data);
            that.$data.article.starred = true;
          }else {
            console.log("收藏失败" + response.data);
            alert("收藏文献失败，请检查网络");
          }
        }else {
          console.log("收藏失败" + response.data);
          alert("收藏文献失败，请检查网络");
        }
      })
    },
    removeFromFav() {
      let that = this;
      let formData = new FormData();
      formData.append('user_id', localStorage.getItem('userid'));
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      axios.post('https://go-service-296709.df.r.appspot.com/api/v1/user/favorite/list', formData, config).then(response => {
        if(response) {
          if(response.data.success) {
            let favorArray = response.data.data;
            console.log(favorArray);
            for(let i = 0, len = favorArray.length; i < len; i++) {
              if(favorArray[i].paper_id == this.article.paper_id) {
                formData = new FormData();
                formData.append("favor_id",favorArray[i].favor_id);
                axios.post("https://go-service-296709.df.r.appspot.com/api/v1/user/favorite/remove",formData,config).then(response => {
                  if(response) {
                    if(response.data.success) {
                      console.log("删除成功",response.data);
                      that.$data.article.starred = false;
                    }else {
                      console.log("删除失败",response.data);
                      alert("取消收藏失败，请检查网络");
                    }
                  }else {
                    console.log("收藏失败",response.data);
                    alert("取消收藏失败，请检查网络");
                  }
                })
              }
            }
          } else {
            console.log(response.data);
            console.log("获取失败 " + response.data);
            alert("收藏列表获取失败，请检查网络");
          }
        } else {
          console.log(response.data);
          console.log("获取失败 " + response.data);
          alert("收藏列表获取失败，请检查网络");
        }
      });
    },
    thereAreResults() {
      return this.searchState.totalResults && this.searchState.totalResults > 0;
    },
    loadreference(){
      console.log("这个函数请求引用关系");
      this.referenceloaded = true;
    },
    showInfo() {
      console.log(this.searchState);
      console.log(this.article.authors);
      console.log(this.authors);
      console.log(JSON.parse(this.searchState.results[0].authors.raw[0]));
    },
    isFav(){
      let that = this;
      let formData = new FormData();
      formData.append('user_id', localStorage.getItem('userid'));
      formData.append('paper_id',this.article.id);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      axios.post('https://go-service-296709.df.r.appspot.com/api/v1/user/favorite/isfav', formData, config).then(response => {
        if(response) {
          if(response.data.message == "true"){
            return true;
          }else {
            return false;
          }
        }
      });
    }
  },
};
</script>
<style scoped>
.result_detail_category_part {
  display: inline;

  font-size: 13px;
}
.result_detail_author {
  display: inline;

  font-size: 13px;
  color: royalblue;
}
.result_detail_page_container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.result_detail_title_area {
  width: 85vw;
  padding: 0px 20px 20px;
}
.result_detail_article_area {
  width: 50vw;
  border-width: 1px;
  border-color: grey;
  /* border-style: solid; */
  border-radius: 10px;
  margin-top: 20px;
  padding: 0px 20px;
  /* background-image: linear-gradient(to right bottom, #abb7b7 ,#dadfe1); */
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1),
    -2px -2px 20px rgba(255, 255, 255, 0.5);
}
.result_detail_side_area {
  width: 30vw;
  padding: 0px 20px 20px;
  margin-top: 20px;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1),
    -2px -2px 20px rgba(255, 255, 255, 0.5);
}
.result_detail_side_container {
  width: 100%;
}
.result_detail_title {
  font-weight: bold;
  font-size: 40px;
  margin-top: -5px;
  margin-bottom: -5px;
  color: black;
}
</style>

