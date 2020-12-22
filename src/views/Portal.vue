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
        <el-row class="block-col-2">
               <div id='affpapers' class="datawrapper">

        <div class="datatitle">
        <h2>文献列表</h2>
        <svg class="icon" width="27px" height="27px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M734.634667 72.448C717.824 55.978667 685.226667 42.666667 661.674667 42.666667H204.8C162.389333 42.666667 128 79.189333 128 124.330667v775.338666C128 944.768 162.474667 981.333333 204.8 981.333333h614.4c42.410667 0 76.8-36.693333 76.8-81.578666V273.493333c0-23.68-13.781333-56.405333-30.378667-72.661333l-130.986666-128.426667zM341.333333 298.666667h341.333334a42.666667 42.666667 0 0 1 0 85.333333H341.333333a42.666667 42.666667 0 1 1 0-85.333333z m0 170.666666h170.666667a42.666667 42.666667 0 0 1 0 85.333334H341.333333a42.666667 42.666667 0 0 1 0-85.333334z" fill="#666666"/></svg>
        </div>

        <el-divider></el-divider>

        <div>
           <router-link
            class="link"
            v-for="(paper,index) in papers.slice(
                (this.currentPage1 - 1) * this.eachPage,
                this.currentPage1 * this.eachPage)"
            :key="index"
            :to="'/detail/cs/' + paper.id"
            tag="a"
            >


              <div id='paperindex'>{{index+1+(currentPage1-1)*eachPage}}</div>
              <div style="width: 1100px;"> {{ paper.title }}      </div>
              <div style="width: 70px;margin-right:0">  引用数: {{paper.r}}</div>


          </router-link>
        </div>

        <center style="margin-top: 30px; margin-bottom: 30px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total='total1'
          :page-size='eachPage'
          @current-change='handleCurrentChange1'
          >
        </el-pagination>
        </center>

      </div>
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
      this.getpapers();
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
         currentPage1: 1,
        currentPage2: 1,
        eachPage: 10,
        total1: 0,
         column:[],
         papers:[],
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
     handleCurrentChange1(currpage) {
      this.currentPage1 = currpage;
    },    mouseOverWrapper() {
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
     getpapers(){
       console.log("aa")
       var a =[]
  console.log(JSON.parse(localStorage.getItem("paper_info")))
      //  for(var i=0;i< localStorage.getItem("paper_info").length;i++){
      //    console.log(localStorage.getItem("paper_info"))
      //    //this.papers.push(JSON.parse(localStorage.getItem("paper_info")[i]))
      //  }
      var one = (JSON.parse(localStorage.getItem("paper_info")))
      console.log(JSON.parse(one[90]))
      for(var kkey in one) {//if(kkey == "title")

      this.papers.push(JSON.parse(one[kkey]))
      }
      this.total1=this.papers.length
      console.log("taaaaaaaaa")
      console.log(this.total1)
      //this.papers.push(JSON.parse(one[0][i]))

     },
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
      console.log("aa");
      console.log(this.$route.params)
      console.log("ab");
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
#affiliationHeader{
  /* outline: #21ff06 dotted thick; */
  border: #e6e6e6 solid thin;
  border-radius: 30px;
  box-shadow: 0px 0px 50px 10px rgba(127,127,127,0.2);
  backdrop-filter: blur(20px);
  background-color: rgba(255,255,255,0.5);
  width: 500px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#affsvg{
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
  text-align:center;
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
  box-shadow: 0px 0px 50px 10px rgba(127,127,127,0.2);
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
#paperindex{
  /* outline: #21ff06 dotted thick; */
  border-radius: 50px;
  background-color: #26BEB8;
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
#authorindex{
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
  color:#666666;
}
a:hover {
  color:#1292fd;
  font-weight: bold;
}
</style>
