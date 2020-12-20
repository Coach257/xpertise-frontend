<template>
  <div id="result_detail_page" v-if="articleloadfinish">
    <div class="result_detail_page_container">
      <div class="result_detail_title_area">
        <div class="result_detail_title">
          {{ this.article.title }}
        </div>
        <div class="result_detail_author_container">
          <router-link
            tag="a"
            target="_blank"
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
          <el-button icon="el-icon-document-copy" plain @click="documentcopyvisible = true">复制引用信息</el-button>
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
          <el-button @click="debug">Debug</el-button>
          <h3>相关文章</h3>
          <li v-for="result in this.related_papers.slice(1)" :key="result.id.raw">
            <!-- <SearchResult :type="this.type" :option="this.option" :result="result" /> -->
            {{result.title.raw}}
          </li>
          <div v-if="referenceloadfinish">
            <h3>引用关系图谱</h3>
            <RelationMap :data="this.referencedata" :type="'reference'"/>
          </div>
        </div>
      </div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="评论">评论</el-tab-pane>
      <el-tab-pane label="专家推荐">专家推荐</el-tab-pane>
    </el-tabs>
    <el-dialog title="复制引用信息" :visible.sync="documentcopyvisible" width="60%">
      <li v-for="(documentcopyinfo,index) in this.documentcopylist" :key="index">
        {{documentcopyinfo.name}}     {{documentcopyinfo.info}}
        <el-button v-clipboard:copy="documentcopyinfo.info">copy</el-button>
      </li>
    </el-dialog>
  </div>
</template>
<script>
import { SearchDriver } from "@elastic/search-ui";
import SearchResults from "../components/search/SearchResults";
import RelationMap from '../components/common/RelationMap.vue'
import {
  mainpaperconfig,
  mainauthorconfig,
  cspaperconfig,
  csauthorconfig,
  csaffiliationconfig,
} from "../searchConfig";
import axios from "axios";
var driver = null;

