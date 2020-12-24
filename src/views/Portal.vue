<template>
  <div>
    <el-container>
      <el-main>
        <div>
          <el-row :gutter="10">
            <el-col :span="3" :offset="7"
              ><div class="grid-content">
                <el-avatar :size="100" :src="circleUrl"></el-avatar></div
            ></el-col>
            <el-col :span="6"
              ><div class="name">
                {{ this.authorname }}
              </div></el-col
            >
          </el-row>

          <el-row :gutter="24">
            <el-col :span="20" :offset="7">
              <div class="info">
                <el-table
                  :data="tableDatainfo"
                  style="width: 100%"
                  background-color="#26beb8"
                >
                  <el-table-column prop="info" align="center" label="信息">
                  </el-table-column>
                </el-table>
              </div>
              <div>
                <author-year-paper-chart
                  class="chart"
                  v-if="loadfinish"
                  :year_citation="this.author.year_citation"
                  :year_pubs="this.author.year_pubs"
                ></author-year-paper-chart>
              </div>
            </el-col>

            <!-- <el-col :span="3"><div class="grid-content ">
         <el-link href="https://element.eleme.io" type="primary" icon="el-icon-tickets" target="_blank">添加文章</el-link>
      </div></el-col> -->
          </el-row>
          <el-row :gutter="5">
            <el-col :span="20" :offset="2"><h1></h1></el-col>
          </el-row>

          <center>
          <div id="charts">
            <div class="datatitle" style="width: 1250px">
              <h2>数据统计</h2>
              <svg
                class="icon"
                width="27px"
                height="27px"
                style="right: 10px"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1024.25175 0l-209.92 23.04L883.45175 92.16 655.61175 370.688 419.06775 152.064c-15.872-14.848-40.96-14.848-57.344-0.512L14.07575 465.408C-3.33225 481.28-4.86825 508.416 11.00375 525.824c8.192 9.216 19.968 13.824 31.744 13.824 10.24 0 20.48-3.584 28.672-10.752l318.464-287.744 241.152 222.72c8.704 8.192 20.48 11.776 31.744 11.264 11.776-1.024 22.528-6.656 30.208-15.36l250.88-306.688 57.344 57.344L1024.25175 0z m0 0M133.37175 1024H30.97175c-16.896 0-30.72-13.824-30.72-30.72v-348.16c0-16.896 13.824-30.72 30.72-30.72h102.4c16.896 0 30.72 13.824 30.72 30.72v348.16c0 16.896-13.824 30.72-30.72 30.72z"
                  fill="#666666"
                />
                <path
                  d="M420.09175 1024H317.69175c-16.896 0-30.72-13.824-30.72-30.72V440.32c0-16.896 13.824-30.72 30.72-30.72h102.4c16.896 0 30.72 13.824 30.72 30.72v552.96c0 16.896-13.824 30.72-30.72 30.72zM706.81175 1024h-102.4c-16.896 0-30.72-13.824-30.72-30.72v-399.36c0-16.896 13.824-30.72 30.72-30.72h102.4c16.896 0 30.72 13.824 30.72 30.72v399.36c0 16.896-13.824 30.72-30.72 30.72zM993.53175 1024h-102.4c-16.896 0-30.72-13.824-30.72-30.72V337.92c0-16.896 13.824-30.72 30.72-30.72h102.4c16.896 0 30.72 13.824 30.72 30.72v655.36c0 16.896-13.824 30.72-30.72 30.72z"
                  fill="#666666"
                />
              </svg>
            </div>
            <el-divider></el-divider>

            <author-compare-chart
              class="chart"
              :h_index="this.author.h_index"
              :n_pubs="this.author.n_pubs"
              :n_citation="this.author.n_citation"
            ></author-compare-chart>
            <author-year-paper-chart
              class="chart"
              v-if="author_type"
              :year_citation="this.author.year_citation"
              :year_pubs="this.author.year_pubs"
            ></author-year-paper-chart>
            <author-relation-map
              class="chart"
              :data="this.mapdata"
              v-if="this.graphloaded && author_type"
            ></author-relation-map>
            <related-author-chart
              class="chart"
              :data="relateddata"
              :authorid="author.authorId"
              v-if="this.relatedloaded"
            ></related-author-chart>
          </div>
          </center>

          <el-row :gutter="10">
            <el-col :span="20" :offset="2">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="我的文献" name="first">
                  <el-row class="block-col-2">
                    <div id="affpapers" class="datawrapper">
                      <div class="datatitle">
                        <h2>文献列表</h2>
                        <svg
                          class="icon"
                          width="27px"
                          height="27px"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M734.634667 72.448C717.824 55.978667 685.226667 42.666667 661.674667 42.666667H204.8C162.389333 42.666667 128 79.189333 128 124.330667v775.338666C128 944.768 162.474667 981.333333 204.8 981.333333h614.4c42.410667 0 76.8-36.693333 76.8-81.578666V273.493333c0-23.68-13.781333-56.405333-30.378667-72.661333l-130.986666-128.426667zM341.333333 298.666667h341.333334a42.666667 42.666667 0 0 1 0 85.333333H341.333333a42.666667 42.666667 0 1 1 0-85.333333z m0 170.666666h170.666667a42.666667 42.666667 0 0 1 0 85.333334H341.333333a42.666667 42.666667 0 0 1 0-85.333334z"
                            fill="#666666"
                          />
                        </svg>
                      </div>

                      <el-divider></el-divider>

                      <div v-if="author_type">
                        <router-link
                          class="link"
                          v-for="(paper, index) in papers.slice(
                            (this.currentPage1 - 1) * this.eachPage,
                            this.currentPage1 * this.eachPage
                          )"
                          :key="index"
                          :to="'/detail/cs/' + paper.id"
                          tag="a"
                        >
                          <div id="paperindex">
                            {{ index + 1 + (currentPage1 - 1) * eachPage }}
                          </div>
                          <div style="width: 1100px">{{ paper.title }}</div>
                          <div class="citation">被引{{ paper.r }}次</div>
                        </router-link>
                      </div>

                      <div v-else>
                        <router-link
                          class="link"
                          v-for="(paper, index) in papers.slice(
                            (this.currentPage1 - 1) * this.eachPage,
                            this.currentPage1 * this.eachPage
                          )"
                          :key="index"
                          :to="'/detail/cs/' + paper.i"
                          tag="a"
                        >
                          <div id="paperindex">
                            {{ index + 1 + (currentPage1 - 1) * eachPage }}
                          </div>
                          <div style="width: 1100px">{{ paper.i }}</div>
                          <div class="citation">被引{{ paper.r }}次</div>
                        </router-link>
                      </div>

                      <center style="margin-top: 30px; margin-bottom: 30px">
                        <el-pagination
                          background
                          layout="prev, pager, next"
                          :total="total1"
                          :page-size="eachPage"
                          @current-change="handleCurrentChange1"
                        >
                        </el-pagination>
                      </center>
                    </div>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="我的合作伙伴" name="second">
                  <el-row class="block-col-2">
                    <div id="affpapers" class="datawrapper">
                      <div class="datatitle">
                        <h2>合作伙伴</h2>
                        <svg
                          class="icon"
                          width="27px"
                          height="27px"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M272.128 538.752l207.36 409.472H204.736c-31.488-1.152-57.728-12.224-78.72-33.28s-32.064-47.232-33.28-78.72v-185.472c1.152-31.488 12.224-57.728 33.28-78.72s47.232-32.064 78.72-33.28h67.392z m88.768-414.784c38.784-39.104 87.616-59.52 146.56-61.248 58.944 1.728 107.776 22.144 146.56 61.248 38.784 39.104 59.072 87.808 60.8 146.112-0.576 37.952-9.92 72.64-28.032 104.128s-43.456 56.576-76.096 75.264c-32.704 18.688-67.072 28.032-103.232 28.032-36.16 0-70.592-9.344-103.232-28.032-32.704-18.688-58.048-43.776-76.096-75.264-18.112-31.488-27.456-66.176-28.032-104.128 1.728-58.304 22.016-107.008 60.8-146.112z m241.984 532.928l-95.36 201.28-95.36-201.28 95.36-83.968 95.36 83.968z m286.976-84.928c21.568 20.992 34.112 47.232 37.632 78.72v185.472c-0.576 31.488-11.52 57.728-32.832 78.72-21.312 20.992-47.68 32.064-79.168 33.28H540.736l202.112-409.472h67.392c31.488 1.216 58.048 12.288 79.616 33.28z"
                            fill="#666666"
                          />
                        </svg>
                      </div>

                      <el-divider></el-divider>

                      <div>
                        <router-link
                          class="link"
                          v-for="(rela, index) in relateddata.slice(
                            (this.currentPage3 - 1) * this.eachPage,
                            this.currentPage3 * this.eachPage
                          )"
                          :key="index"
                          :to="'/author/cs/' + rela.author1_id"
                          tag="a"
                        >
                          <div id="paperindex">
                            {{ index + 1 + (currentPage3 - 1) * eachPage }}
                          </div>
                          <div style="width: 1100px">
                            {{
                              rela.author1_name == authorname
                                ? rela.author2_name
                                : rela.author1_name
                            }}
                          </div>
                          <div class="citation">
                            h_index:{{
                              rela.author1_name == authorname
                                ? rela.author2_h_index
                                : rela.author1_h_index
                            }}次
                          </div>
                        </router-link>
                      </div>

                      <center style="margin-top: 30px; margin-bottom: 30px">
                        <el-pagination
                          background
                          layout="prev, pager, next"
                          :total="total3"
                          :page-size="eachPage"
                          @current-change="handleCurrentChange3"
                        >
                        </el-pagination>
                      </center>
                    </div>
                  </el-row>
                </el-tab-pane>

                <el-tab-pane label="我的机构" name="third">
                  <el-row class="block-col-2">
                    <div id="affpapers" class="datawrapper">
                      <div class="datatitle">
                        <h2>机构</h2>
                        <svg
                          class="icon"
                          width="27px"
                          height="27px"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M272.128 538.752l207.36 409.472H204.736c-31.488-1.152-57.728-12.224-78.72-33.28s-32.064-47.232-33.28-78.72v-185.472c1.152-31.488 12.224-57.728 33.28-78.72s47.232-32.064 78.72-33.28h67.392z m88.768-414.784c38.784-39.104 87.616-59.52 146.56-61.248 58.944 1.728 107.776 22.144 146.56 61.248 38.784 39.104 59.072 87.808 60.8 146.112-0.576 37.952-9.92 72.64-28.032 104.128s-43.456 56.576-76.096 75.264c-32.704 18.688-67.072 28.032-103.232 28.032-36.16 0-70.592-9.344-103.232-28.032-32.704-18.688-58.048-43.776-76.096-75.264-18.112-31.488-27.456-66.176-28.032-104.128 1.728-58.304 22.016-107.008 60.8-146.112z m241.984 532.928l-95.36 201.28-95.36-201.28 95.36-83.968 95.36 83.968z m286.976-84.928c21.568 20.992 34.112 47.232 37.632 78.72v185.472c-0.576 31.488-11.52 57.728-32.832 78.72-21.312 20.992-47.68 32.064-79.168 33.28H540.736l202.112-409.472h67.392c31.488 1.216 58.048 12.288 79.616 33.28z"
                            fill="#666666"
                          />
                        </svg>
                      </div>

                      <el-divider></el-divider>

                      <div v-if="author_type">
                        <router-link
                          class="link"
                          v-for="(org, index) in orgs"
                          :key="index"
                          :to="'/affiliation/' + JSON.parse(org).id"
                          tag="a"
                        >
                          <div id="paperindex">{{ index + 1 }}</div>
                          <div style="width: 1100px">
                            {{ JSON.parse(org).name }}
                          </div>
                        </router-link>
                      </div>

                      <div v-else>
                        <router-link
                          class="link"
                          v-for="(org, index) in orgs2"
                          :key="index"
                          :to="'/affiliation/' + org.id"
                          tag="a"
                        >
                          <div id="paperindex">{{ index + 1 }}</div>
                          <div style="width: 1100px">
                            {{ org }}
                          </div>
                        </router-link>
                      </div>
                    </div>
                  </el-row>
                </el-tab-pane>

                <el-tab-pane label="我的专栏" name="forth">
                  <Column
                    :type="this.my"
                    :id="this.$route.params.authorId"
                  ></Column>
                  <!-- <el-row class="block-col-2">
            <li
            tag="div"
            class="result_detail_author"
            v-for="(author) in this.art.name"
            :key="author.id"
            @click = "routerPush"
          >
            {{author}}
           </li>

        </el-row> -->
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import Column from "./Column";
import { SearchDriver } from "@elastic/search-ui";
import {
  mainpaperconfig,
  mainauthorconfig,
  cspaperconfig,
  csauthorconfig,
  csaffiliationconfig,
} from "../searchConfig";
import AuthorRelationMap from "../components/common/AuthorRelationMap.vue";
import RelatedAuthorChart from "../components/common/RelatedAuthorChart.vue";
import AuthorCompareChart from "../components/common/AuthorCompareChart.vue";
import AuthorYearPaperChart from "../components/common/AuthorYearPaperChart.vue";

