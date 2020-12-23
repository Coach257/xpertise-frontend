<template>
  <div id="result_detail_page" v-if="showarticle">
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
          <div
            v-if="this.article.abstract != null && this.article.abstract != ''"
            class="detail_abstract"
          >
            <h3>摘要</h3>
            <p>{{ this.article.abstract }}</p>
          </div>
          <div v-if="this.article.year != null" class="detail_year">
            <h3>年份</h3>
            <p>{{ this.article.year }}</p>
          </div>
          <div v-if="this.article.n_citation != null" class="detail_n_citation">
            <h3>引用次数</h3>
            <p>{{ this.article.n_citation }}</p>
          </div>
          <div
            v-if="
              this.article.keywords != null && this.article.keywords.length > 0
            "
            class="detail_keywords"
          >
            <h3>关键字</h3>
            <span v-for="(keyword, index) in this.article.keywords" :key="index">
             {{ keyword }},
            </span>
          </div>
          <div
            v-if="
              this.article.page_start != null && this.article.page_start != ''
            "
            class="detail_page_start"
          >
            <h3>页面起止</h3>
            <p>{{ this.article.page_start }}-{{ this.article.page_end }}</p>
          </div>
          <div
            v-if="this.article.lang != null && this.article.lang != ''"
            class="detail_abstract"
          >
            <h3>语言</h3>
            <p v-if="this.article.lang === 'en'">英文</p>
            <p v-else-if="this.article.lang === 'zh'">中文</p>
            <p v-else>其他</p>
          </div>
          <div
            v-if="this.article.issue != null && this.article.issue != ''"
            class="detail_abstract"
          >
            <h3>刊号</h3>
            <p>{{ this.article.issue }}</p>
          </div>
          <div
            v-if="this.article.venue != null && this.article.venue != ''"
            class="detail_abstract"
          >
            <h3>期刊/会议</h3>
            <p>{{ this.article.venue }}</p>
          </div>
          <div
            v-if="this.article.issn != null && this.article.issn != ''"
            class="detail_abstract"
          >
            <h3>ISSN</h3>
            <p>{{ this.article.issn }}</p>
          </div>
          <div
            v-if="this.article.doi != null && this.article.doi != ''"
            class="detail_abstract"
          >
            <h3>DOI</h3>
            <p>{{ this.article.doi }}</p>
          </div>
        </div>
        <div class="result_detail_statistics_area" v-if="this.type === 'cs'">
          <div class="citation_stat" v-if="showyearcitation">
            <h3>引用信息统计</h3>
            <paper-citation
              :year_citation="this.article.citation_by_year"
            ></paper-citation>
          </div>
          <div v-if="showreference">
            <h3>引用关系图谱</h3>
            <reference-chart :data="this.referencedata"></reference-chart>
          </div>
        </div>
        <div class="result_detail_comment_area">
          <el-tabs class="tabs_area" type="border-card">
            <el-tab-pane label="评论">
              <CommentSection :id="this.$route.params.docid" />
            </el-tab-pane>
            <el-tab-pane label="专家推荐"
              ><RecommendSection :recommends="this.$data.recommends"
            /></el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="result_detail_side_area">
        <div class="result_detail_side_container">
          <h3>引用</h3>
          <el-button
            icon="el-icon-document-copy"
            plain
            @click="documentcopyvisible = true"
            >复制引用信息</el-button
          >
          <h3>操作</h3>
          <el-button-group>
            <el-button
              type="primary"
              icon="el-icon-document"
              plain
              @click="seeOriginal"
              >查看原文</el-button
            >
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
            <el-button
              type="success"
              icon="el-icon-document-add"
              v-if="article.listed === false"
              @click="addToWishlist"
              plain
              >加入清单</el-button
            >
            <el-button
              type="success"
              icon="el-icon-document-delete"
              v-else
              @click="removeFromWishlist"
              >移出清单</el-button
            >
          </el-button-group>
          <br/>
          <el-button-group style="padding-top:10px">
          <el-button
            type="primary"
            icon="el-icon-share"
            v-if="isExpert"
            @click="recommendVisible = true"
          >
            推荐
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-share"
            v-if="isExpert"
            @click="openColumnList"
          >
            放入专栏
          </el-button>
        </el-button-group>
          <div class="statistics_citation">
            <h3>相关文章</h3>
            <related-paper-chart
              :data="this.related_papers.slice(1)"
              :type="this.type"
              v-if="showrelated"
            ></related-paper-chart>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="复制引用信息"
      :visible.sync="documentcopyvisible"
      width="60%"
    >
      <li
        v-for="(documentcopyinfo, index) in this.documentcopylist"
        :key="index"
        style="display: flex; align-items: center; margin: 5px"
      >
        <div style="width: 10%">
          {{ documentcopyinfo.name }}
        </div>
        <div style="margin: 50px; width: 70%">
          {{ documentcopyinfo.info }}
        </div>
        <el-button
          v-clipboard:copy="documentcopyinfo.info"
          style="
            height: 10px;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
          "
          >复制</el-button
        >
      </li>
    </el-dialog>

    <el-dialog title="推荐表单" :visible.sync="recommendVisible">
      <el-form :model="recommendForm">
        <el-form-item label="推荐人ID" :label-width="formLabelWidth">
          <el-input
            v-model="recommendForm.author_id"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="推荐人用户名" :label-width="formLabelWidth">
          <el-input
            v-model="recommendForm.username"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="推荐理由" :label-width="formLabelWidth">
          <el-input v-model="recommendForm.reason" :disabled="false"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="recommendVisible = false"> 取 消</el-button>
        <el-button type="primary" @click="recommendPaper"> 确 定 </el-button>
      </div>
    </el-dialog>

    <el-dialog title="放入专栏" :visible.sync="columnsVisible" >
      <el-table :data="columnList" style="width: 120%;align:center" >
        <!-- <el-table-column label="ID" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.column_id }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="专栏名" width="350" align='center'>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>专栏ID: {{ scope.row.column_id }}</p>
              <p>专栏名称: {{ scope.row.column_name }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.column_name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="450" align='center'>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleDelete(scope.row.column_id)"
              >加入专栏</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-input
          v-model="columnForm.name"
          :disabled="false"
          style="width: 200px; margin-left: 80px; margin-right:200px;margin-top:15px"
        ></el-input>
        <el-button type="success" @click="addNewColumn"
          >创建新的专栏并加入专栏中</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { SearchDriver } from "@elastic/search-ui";
import SearchResults from "../components/search/SearchResults";
import CommentSection from "../components/comment/CommentSection";
import RelatedPaperChart from "../components/common/RelatedPaperChart.vue";
import PaperCitation from "../components/common/PaperCitation.vue";
import ReferenceChart from "../components/common/ReferenceChart.vue";
const testurl =
  "https://go-service-296709.df.r.appspot.com/api/v1/portal/recommend/create";
const columnUrl =
  "https://go-service-296709.df.r.appspot.com/api/v1/portal/column/searchcol";
const addUrl =
  "https://go-service-296709.df.r.appspot.com/api/v1/portal/column/add_to_column";
const addColumnUrl =
  "https://go-service-296709.df.r.appspot.com/api/v1/portal/column/create_column";
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
  name: "Detail",
  props: [],
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
        citation_by_year: {},
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
      yearcitationloaded: false,
      documentcopyvisible: false,
      recommendVisible: false,
      columnsVisible: false,
      formLabelWidth: "120px",
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
    showreference() {
      return this.referenceloaded;
    },
    showarticle() {
      return this.articleloaded;
    },
    showrelated() {
      return this.relatedloaded;
    },
    showyearcitation() {
      return this.yearcitationloaded;
    },
    isExpert() {
      if (localStorage.getItem("user_type") == 2) return true;
      else return false;
    },
  },
  methods: {
    seeOriginal() {
      window.open(this.article.url);
    },
    // 初始化全局数据
    init_data() {
      this.type = this.$route.params.type;
      this.option = "paper";
      this.docid = this.$route.params.docid;
      this.recommendForm.username = localStorage.getItem("username");
      this.recommendForm.author_id = localStorage.getItem("authorId");
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
    addToWishlist() {
      let that = this;
      let formData = new FormData();
      formData.append("user_id", localStorage.getItem("userid"));
      formData.append("paper_id", this.article.paper_id);
      formData.append("title", this.article.title);
      formData.append("type", this.type);
      formData.append("n_citation", this.article.n_citation);
      formData.append("year", this.article.year);
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      axios
        .post(
          "https://go-service-296709.df.r.appspot.com/api/v1/user/wish/add",
          formData,
          config
        )
        .then((response) => {
          if (response) {
            if (response.data.success === true) {
              that.$data.article.listed = true;
            } else {
              console.log("添加失败" + response.data);
              alert("添加失败，请检查网络");
            }
          } else {
            console.log("添加失败" + response.data);
            alert("添加失败，请检查网络");
          }
        })
        .catch(function (e) {
          console.log(e);
        });
    },
    // 移出清单
    removeFromWishlist() {
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
          "https://go-service-296709.df.r.appspot.com/api/v1/user/wish/list",
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
                  formData.append("wish_id", favorArray[i].wish_id);
                  axios
                    .post(
                      "https://go-service-296709.df.r.appspot.com/api/v1/user/wish/remove",
                      formData,
                      config
                    )
                    .then((response) => {
                      if (response) {
                        if (response.data.success) {
                          console.log("删除成功", response.data);
                          that.$data.article.listed = false;
                        } else {
                          console.log("删除失败", response.data);
                          alert("删除失败，请检查网络");
                        }
                      } else {
                        console.log("收藏失败", response.data);
                        alert("删除失败，请检查网络");
                      }
                    })
                    .catch(function (e) {
                      console.log(e);
                    });
                }
              }
            } else {
              console.log("获取失败 " + response.data);
              alert("列表获取失败，请检查网络");
            }
          } else {
            console.log("获取失败 " + response.data);
            alert("列表获取失败，请检查网络");
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
    getthispaper() {
      var results = this.searchState.results[0];
      var raw;
      this.article.paper_id = results.id.raw;
      if (results.title && results.title.raw)
        this.article.title = results.title.raw;
      if (this.type == "cs") {
        this.article.citation_by_year = JSON.parse(
          results.citation_by_year.raw
        );
        this.yearcitationloaded = true;
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
        console.log("keywords");
        console.log(this.article.keywords);
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
      if (results.url && results.url.raw) this.article.url = results.url.raw[0];
      console.log(this.article.url);
      this.articleloaded = true;
      this.loadrelatedpapers();
      this.loaddocumentcopyinfo();
    },
    // 获取相关文章
    loadrelatedpapers() {
      this.driverlink = "related";
      driver.reset();
      driver.setResultsPerPage(6);
      driver.getActions().setSearchTerm(this.article.title);
    },
    // 赋值相关文章
    getrelatedpaper() {
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
          "https://go-service-296709.df.r.appspot.com/api/v1/branch/reference_connection_graph",
          formData,
          config
        )
        .then((response) => {
          if (response) {
            if (response.data.success) {
              this.referencedata = response.data.data;
              this.referenceloaded = true;
            } else {
              console.log(response);
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
          "https://go-service-296709.df.r.appspot.com/api/v1/user/wish/paper_in_wish",
          formData,
          config
        )
        .then((response) => {
          if (response) {
            console.log(response.data);
            if (response.data.message == "已在用户的心愿清单中") {
              that.article.listed = true;
            } else {
              that.article.listed = false;
            }
          }
        });
      return;
    },
    // 加载评论
    loadcomment() {},
    // 加载推荐
    loadrecommand() {},
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
    recommendPaper() {
      this.recommendVisible = false;
      let that = this;
      let formData = new FormData();
      formData.append("author_id", this.recommendForm.author_id);
      formData.append("author_name", this.recommendForm.username);
      formData.append("paper_id", this.article.paper_id);
      formData.append("paper_title", this.article.title);
      formData.append("n_citation", this.article.n_citation);
      formData.append("hindex", localStorage.getItem("h_index"));
      formData.append("reason", this.recommendForm.reason);
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      axios.post(testurl, formData, config).then((response) => {
        if (response) {
          console.log(response);
          if (response.data.success) {
            console.log("推荐成功");
          } else {
            console.log(response);
          }
        }
      });
    },
    openColumnList() {
      this.columnsVisible = true;
      let that = this;
      let formData = new FormData();
      formData.append("author_id", this.recommendForm.author_id);
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      axios.post(columnUrl, formData, config).then((response) => {
        if (response) {
          console.log(response);
          if (response.data.success) {
            this.columnList = [];
            console.log("查找专栏成功");
            let list = response.data.data;
            for (let i = 0; i < list.length; i++) {
              this.columnList.push({
                column_id: list[i].column_id,
                column_name: list[i].column_name,
              });
            }
          } else {
            console.log(response);
          }
        }
      });
    },
    handleDelete(id) {
      console.log("删除");
      let that = this;
      let formData = new FormData();
      formData.append("column_id", id);
      formData.append("paper_id", this.article.paper_id);
      formData.append("paper_title", this.article.title);
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      axios.post(addUrl, formData, config).then((response) => {
        if (response) {
          console.log(response);
          if (response.data.success) {
            console.log("放入专栏成功");
          } else {
            console.log(response);
          }
        }
      });
    },
    addNewColumn() {
      let that = this;
      let formData = new FormData();
      formData.append("author_id", localStorage.getItem("authorId"));
      formData.append("column_name", this.columnForm.name);
      if(this.columnForm.name==""){this.$notify({
          title: "提示",
          message: ("div", {class: 'el-icon-close', style: 'color: red'}, " 专栏名不能为空！"),
        });return;}
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      axios.post(addColumnUrl, formData, config).then((response) => {
        if (response) {
          if (response.data.success) {
            console.log("创建专栏成功");
            this.handleDelete(response.data.column_id);

            this.$notify({
          title: "提示",
          message: ("div", {class: 'el-icon-check', style: 'color: green'}, " 创建并添加到专栏成功！"),
        });
        setTimeout(() => {
        //代码
        this.$router.go(0);
     }, 500);

          } else {
            console.log("创建失败");
          }
        } else {
          console.log("创建失败");
        }
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
.result_detail_statistics_area {
  margin-block-start: 30px;
  border-width: 1px;
  padding: 20px;
  /* border-color: grey; */
  /* border-style: solid; */
  border-radius: 20px;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1),
    -2px -2px 20px rgba(255, 255, 255, 0.5);
}
.citation_stat {
  margin: auto;
  vertical-align: middle;
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
