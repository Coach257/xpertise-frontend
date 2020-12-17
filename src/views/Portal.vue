<template>
    <div >
        <el-container>

  <el-main>

  <div>
<el-row :gutter="10">
  <el-col :span="4" :offset="6"><div class="grid-content "><el-avatar :size="100" :src="circleUrl"></el-avatar></div></el-col>
  <el-col :span="9"><div class="grid-content "><h1 style="font-size:35px;bold"> {{this.authorname}}</h1></div></el-col>

</el-row>

<el-row :gutter="24">
  <el-col :span="10" :offset="2">
    <div class="grid-content ">
        <el-table
        :data="tableDatainfo"

        style="width: 100%"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
        icon="el-icon-tickets">
            <el-table-column
            prop="info"
            label="信息">
            </el-table-column>

        </el-table>
    </div>
  </el-col>
  <el-col :span="9" >
    <div class="grid-content ">
        <el-table
        :data="tableDatapaper"

        style="width: 100%"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
        icon="el-icon-tickets">
            <el-table-column
            prop="papers"
            label="推荐文章">
            </el-table-column>

        </el-table>
    </div>
  </el-col>
   <!-- <el-col :span="3"><div class="grid-content ">
         <el-link href="https://element.eleme.io" type="primary" icon="el-icon-tickets" target="_blank">添加文章</el-link>
      </div></el-col> -->




</el-row>
 <el-row :gutter="5"> <el-col :span="20" :offset="2"><h1> </h1></el-col>  </el-row>
<el-row :gutter="10">
<el-col :span="20" :offset="2">
    <el-tabs v-model="activeName" @tab-click="handleClick" >
    <el-tab-pane label="我的文献" name="first">
        <el-row class="block-col-2">
            <el-col :span="2">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    所有时间<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>最近五年</el-dropdown-item>
                    <el-dropdown-item>最近一年</el-dropdown-item>
                    <el-dropdown-item>最近一月</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="2">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    全部作者<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>仅合作作者</el-dropdown-item>
                    <el-dropdown-item>其他作者</el-dropdown-item>

                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="3">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    按时间排序<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>倒序</el-dropdown-item>
                    <el-dropdown-item>顺序</el-dropdown-item>

                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </el-tab-pane>
    <el-tab-pane label="我的合作伙伴" name="second">
         <el-row class="block-col-2">



        </el-row>
    </el-tab-pane>

    <el-tab-pane label="我的机构" name="third">
         <el-row class="block-col-2">

        </el-row>
    </el-tab-pane>
    <el-tab-pane label="我的专栏" name="forth" >
         <el-row class="block-col-2">

        </el-row>
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
import axios from 'axios'
import { SearchDriver } from "@elastic/search-ui";
import {mainauthorconfig,csauthorconfig} from "../searchConfig";

//const driver = new SearchDriver(csauthorconfig)
var driver = null;
  export default {
   name: 'Portal',
   props: ['type'],
   components:{},
   searchState: {},
   mounted() {
      this.checkau()
      this.searchcol()

      //  driver.subscribeToStateChanges(state => {
      //   this.searchState = state;
      //  });
      //  driver.clearFilters()

       //driver.getActions().setSearchTerm("")
       console.log(1)
       //console.log(this.searchState)
       console.log(2)
       //this.getInfo();
   },
   data(){
       return {
         authorname:'',
        circleUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
         tableDatainfo: [{
          info: '毕业于北京航空航天大学'
        }, {
          info: '研究方向量子力学'
        }, {
          info: '被引用量：777'
        }],
        tableDatapaper: [{
          papers: '量子力学概论  被引用数:77'
        }, {
          papers: '量子力学小概论  被引用数:77'
        }],
        activeName: 'first',
        thiscolid:'',
        papersincoll:[],
        searchState: {},
      }
   },
    watch: {
    searchState(newsearchState) {
      console.log("??");
        console.log(newsearchState);
      if (this.thereAreResults()) {
        console.log("??");
        console.log(newsearchState);
        // 任意一种result都有可能没有任意一种属性,任意一种属性的值都有可能为空
        var results = newsearchState.results[0];
        var raw;
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
          this.loadscholarly();
          this.loadreference();
        }
        this.articleloaded = true;
      }
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
    handleClick(tab, event){
      if(tab.name == 'forth'){
        this.showcolpapers()
      }
    },
    thereAreResults() {
      return this.searchState.totalResults && this.searchState.totalResults > 0;
    },
    showcolpapers(){

      driver = new SearchDriver(csauthorconfig);


       console.log("开始11");
                    console.log(this.papersincoll);
                    console.log("开始22");
       for ( var i=0;i< this.papersincoll.length;i++){
         driver.addFilter("id",this.papersincoll[i].paper_id,"any")
       driver.subscribeToStateChanges((state) => {
      this.searchState = state;
    });

                    console.log(this.papersincoll[i].paper_id);

       }
       console.log(this.searchState);

    },
      papersincol(){

      let formData = new FormData();
      formData.append("column_id", this.thiscolid);
      // console.log("colid");
      // console.log(this.thiscolid);
      // console.log("colid");
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this
        axios.post('https://go-service-296709.df.r.appspot.com/api/v1/portal/list_all_from_column',formData, config)
            .then(function (response)  {

                if(response){
                  if(response.data.success){
                    _this.papersincoll = response.data.data
                    // console.log("开始11");
                    // console.log(response.data.data[0].column_id);
                    // console.log("开始22");
                  }
                  else{
                    console.log("没有专栏?");

                    }
                }
                else {
                  console.log("error2");

                }

            }).catch(function () {
          console.log("error");
        });
    },
    searchcol(){

      let formData = new FormData();
      formData.append("author_id", this.$route.params.authorid);
      console.log("开始找colid")
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this
        axios.post('https://go-service-296709.df.r.appspot.com/api/v1/portal/searchcol',formData, config)
            .then(function (response)  {

                if(response){
                  if(response.data.success){
                    _this.thiscolid = response.data.data.column_id
                    _this.papersincol()

                  }
                  else{
                    console.log("没有专栏");

                    }
                }
                else {
                  console.log("error2");

                }

            }).catch(function () {
          console.log("error");
        });

    },
    checkau(){
      if(this.$route.params.authorid!=localStorage.getItem("userid"))
        this.$router.push('/home')
      let formData = new FormData();
      formData.append("id", this.$route.params.authorid);
      console.log(this.$route.params.authorid)
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this
        axios.post('https://go-service-296709.df.r.appspot.com/api/v1/portal/author',formData, config)
            .then(function (response)  {

                if(response){
                  if(response.data.success){
                    _this.authorname = response.data.data.author_name

                  }
                  else{
                    console.log("没有这个作者");

                    _this.$router.push('/home')
                    }
                }
                else {
                  console.log("error2");
                  _this.$route.go(-1);
                }

            }).catch(function () {
          console.log("error");
        });
    }
  }
  }
</script>

<style>
  .bg-purple {
    background: #d3dce6;
  }
</style>