//const driver = new SearchDriver(csauthorconfig)
var driver = null;
export default {
  name: "Portal",
  props: ["type"],
  components: {
    Column,
    AuthorYearPaperChart,
    AuthorRelationMap,
    RelatedAuthorChart,
    AuthorCompareChart,
  },
  searchState: {},
  mounted() {
    this.checkau();
    this.getpapers();
    this.getrelatedauthor();
    this.loadauthormap();
    //this.searchcol()
    if(this.author_type) {
      this.orgs = JSON.parse(localStorage.getItem("organizations"));
    }
    else {
      let tmpt = localStorage.getItem("organizations").toString().substr(2).split(",");
      for(let i = 0; i < tmpt.length - 1; i++) {
        this.orgs2[i] = tmpt[i];
        this.orgs.push({id : i, name: tmpt[i]});
      }
    }

    this.author.authorId = localStorage.getItem("authorId");
    //  driver.subscribeToStateChanges(state => {
    //   this.searchState = state;
    //  });
    //  driver.clearFilters()

    //driver.getActions().setSearchTerm("")
    //console.log(this.searchState)
    //this.getInfo();
  },
  watch: {
    relateddata(newdata) {
      if (this.relateddata.length > 0) {
        this.relatedloaded = true;
      }
    },
  },
  data() {
    return {
      my: "portal",
      relateddata: [],
      relatedloaded: false,
      graphloaded: false,
      currentPage1: 1,
      currentPage3: 1,
      currentPage11: 1,
      currentPage22: 1,
      eachPage: 10,
      total1: 0,
      total3: 0,
      column: [],
      papers: [],
      orgs: [],
      orgs2: {},
      authorname: "",
      author_type: localStorage.getItem("authorId").toString().length < 10,
      circleUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      tableDatainfo: [
        {
          info: "h指数: " + localStorage.getItem("h_index"),
        },
        {
          info: "发表论文数量: " + localStorage.getItem("n_pubs"),
        },
        {
          info: "被引用量：" + localStorage.getItem("n_citation"),
        },
      ],
      tableDatapaper: [
        {
          papers: "量子力学概论  被引用数:77",
        },
        {
          papers: "量子力学小概论  被引用数:77",
        },
      ],
      activeName: "first",
      thiscolid: "",
      papersincoll: [],
      searchState: {},
      colpapers: [],
      mapdata: {},
      art: {
        name: [],
      },
      author: {
        year_citation: JSON.parse(localStorage.getItem("year_citation")),
        year_pubs: JSON.parse(localStorage.getItem("year_pubs")),
        authorId: 0,
        h_index: localStorage.getItem("h_index"),
        n_pubs: localStorage.getItem("n_pubs"),
        n_citation: localStorage.getItem("n_citation"),
      },
    };
  },
  computed: {
    //computed最高优先级，只有当loadfinish为true时,才开始页面加载
    loadfinish() {
      return this.articleloaded;
    },
    referenceloadfinish() {
      return this.referenceloaded;
    },
  },
  methods: {
    handleCurrentChange1(currpage) {
      this.currentPage1 = currpage;
    },
    handleCurrentChange3(currpage) {
      this.currentPage3 = currpage;
    },
    mouseOverWrapper() {
      this.$gsap.to(".wrapper", {
        duration: 0.1,
        boxShadow: "0px 0px 35px 13px rgb(127,127,127,0.3)",
      });
    },
    mouseLeaveWrapper() {
      this.$gsap.to(".wrapper", {
        duration: 0.1,
        boxShadow: "0px 0px 10px 2px rgb(127,127,127,0.2)",
      });
    },
    getrelatedauthor() {
      console.log("jiazai");
      let formData = new FormData();
      formData.append("author_id", localStorage.getItem("authorId"));
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      var _this = this;
      axios
        .post(
          "https://go-service-296709.df.r.appspot.com/api/v1/portal/direct_connection/list",
          formData,
          config
        )
        .then(function (response) {
          if (response.data.success) {
            _this.relateddata = response.data.message;
            _this.total3 = response.data.message.length;
          } else {
            console.log("请求失败");
            console.log(response.data);
          }
        });
    },
    getpapers() {
      var a = [];
      var one = JSON.parse(localStorage.getItem("paper_info"));
      for (var kkey in one)
        this.papers.push(JSON.parse(one[kkey]));
      this.total1 = this.papers.length;
      this.papers.sort(function (a1, b1) {
        return b1.r - a1.r;
      });
      console.log("taaaaaaaaa");
      console.log(this.total1);
      //this.papers.push(JSON.parse(one[0][i]))
    },
    routerPush() {
      this.$router.push("/detail/" + "main" + "/" + "53e99e99b7602d970275f7a6");
    },
    handleClick(tab, event) {
      if (tab.name == "forth") {
        //this.showcolpapers()
      }
    },
    thereAreResults() {
      return this.searchState.totalResults && this.searchState.totalResults > 0;
    },
    showcolpapers() {
      driver = new SearchDriver(mainpaperconfig);
    },

    checkau() {
      if (this.$route.params.authorId != localStorage.getItem("authorId"))
        this.$router.push("/home");
      this.authorname = localStorage.getItem("name");
    },
    loadauthormap() {
      let formData = new FormData();
      formData.append("author_id", localStorage.getItem("authorId"));
      formData.append("total", 200);
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      var _this = this;
      axios.post("https://go-service-296709.df.r.appspot.com/api/v1/portal/author_connection_graph", formData, config)
        .then(function (response) {
          if (response.data.success) {
            _this.mapdata = response.data.message;
            _this.graphloaded = true;
          } else {
            console.log("请求失败");
            console.log(response.data);
          }
        });
    },
  },
};
</script>

