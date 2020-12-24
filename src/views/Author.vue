<template>
  <div id="root" v-show="loadfinish">
    <div id="trigger"></div>
    <div style="position: fixed; top: 70px; z-index: 2">
      <div id="authorHeader">
        <svg
          id="authorsvg"
          class="icon"
          width="35px"
          height="35px"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M272.128 538.752l207.36 409.472H204.736c-31.488-1.152-57.728-12.224-78.72-33.28s-32.064-47.232-33.28-78.72v-185.472c1.152-31.488 12.224-57.728 33.28-78.72s47.232-32.064 78.72-33.28h67.392z m88.768-414.784c38.784-39.104 87.616-59.52 146.56-61.248 58.944 1.728 107.776 22.144 146.56 61.248 38.784 39.104 59.072 87.808 60.8 146.112-0.576 37.952-9.92 72.64-28.032 104.128s-43.456 56.576-76.096 75.264c-32.704 18.688-67.072 28.032-103.232 28.032-36.16 0-70.592-9.344-103.232-28.032-32.704-18.688-58.048-43.776-76.096-75.264-18.112-31.488-27.456-66.176-28.032-104.128 1.728-58.304 22.016-107.008 60.8-146.112z m241.984 532.928l-95.36 201.28-95.36-201.28 95.36-83.968 95.36 83.968z m286.976-84.928c21.568 20.992 34.112 47.232 37.632 78.72v185.472c-0.576 31.488-11.52 57.728-32.832 78.72-21.312 20.992-47.68 32.064-79.168 33.28H540.736l202.112-409.472h67.392c31.488 1.216 58.048 12.288 79.616 33.28z"
            fill="#666666"
          />
        </svg>

        <div id="authorName">
          <div>{{ this.author.name }}</div>
        </div>

        <div id="authorNameFake">
          <div>{{ this.author.name }}</div>
        </div>

        <div id="authorInfo">
          <div style="display: flex">
            <svg
              class="icon"
              width="21px"
              height="21px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M734.634667 72.448C717.824 55.978667 685.226667 42.666667 661.674667 42.666667H204.8C162.389333 42.666667 128 79.189333 128 124.330667v775.338666C128 944.768 162.474667 981.333333 204.8 981.333333h614.4c42.410667 0 76.8-36.693333 76.8-81.578666V273.493333c0-23.68-13.781333-56.405333-30.378667-72.661333l-130.986666-128.426667zM341.333333 298.666667h341.333334a42.666667 42.666667 0 0 1 0 85.333333H341.333333a42.666667 42.666667 0 1 1 0-85.333333z m0 170.666666h170.666667a42.666667 42.666667 0 0 1 0 85.333334H341.333333a42.666667 42.666667 0 0 1 0-85.333334z"
                fill="#666666"
              />
            </svg>
            <div style="margin-left: 5px; white-space: nowrap">
              {{ this.author.n_pubs }}篇
            </div>
          </div>

          <div style="display: flex">
            <svg
              class="icon"
              width="21px"
              height="21px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M321.40024 143.1c22.4-17 53-19.9 78.4-7.4s40.9 38 39.8 65.4-18.8 51.6-45.1 62.1c-86.6 49.8-156 123.1-199.4 210.7h24.1c121 0 219.1 94.3 219.1 210.7s-98.1 210.7-219.1 210.7S0.00024 801 0.00024 684.6c-0.2-222 123.6-427.1 321.4-541.5z m584.3 0.7c22.4-17 53-19.9 78.4-7.4s40.9 38 39.8 65.4-18.8 51.6-45.1 62.1c-86.6 49.8-156 123.1-199.4 210.7h24.1c121 0 219.1 94.3 219.1 210.7S924.50024 896 803.50024 896s-219.1-94.3-219.1-210.7c0-221.7 123.8-427.2 321.3-541.5z"
                fill="#666666"
              />
            </svg>
            <div style="margin-left: 5px; white-space: nowrap">
              {{ this.author.n_citation }}次
            </div>
          </div>

          <div style="display: flex">
            <svg
              class="icon"
              width="21px"
              height="21px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M509.748215 70.300113c-242.847957 0-439.695231 196.885136-439.695231 439.695231 0 242.846934 196.847274 439.695231 439.695231 439.695231 242.827491 0 439.695231-196.847274 439.695231-439.695231C949.442422 267.185248 752.575706 70.300113 509.748215 70.300113zM554.516838 441.519786l0 355.308285-89.536222 0L464.980615 441.519786 337.693604 441.519786l172.054611-218.205721L681.801802 441.519786 554.516838 441.519786z"
                fill="#666666"
              />
            </svg>
            <div style="margin-left: 5px; white-space: nowrap">
              {{ this.author.h_index }}次
            </div>
          </div>
        </div>

        <div id="authorAff">
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
            <span style="color: #666666; font-weight: bold; margin-right: 10px"
              >隶属机构</span
            >
            <svg
              class="icon"
              width="21px"
              height="21px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M969.176313 950.856281l3.364561-580.715848a88.100288 88.100288 0 0 0-89.745997-86.19858h-126.756164v-197.485079a84.552871 84.552871 0 0 0-26.258201-61.403232A91.391706 91.391706 0 0 0 666.292716 0.002194H141.274975a91.391706 91.391706 0 0 0-63.268368 25.051348 84.845442 84.845442 0 0 0-24.978206 61.147232V952.319133h-14.482239A37.778164 37.778164 0 0 0 0.036571 988.159018c0.365713 9.508541 4.388557 18.505083 11.263964 25.051348 7.314262 6.98512 17.115374 10.861679 27.245627 10.788537h948.001524C1007.210477 1023.998903 1024.03328 1007.1761 1024.03328 986.403595c0-20.772505-16.822803-37.595308-37.485594-37.595308L969.176313 950.856281zM311.039 421.523125h196.753654c20.699362 0 37.485594 16.822803 37.485593 37.595308 0 20.772505-16.786232 37.595308-37.485593 37.595308H311.258428a38.76559 38.76559 0 0 1-33.75532-20.553077 35.657028 35.657028 0 0 1 0-36.351883c7.204548-11.556534 19.894793-18.505083 33.499321-18.285656z m196.753654 345.086891H311.258428c-20.735933 0-37.522165-16.822803-37.522165-37.595308 0-20.735933 16.822803-37.558736 37.522165-37.558736h196.753654c13.67767-0.329142 26.5142 6.619407 33.718748 18.285655 7.423976 11.812533 7.314262 26.879914-0.219428 38.582733a38.729018 38.729018 0 0 1-33.75532 18.285656z"
                fill="#666666"
              />
            </svg>
          </div>

          <div class="affname" v-if="type == 2">
            <span v-for="(org, index) in this.author.orgs_main" :key="index">
              {{ org }}
            </span>
          </div>

          <div
            v-if="type == 1"
            style="
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              width: 400px;
            "
          >
            <span v-for="(org, index) in this.author.orgs_cs" :key="index">
              <div
                class="affname"
                @click="affRouterPush(org.id)"
                style="cursor: pointer"
              >
                {{ org.name }}
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div style="height: 390px"></div>

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
        v-if="loadfinish"
      ></author-compare-chart>
      <author-year-paper-chart
        class="chart"
        v-if="loadfinish"
        :year_citation="this.author.year_citation"
        :year_pubs="this.author.year_pubs"
      ></author-year-paper-chart>
      <author-relation-map
        class="chart"
        :data="this.mapdata"
        v-if="graphloaded"
      ></author-relation-map>
      <related-author-chart
        class="chart"
        :data="relateddata"
        :authorid="authorId"
        v-if="relatedloaded"
      ></related-author-chart>
    </div>

    <div id="authorData">
      <div id="authorPapers" class="dataWrapper">
        <div class="datatitle">
          <h2>论文列表</h2>
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

        <div v-if="type == 1">
          <router-link
            class="link"
            v-for="(pub, index) in this.author.pubs.slice(
              (this.currentPage - 1) * this.eachPage,
              this.currentPage * this.eachPage
            )"
            :key="pub.i"
            :to="'/detail/cs/' + pub.id"
            tag="a"
            target="_blank"
          >
            <div class="paperindex">
              {{ index + 1 + (currentPage - 1) * eachPage }}
            </div>
            <div style="width: 700px">{{ pub.title }}</div>
            <div class="citation2">第{{ pub.r }}作者</div>
            <div class="citation">被引{{ pub.n_citation }}次</div>
          </router-link>
        </div>

        <div v-if="type == 2">
          <router-link
            class="link"
            v-for="(pub, index) in this.author.pubs.slice(
              (this.currentPage - 1) * this.eachPage,
              this.currentPage * this.eachPage
            )"
            :key="pub.i"
            :to="'/detail/main/' + pub.id"
            tag="a"
            target="_blank"
          >
            <div class="paperindex">
              {{ index + 1 + (currentPage - 1) * eachPage }}
            </div>
            <div style="width: 700px">{{ pub.i }}</div>
            <div class="citation">被引{{ pub.r }}次</div>
          </router-link>
        </div>

        <center style="margin-top: 30px; margin-bottom: 30px">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="eachPage"
            @current-change="handleCurrentChange"
            :hide-on-single-page="true"
          >
          </el-pagination>
        </center>
      </div>

      <div v-if="type == 2" id="authorLabel" class="dataWrapper">
        <div>
          <div class="datatitle">
            <h2>学者标签</h2>
            <svg
              class="icon"
              width="27px"
              height="27px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M814 122.8l-264.6 12.7c-35.1 1.7-68.3 16.4-93.1 41.2L107.7 525.3c-31.1 31.1-31.1 81.6 0 112.7l277.2 277.2c31.1 31.1 81.6 31.1 112.7 0l14.3-14.3 92.1-92.1 242.2-242.2c24.8-24.8 39.5-58 41.2-93.1l12.7-264.6c2.3-48.5-37.6-88.4-86.1-86.1zM689.6 470c-37.8 37.8-99 37.8-136.8 0s-37.8-99 0-136.8c37.8-37.8 99-37.8 136.8 0 37.8 37.8 37.8 99.1 0 136.8z"
                fill="#666666"
              />
            </svg>
          </div>

          <el-divider></el-divider>

          <div
            style="
              width: 330px;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
            "
          >
            <div
              class="tagName"
              v-for="(tag, index) in this.author.tags.slice(
                (this.currentPage1 - 1) * this.eachPage1,
                this.currentPage1 * this.eachPage1
              )"
              :key="index"
            >
              {{ tag.t }}
            </div>

            <center style="margin-top: 30px; margin-bottom: 30px">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="total1"
                :page-size="eachPage1"
                @current-change="handleCurrentChange1"
                pager-count="5"
                :hide-on-single-page="true"
              >
              </el-pagination>
            </center>
          </div>
        </div>
      </div>
    </div>

    <div id="authorColumn" v-if="issettled">这里是专栏</div>

    <div id="authorRecommend" v-if="issettled">这里是推荐</div>
  </div>
