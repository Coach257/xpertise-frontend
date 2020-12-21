<template>
  <div >
    <el-container>
    <el-main>
  <div>
<el-row :gutter="10">
  <el-col :span="3" :offset="7"><div class="grid-content "><el-avatar :size="100" :src="circleUrl"></el-avatar></div></el-col>
  <el-col :span="6"><div class="name" >
           {{this.authorname}}
          </div></el-col>

</el-row>

<el-row :gutter="24">
  <el-col :span="20" :offset="7">
    <div class="info">
        <el-table
        :data="tableDatainfo"
        style="width: 100%"
         background-color="#26beb8"
        >
            <el-table-column
            prop="info"

            align="center"
            label="信息">

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
      <Column :type="this.my" :id="this.$route.params.authorId"></Column>
         <el-row class="block-col-2">
            <li
            tag="div"
            class="result_detail_author"
            v-for="(author) in this.art.name"
            :key="author.id"
            @click = "routerPush"
          >
            {{author}}
           </li>

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
import Column from './Column'
import { SearchDriver } from "@elastic/search-ui";
import {mainpaperconfig,
  mainauthorconfig,
  cspaperconfig,
  csauthorconfig,
  csaffiliationconfig,} from "../searchConfig";


//const driver = new SearchDriver(csauthorconfig)
var driver = null;
  export default {
   name: 'Portal',
   props: ["type"],
   components:{Column},
   searchState: {},
   mounted() {
      this.checkau()
      //this.searchcol()

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
         my:"portal",
         column:[],
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
        colpapers:[],
        art:{
          name:[]
        },
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
      }
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
     routerPush () {

        this.$router.push('/detail/'+"main"+'/'+"53e99e99b7602d970275f7a6")
      // if (this.$props.option == 'paper') {
      //   this.$router.push('/detail/'+this.type+'/'+this.paper.id)
      // }else if(this.$props.option == 'author') {
      //   this.$router.push('/author/'+this.type+'/'+this.author.id)
      // }else {
      //   this.$router.push('/affiliation/'+this.affiliation.id)
      // }

    },
    handleClick(tab, event){
      if(tab.name == 'forth'){
        //this.showcolpapers()
      }
    },
    thereAreResults() {
      return this.searchState.totalResults && this.searchState.totalResults > 0;
    },
    showcolpapers(){

      driver = new SearchDriver(mainpaperconfig);


       console.log("开始11");
                    console.log(this.papersincoll);
                    console.log("开始22");
      // for ( var i=0;i< this.papersincoll.length;i++){
         //driver.addFilter("id",this.papersincoll[i].paper_id,"any")
    // driver.addFilter("id","53e99e99b7602d970275f7a6","any")

    //    driver.subscribeToStateChanges((state) => {
    //   this.searchState = state;
    // });
                   // console.log(this.papersincoll[i].paper_id);
    },

    checkau(){
      if(this.$route.params.authorId!=localStorage.getItem("authorId"))
        this.$router.push('/home')
      let formData = new FormData();
      formData.append("id", this.$route.params.authorId);
      console.log(this.$route.params.authorId)
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
                    console.log("没有这个作者或者当前登陆用户不是这个作者");

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
</style>