<style>
.bg-purple {
  background: #d3dce6;
}
.name {
  border-radius: 10px;
  background-color: #26beb8;
  color: white;
  text-align: center;
  font-size: 32px;
  font-weight: 500;

  padding: 2px 8px 2px 8px;
  margin-top: 10px;

  max-width: 300px;
}
.info {
  border-radius: 10px;
  background-color: #26beb8;
  color: white;
  text-align: center;
  font-size: 32px;
  font-weight: 500;
  padding: 2px 8px 2px 8px;

  margin-top: 10px;

  max-width: 700px;
}
.link {
  text-decoration: none;
  color: #26beb8;
  display: flex;
  align-items: center;
  cursor: pointer;
}
#root {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#affiliationHeader {
  /* outline: #21ff06 dotted thick; */
  border: #e6e6e6 solid thin;
  border-radius: 30px;
  box-shadow: 0px 0px 50px 10px rgba(127, 127, 127, 0.2);
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);
  width: 500px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#affsvg {
  position: absolute;
  top: 20px;
  left: 20px;
  opacity: 20%;
}
#affiliationName {
  font-size: 30px;
  font-weight: bolder;
  position: relative;
  width: 360px;
  text-align: center;
}
#affiliationInfo {
  display: flex;
  justify-content: space-between;
  color: #666666;
  font-weight: 500;
  width: 160px;
  margin-top: 20px;
}
#affdata {
  /* outline: #21ff06 dotted thick; */
  display: flex;
  justify-content: center;
  width: 1200px;
}
.datawrapper {
  border: #e6e6e6 solid thin;
  border-radius: 30px;
  box-shadow: 0px 0px 50px 10px rgba(127, 127, 127, 0.2);
  padding: 20px;
  margin: 40px;
}
.datatitle {
  /* outline: #21ff06 dotted thick; */
  height: 40px;
  margin-top: 10px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#paperindex {
  /* outline: #21ff06 dotted thick; */
  border-radius: 50px;
  background-color: #26beb8;
  color: white;
  width: 45px;
  height: 30px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
  margin-right: 10px;
}
#authorindex {
  border-radius: 50px;
  background-color: #dace0a;
  color: white;
  width: 30px;
  height: 30px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
  margin-right: 10px;
}

a:link {
  color: #000000;
}
a:visited {
  color: #666666;
}
a:hover {
  color: #1292fd;
  font-weight: bold;
}
.citation {
  white-space: nowrap;

  position: relative;
  right: 5px;

  text-align: center;

  font-size: 13px;

  background-color: #808080;
  color: white;

  border-radius: 10px;

  padding: 2px 8px 2px 8px;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
  margin-top: 3px;
}
#charts {
  /* outline: #21ff06 dotted thick; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  width: 1290px;

  border: #e6e6e6 solid thin;
  border-radius: 30px;
  box-shadow: 0px 0px 50px 10px rgba(127, 127, 127, 0.2);
  padding: 20px;
  margin: 20px;

  position: relative;

  overflow: hidden;
}
.chart {
  /* outline: #21ff06 dotted thick; */

  box-shadow: inset 0px 0px 10px 6px rgb(50, 50, 50, 0.1);
  border-radius: 30px;

  width: 600px;
  height: 500px;
  display: flex;
  align-items: center;

  margin: 10px;
}
.datatitle {
  /* outline: #21ff06 dotted thick; */
  height: 40px;
  margin-top: 10px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