</template>

<script>
import { SearchDriver } from "@elastic/search-ui";
import AuthorRelationMap from "../components/common/AuthorRelationMap.vue";
import RelatedAuthorChart from "../components/common/RelatedAuthorChart.vue";
import AuthorCompareChart from "../components/common/AuthorCompareChart.vue";
import AuthorYearPaperChart from "../components/common/AuthorYearPaperChart.vue";
import {
  mainpaperconfig,
  mainauthorconfig,
  cspaperconfig,
  csauthorconfig,
  csaffiliationconfig,
} from "../searchConfig";
var driver = null;
import axios from "axios";

export default {
  name: "Author",
  components: {
    AuthorRelationMap,
    RelatedAuthorChart,
    AuthorCompareChart,
    AuthorYearPaperChart,
  },
  props: [],
  data() {
    return {
      authorId: "",
      issettled: false,
      type: 0,
      author: {
        h_index: 0,
        orgs_main: [],
        orgs_cs: [],
        pubs: [],
        n_citation: 0,
        n_pubs: 0,
        name: "",
        tags: [],
        year_citation: {},
        year_pubs: {},
      },
      currentPage: 1,
      currentPage1: 1,
      eachPage: 50,
      eachPage1: 50,
      total: 0,
      total1: 0,
      contendLoaded: false,
      relatedloaded: false,
      relateddata: [],
      graphloaded: false,
      searchState: {},
      mapdata: {},
    };
  },
  computed: {
    loadfinish() {
      return this.contendLoaded;
    },
    iscspaper() {
      return this.type == 1 && this.contendLoaded;
    },
  },
  mounted() {
    this.initdata();
    this.initdriver();
    this.setissettled();
    this.initAnimation();
  },

  watch: {
    searchState(newsearchState) {
      if (this.thereAreResults()) {
        this.getthisauthor();
      }
    },
  },
  methods: {
    thereAreResults() {
      return this.searchState.totalResults && this.searchState.totalResults > 0;
    },
    // 基本初始化
    initdata() {
      this.authorId = this.$route.params.authorId;
      if (this.$route.params.type == "cs") {
        this.type = 1;
      } else {
        this.type = 2;
      }
    },
    // 初始化driver
    initdriver() {
      if (this.type == 1) {
        driver = new SearchDriver(csauthorconfig);
      } else {
        driver = new SearchDriver(mainauthorconfig);
      }
      driver.reset();
      driver.setResultsPerPage(1);
      driver.addFilter("id", this.authorId, "any");
      driver.subscribeToStateChanges((state) => {
        this.searchState = state;
      });
    },
    // 初始化动画
    initAnimation() {
      this.$gsap.to("#authorHeader", {
        duration: 1,
        height: "80px",
        borderRadius: "50px",
        scrollTrigger: {
          trigger: "#affiliationHeader",
          start: "top top",
          end: "+=200px",
          scrub: 0.7,
        },
      });
      this.$gsap.to("#authorInfo", {
        duration: 1,
        opacity: 0,
        scrollTrigger: {
          trigger: "#authorHeader",
          start: "top top",
          end: "+=200px",
          scrub: 0.7,
        },
      });
      this.$gsap.to("#authorAff", {
        duration: 1,
        opacity: 0,
        scrollTrigger: {
          trigger: "#authorHeader",
          start: "top top",
          end: "+=200px",
          scrub: 0.7,
        },
      });
      this.$gsap.to("#authorName", {
        duration: 1,
        opacity: 0,
        scrollTrigger: {
          trigger: "#authorHeader",
          start: "top top",
          end: "+=200px",
          scrub: 0.7,
        },
      });
      this.$gsap.to("#authorNameFake", {
        duration: 1,
        top: "22px",
        color: "#7f7f7f",
        fontSize: "23px",
        opacity: 1,
        scrollTrigger: {
          trigger: "#authorHeader",
          start: "top top",
          end: "+=200px",
          scrub: 0.7,
        },
      });
    },
    // 翻页
    handleCurrentChange(currpage) {
      this.currentPage = currpage;
    },
    handleCurrentChange1(currpage) {
      this.currentPage1 = currpage;
    },
    // 机构跳转
    affRouterPush(id) {
      let routeData = this.$router.resolve("/affiliation/" + id);
      window.open(routeData.href, "_blank");
    },
    // 赋值本作者信息
    getthisauthor() {
      var results = this.searchState.results[0];
      console.log(results);
      var raw;
      if (results.name && results.name.raw) this.author.name = results.name.raw;
      if (this.type == 1) {
        this.getrelatedauthor();
        this.loadauthormap();
        this.author.year_citation = JSON.parse(results.year_citation.raw);
        this.author.year_pubs = JSON.parse(results.year_pubs.raw);
      }
      if (results.h_index && results.h_index.raw)
        this.author.h_index = results.h_index.raw;
      if (results.orgs && results.orgs.raw) {
        for (let i = 0; i < results.orgs.raw.length; i++) {
          if (this.type === 1)
            this.author.orgs_cs.push(JSON.parse(results.orgs.raw[i]));
          else this.author.orgs_main.push(results.orgs.raw[i]);
        }
      }

      if (results.n_citation && results.n_citation.raw)
        this.author.n_citation = results.n_citation.raw;
      if (results.n_pubs && results.n_pubs.raw)
        this.author.n_pubs = results.n_pubs.raw;

      if (results.pubs && results.pubs.raw) {
        raw = results.pubs.raw;
        for (let i = 0; i < raw.length; i++)
          this.author.pubs.push(JSON.parse(raw[i]));
      }

      if (results.tags && results.tags.raw) {
        raw = results.tags.raw;
        for (let i = 0; i < raw.length; i++)
          this.author.tags.push(JSON.parse(raw[i]));
      }
      this.contendLoaded = true;
      this.total = this.author.pubs.length;
      this.total1 = this.author.tags.length;

      //文献按照n_citation排序
      this.author.pubs.sort(function (a, b) {
        return b.n_citation - a.n_citation;
      });
    },
    // 获取合作作者数据
    getrelatedauthor() {
      let formData = new FormData();
      formData.append("author_id", this.authorId);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
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
            _this.relatedloaded = true;
          } else {
            console.log("请求失败");
            console.log(response.data);
          }
        });
    },
    // 请求判断该作者是否入驻
    setissettled() {
      let formData = new FormData();
      formData.append("author_id", this.authorId);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post(
          "https://go-service-296709.df.r.appspot.com/api/v1/portal/is_settled",
          formData,
          config
        )
        .then(function (response) {
          if (response.data.message == "true") {
            _this.issettled = true;
          } else {
            _this.issettled = false;
          }
        });
    },
    // 加载关系图数据
    loadauthormap() {
      let formData = new FormData();
      formData.append("author_id", this.authorId);
      formData.append("total", 200);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post(
          "https://go-service-296709.df.r.appspot.com/api/v1/portal/author_connection_graph",
          formData,
          config
        )
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

<style scoped>
#root {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#authorHeader {
  /* outline: #21ff06 dotted thick; */
  border: #e6e6e6 solid thin;
  border-radius: 30px;
  box-shadow: 0px 0px 50px 10px rgba(127, 127, 127, 0.2);
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);
  width: 500px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#authorsvg {
  position: absolute;
  top: 20px;
  left: 20px;
  opacity: 20%;
}
#authorName {
  font-size: 30px;
  font-weight: bolder;

  /*  position: absolute;
  top: 50px; */
  position: relative;

  width: 360px;
  text-align: center;
}
#authorNameFake {
  opacity: 0;

  font-size: 30px;
  font-weight: bolder;

  position: absolute;
  top: 50px;

  width: 360px;
  text-align: center;
}
#authorInfo {
  display: flex;
  justify-content: space-between;
  color: #666666;
  font-weight: 500;
  width: 260px;
  margin-top: 20px;
}
#authorAff {
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.affname {
  border-radius: 10px;
  background-color: #26beb8;
  color: white;

  font-size: 16px;
  font-weight: 500;

  padding: 2px 8px 2px 8px;
  margin-top: 10px;
  margin-right: 3px;
  margin-left: 3px;

  max-width: 300px;
}
#authorData {
  display: flex;
  justify-content: center;
  width: 1200px;
}
#authorRecommend {
  border: #e6e6e6 solid thin;
  border-radius: 30px;
  box-shadow: 0px 0px 50px 10px rgba(127, 127, 127, 0.2);
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);
  width: 1200px;
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}
#authorColumn {
  border: #e6e6e6 solid thin;
  border-radius: 30px;
  box-shadow: 0px 0px 50px 10px rgba(127, 127, 127, 0.2);
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);
  width: 1200px;
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}
.dataWrapper {
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
.paperindex {
  /* outline: #21ff06 dotted thick; */
  border-radius: 50px;
  background-color: #26beb8;
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
.citation2 {
  white-space: nowrap;

  position: relative;
  right: 5px;

  text-align: center;

  font-size: 13px;

  background-color: #dace0a;
  color: white;

  border-radius: 10px;

  padding: 2px 8px 2px 8px;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
  margin-top: 3px;
}
.tagName {
  text-align: left;

  font-size: 15px;
  font-weight: bold;

  background-color: #dace0a;
  color: white;

  border-radius: 25px;

  padding: 3px 10px 3px 10px;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 5px;
  margin-top: 5px;
}

.link {
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
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
</style>
