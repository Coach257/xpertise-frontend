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
      <div class="result_detail_main_area">
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
      </div>
    </div>
  </div>
</template>
<script>
import { SearchDriver } from "@elastic/search-ui";
import SearchResults from "../components/search/SearchResults";
import CommentSection from "../components/comment/CommentSection";
import RelatedPaperChart from "../components/common/RelatedPaperChart.vue";
import PaperCitation from "../components/common/PaperCitation.vue";
import ReferenceChart from "../components/common/ReferenceChart.vue";
const testurl = "https://go-service-296709.df.r.appspot.com/api/v1/portal/recommend/create"
const columnUrl = "https://go-service-296709.df.r.appspot.com/api/v1/portal/column/searchcol"
const addUrl = "https://go-service-296709.df.r.appspot.com/api/v1/portal/column/add_to_column"
const addColumnUrl = "https://go-service-296709.df.r.appspot.com/api/v1/portal/column/create_column"
import {
  mainpaperconfig,
  mainauthorconfig,
  cspaperconfig,
  csauthorconfig,
  csaffiliationconfig,
} from "../searchConfig";
import axios from "axios";
import RecommendSection from "../components/recommendation/RecommendSection";
var driver = null;

export default {
  name: "DetailPreview",
  props: ['paper_type','docid'],
  components: {
    CommentSection,
    RecommendSection,
    SearchResults,
    RelatedPaperChart,
    PaperCitation,
    ReferenceChart,
  },
  mounted() {
    this.init_data();
    this.init_driver();
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
        citation_by_year:{},
      },
      recommendForm: {
        username: "IAmParasite",
        author_id: "1",
        reason: "这是一首简单的小情歌~",
      },
      columnForm: {
        name: "",
      },
      docid: "",
      type: "",
      option: "",
      related_papers: [],
      referencedata: [],
      columnList: [],
      searchState: {},
      driverlink: "", // 控制es结果赋值
      referenceloaded: false, // 控制引用图谱显示
      articleloaded: false, // 控制整个页面显示
      relatedloaded: false, // 控制相关文章显示
      documentcopyvisible: false,
      recommendVisible: false,
      columnsVisible: false,
      formLabelWidth: '120px',
      documentcopylist: [],
    };
  },
  watch: {
    searchState(newsearchState) {
      console.log(newsearchState);
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
    },
  },
  methods: {
    // 初始化全局数据
    init_data() {
      this.type = this.$props.paper_type;
      this.option = "paper";
      this.docid = this.$props.docid;
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
   
    // 搜索引擎是否返回结果
    thereAreResults() {
      return this.searchState.totalResults && this.searchState.totalResults > 0;
    },
    // 赋值article
    getthispaper() {
      var results = this.searchState.results[0];
      var raw;
      this.article.paper_id = results.id.raw;
      if (results.title && results.title.raw)
        this.article.title = results.title.raw;
      if (this.type == "cs") {
        this.article.citation_by_year = JSON.parse(results.citation_by_year.raw);
        this.loadreference();
      }
      if (results.authors && results.authors.raw) {
        raw = results.authors.raw;
        for (var i = 0; i < raw.length; i++) {
          this.article.authors.push(JSON.parse(raw[i]));
        }
      }
      if (results.abstract && results.abstract.raw)
        this.article.abstract = results.abstract.raw;
      if (results.year && results.year.raw)
        this.article.year = results.year.raw;
      if (results.keywords && results.keywords.raw) {
        raw = results.keywords.raw;
        for (var i = 0; i < raw.length; i++) {
          this.article.keywords.push(raw[i]);
        }
      }
      if (results.n_citation && results.n_citation.raw)
        this.article.n_citation = results.n_citation.raw;
      if (results.page_start && results.page_start.raw)
        this.article.page_start = results.page_start.raw;
      if (results.page_end && results.page_end.raw)
        this.article.page_end = results.page_end.raw;
      if (results.lang && results.lang.raw)
        this.article.lang = results.lang.raw;
      if (results.issue && results.issue.raw)
        this.article.issue = results.issue.raw;
      if (results.venue && results.venue.raw)
        this.article.venue = JSON.parse(results.venue.raw).raw;
      if (results.volume && results.volume.raw)
        this.article.volume = results.volume.raw;
      if (results.issn && results.issn.raw)
        this.article.issn = results.issn.raw;
      if (results.doi && results.doi.raw) this.article.doi = results.doi.raw;
      if (results.url && results.url.raw) this.article.url = results.url.raw;
      this.articleloaded = true;
      this.loadrelatedpapers();
      this.loaddocumentcopyinfo();
    },  // 加载引用关系图数据
    // 判断该文章是否被收藏
    loadcomment() {},
    // 加载推荐
    loadrecommend() {},
    // 复制引用信息
    loaddocumentcopyinfo() {
      var info = "";
      for (let i = 0; i < this.article.authors.length; i++) {
        info += this.article.authors[i].name + ".,";
      }
      info +=
        this.article.title +
        "," +
        this.article.venue +
        "," +
        this.article.year +
        "," +
        this.article.volume +
        ".";
      this.documentcopylist.push({
        name: "GB/T 7714",
        info: info,
      });
      info = "";
      for (let i = 0; i < this.article.authors.length; i++) {
        info += this.article.authors[i].name + ",";
      }
      info +=
        '"' +
        this.article.title +
        '"' +
        this.article.venue +
        ".,vol." +
        this.article.volume +
        "," +
        this.article.year +
        ".";
      this.documentcopylist.push({
        name: "MLA",
        info: info,
      });
      info = "";
      for (let i = 0; i < this.article.authors.length; i++) {
        info += this.article.authors[i].name + ".,";
      }
      info +=
        "(" +
        this.article.year +
        ")." +
        this.article.title +
        "." +
        this.article.venue +
        "," +
        this.article.volume +
        ".";
      this.documentcopylist.push({
        name: "APA",
        info: info,
      });
      info = "@inproceedings{Xpertise" + this.article.paper_id + ",\r";
      info += 'title="' + this.article.title + '",\nauthor="';
      for (let i = 0; i < this.article.authors.length; i++) {
        info += this.article.authors[i].name + ",";
      }
      info += '",\njournal="';
      info += this.article.venue + '",\nvolume="';
      info += this.article.year + '",';
      this.documentcopylist.push({
        name: "BibTeX",
        info: info,
      });
    },
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

.result_detail_main_area {
  width: 50vw;
}
.result_detail_comment_area {
  /* width: 100%; */
  margin-block-start: 30px;
}
.tabs_area {
  border-width: 1px;
  /* border-color: grey; */
  /* border-style: solid; */
  border-radius: 20px;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1),
    -2px -2px 20px rgba(255, 255, 255, 0.5);
}

.result_detail_article_area {
  /* width: 100%; */
  border-width: 1px;
  border-color: grey;
  /* border-style: solid; */
  border-radius: 10px;
  margin-top: 20px;
  padding: 15px 20px;
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
.bottom_area {
  padding: 0vw 10vw 10vw 10vw;
  width: 80vw;
  /* display: flex; */
  position: relative;
  /* flex-direction: row; */
  /* align-items: flex-start; */
  /* flex-wrap: nowrap; */
  justify-content: space-evenly;
}
</style>