export default {
  name: "Detail",
  props: [],
  components: {
    SearchResults,
    RelationMap
  },
  mounted() {
    this.init_data();
    this.init_driver();
    this.isFav();
    this.loadcomment();
    this.loadrecommand();
  },
  data() {
    return {
      article: {
        paper_id: "",
        title: "",
        authors: [],
        abstract: "",
        year: "",
        keywords: [],
        n_citation: "",
        page_start: "",
        page_end: "",
        lang: "",
        issue: "",
        venue: "",
        volume: "",
        issn: "",
        doi: "",
        url: "",
        listed: false,
        starred: false,
      },
      docid: "",
      type: "",
      option: "",
      related_papers: [],
      referencedata: [],
      searchState: {},
      driverlink: "", // 控制es结果赋值
      referenceloaded: false, // 控制引用图谱显示
      articleloaded: false, // 控制整个页面显示
      relatedloaded: false, // 控制相关文章显示
      documentcopyvisible: false,
      documentcopylist:[],
    };
  },
  watch: {
    searchState(newsearchState) {
      if (this.thereAreResults()) {
        if (this.driverlink == "thispaper") {
          this.getthispaper();
        } else {
          this.getrelatedpaper();
        }
      }
    },
  },
  computed: {
    //computed最高优先级，只有当loadfinish为true时,才开始页面加载
    articleloadfinish() {
      return this.articleloaded;
    },
    referenceloadfinish() {
      return this.referenceloaded;
    },
    relatedpaperloadfinish() {
      return this.relatedloaded;
    }
  },
  methods: {
    // 初始化全局数据
    init_data() {
      this.type = this.$route.params.type;
      this.option = "paper";
      this.docid = this.$route.params.docid;
    },
    // 配置es连接器
    init_driver() {
      this.driverlink = "thispaper";
      if (this.type == "cs") {
        driver = new SearchDriver(cspaperconfig);
      } else {
        driver = new SearchDriver(mainpaperconfig);
      }
      driver.reset();
      driver.setResultsPerPage(1);
      driver.addFilter("id", this.docid, "any");
      driver.subscribeToStateChanges((state) => {
        this.searchState = state;
      });
    },
    // 添加收藏
    addToFav() {
      let that = this;
      let formData = new FormData();
      formData.append("user_id", localStorage.getItem("userid"));
      formData.append("paper_id", this.article.paper_id);
      let paperInfo = {
        paper_id: this.article.paper_id,
        title: this.article.title,
        authors: JSON.parse(JSON.stringify(this.article.authors)),
      };
      formData.append("paper_info", JSON.stringify(paperInfo));
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      axios
        .post(
          "https://go-service-296709.df.r.appspot.com/api/v1/user/favorite/add",
          formData,
          config
        )
        .then((response) => {
          if (response) {
            if (response.data.success) {
              that.$data.article.starred = true;
            } else {
              console.log("收藏失败" + response.data);
              alert("收藏文献失败，请检查网络");
            }
          } else {
            console.log("收藏失败" + response.data);
            alert("收藏文献失败，请检查网络");
          }
        });
    },
    // 取消收藏
    removeFromFav() {
      let that = this;
      let formData = new FormData();
      formData.append("user_id", localStorage.getItem("userid"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(
          "https://go-service-296709.df.r.appspot.com/api/v1/user/favorite/list",
          formData,
          config
        )
        .then((response) => {
          if (response) {
            if (response.data.success) {
              let favorArray = response.data.data;
              console.log(favorArray);
              for (let i = 0, len = favorArray.length; i < len; i++) {
                if (favorArray[i].paper_id == this.article.paper_id) {
                  formData = new FormData();
                  formData.append("favor_id", favorArray[i].favor_id);
                  axios
                    .post(
                      "https://go-service-296709.df.r.appspot.com/api/v1/user/favorite/remove",
                      formData,
                      config
                    )
                    .then((response) => {
                      if (response) {
                        if (response.data.success) {
                          console.log("删除成功", response.data);
                          that.$data.article.starred = false;
                        } else {
                          console.log("删除失败", response.data);
                          alert("取消收藏失败，请检查网络");
                        }
                      } else {
                        console.log("收藏失败", response.data);
                        alert("取消收藏失败，请检查网络");
                      }
                    });
                }
              }
            } else {
              console.log("获取失败 " + response.data);
              alert("收藏列表获取失败，请检查网络");
            }
          } else {
            console.log("获取失败 " + response.data);
            alert("收藏列表获取失败，请检查网络");
          }
        });
    },
    // 搜索引擎是否返回结果
    thereAreResults() {
      return this.searchState.totalResults && this.searchState.totalResults > 0;
    },
    // 赋值article
    getthispaper(){
      var results = this.searchState.results[0];
      var raw;
      this.article.paper_id = results.id.raw;
      if (results.title && results.title.raw) this.article.title = results.title.raw;
      if(this.type=="cs") this.loadreference();
      if (results.authors && results.authors.raw) {
        raw = results.authors.raw;
        for (var i = 0; i < raw.length; i++) {
          this.article.authors.push(JSON.parse(raw[i]));
        }
      }
      if (results.abstract && results.abstract.raw) this.article.abstract = results.abstract.raw;
      if (results.year && results.year.raw) this.article.year = results.year.raw;
      if (results.keywords && results.keywords.raw) {
        raw = results.keywords.raw;
        for (var i = 0; i < raw.length; i++) {
          this.article.keywords.push(raw[i]);
        }
      }
      if (results.n_citation && results.n_citation.raw) this.article.n_citation = results.n_citation.raw;
      if (results.page_start && results.page_start.raw) this.article.page_start = results.page_start.raw;
      if (results.page_end && results.page_end.raw) this.article.page_end = results.page_end.raw;
      if (results.lang && results.lang.raw) this.article.lang = results.lang.raw;
      if (results.issue && results.issue.raw) this.article.issue = results.issue.raw;
      if (results.venue && results.venue.raw) this.article.venue = JSON.parse(results.venue.raw).raw;
      if (results.volume && results.volume.raw) this.article.volume = results.volume.raw;
      if (results.issn && results.issn.raw) this.article.issn = results.issn.raw;
      if (results.doi && results.doi.raw) this.article.doi = results.doi.raw;
      if (results.url && results.url.raw) this.article.url = results.url.raw;
      this.articleloaded = true;
      this.loadrelatedpapers();
      this.loaddocumentcopyinfo();
    },
    // 获取相关文章
    loadrelatedpapers(){
      this.driverlink = "related"
      driver.reset();
      driver.setResultsPerPage(6);
      driver.getActions().setSearchTerm(this.article.title);
    },
    // 赋值相关文章
    getrelatedpaper(){
      this.related_papers = this.searchState.results;
      this.relatedloaded = true;
    },
    // 加载引用关系图数据
    loadreference() {
      let that = this;
      let formData = new FormData();
      formData.append("paper_id", this.docid);
      formData.append("paper_title", this.article.title);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(
          "https://go-service-296709.df.r.appspot.com/api/v1/branch/graph/reference",
          formData,
          config
        )
        .then((response) => {
          if (response) {
            if (response.data.success) {
              this.referencedata = response.data.data;
              this.referenceloaded = true;
            } else {
              console.log(response)
            }
          }
        });
    },
    // 判断该文章是否被收藏
    isFav() {
      let that = this;
      let formData = new FormData();
      formData.append("user_id", localStorage.getItem("userid"));
      formData.append("paper_id", this.docid);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(
          "https://go-service-296709.df.r.appspot.com/api/v1/user/favorite/isfav",
          formData,
          config
        )
        .then((response) => {
          if (response) {
            console.log(response.data);
            if (response.data.message == "true") {
              that.article.starred = true;
            } else {
              that.article.starred = false;
            }
          }
        });
      return;
    },
    // 加载评论
    loadcomment() {},
    // 加载推荐
    loadrecommand() {},
    debug(){
      console.log(this.referenceloaded);
    },
    loaddocumentcopyinfo(){
      var info="";
      for(let i=0;i<this.article.authors.length;i++){
        info += this.article.authors[i].name+".,";
      }
      info+=this.article.title+","+this.article.venue+","+this.article.year+","+this.article.volume+"."
      this.documentcopylist.push({
        "name":"GB/T 7714",
        "info":info
      })
      info = "";
      for(let i=0;i<this.article.authors.length;i++){
        info += this.article.authors[i].name+",";
      }
      info+="\""+this.article.title+"\""+this.article.venue+".,vol."+this.article.volume+","+this.article.year+"."
      this.documentcopylist.push({
        "name":"MLA",
        "info":info
      })
      info = "";
      for(let i=0;i<this.article.authors.length;i++){
        info += this.article.authors[i].name+".,";
      }
      info+="("+this.article.year+")."+this.article.title+"."+this.article.venue+","+this.article.volume+"."
      this.documentcopylist.push({
        "name":"APA",
        "info":info
      })
      info = "@inproceedings{Xpertise"+this.article.paper_id+",\r";
      info +="title=\""+this.article.title+"\",\nauthor=\"";
      for(let i=0;i<this.article.authors.length;i++){
        info += this.article.authors[i].name+",";
      }
      info+="\",\njournal=\"";
      info+=this.article.venue+"\",\nvolume=\""
      info+=this.article.year+"\","
      this.documentcopylist.push({
        "name":"BibTeX",
        "info":info
      })
      
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

