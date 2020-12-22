<template>
  <div id="root">
    <div id="coldata">
      <div id="affpapers" class="datawrapper">
        <div class="datatitle">
          <h2>专栏列表</h2>
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

        <div>
          <el-collapse accordion>
            <el-collapse-item

              class="linkk"
              v-for="pub in this.column.slice(
                (this.currentPage1 - 1) * this.eachPage,
                this.currentPage1 * this.eachPage
              )"
              :key="pub.id"
              tag="a"
              @click.native="papersincol(nowcol(pub))"
              :title="pub"
               style="width: 900px;font-size:90px"
            >
              <div>
                <router-link

            v-for="(paper,index) in colpapers"
            :key="index"
            :to="'/detail/cs/' + paper.id"
            tag="a"
            >


              <div id='paperindex'>{{index+1+(currentPage1-1)*eachPage}}</div>
              <div style="width: 900px;"> {{ paper.name }} </div>


          </router-link>
                <!-- <router-link
            class="link"
            v-for="(pub) in (this.column).slice((this.currentPage1-1)*this.eachPage, this.currentPage1*this.eachPage)"
            :key = pub.id
            :to="'/detail/cs/' + pub.id"
            tag="a"
            >


              <div id='paperindex'>{{index+1+(currentPage1-1)*eachPage}}</div>
              <div style="width: 700px;"> {{ pub.title }} </div>


          </router-link> -->
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div
          v-if="isportalauthor"
          class="wrapper"
          @mouseover="mouseOverWrapper()"
          @mouseleave="mouseLeaveWrapper()"
          style="
            width: 80px;
            height: 30px;
            align-items: center;
            background-color: #26beb8;
            color: white;
            border-radius: 10px;
            margin-right: 1px;
          "
        >
          <h3 color="#26BEB8;">添加专栏</h3>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { SearchDriver } from "@elastic/search-ui";
import {
  mainpaperconfig,
  mainauthorconfig,
  cspaperconfig,
  csauthorconfig,
  csaffiliationconfig,
} from "../searchConfig";
export default {
  props: ["type", "id"],
  name: "Column",
  data() {
    return {
      activeName: "1",
      column: [],
      columnnum: [],
      colpapers: [],
      contendLoaded: false,
      searchState: {},
      currentPage1: 1,
      currentPage2: 1,
      eachPage: 5,
      total1: 0,
      total2: 0,
    };
  },
  mounted() {
    this.searchcol();

    // console.log(this.$route.params.affId);
  },
  methods: {
    nowcol(pub) {
      for (var i = 0; i < this.column.length; i++) {
        if (this.column[i] == pub) {
          console.log(this.columnnum[i]);
          return this.columnnum[i];
        }
      }
      return -1;
    },
    papersincol(col) {
      if (col == -1) return;
      let formData = new FormData();
      for (var i = 0; i <= this.colpapers.length; i++) {
        this.colpapers.pop();
      }
      //console.log("清理后");
      //console.log(this.colpapers);
      formData.append("column_id", col);
      // console.log("colid");
      // console.log(this.thiscolid);
      console.log("加载cols");
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post(
          "https://go-service-296709.df.r.appspot.com/api/v1/portal/column/list_all_from_column",
          formData,
          config
        )
        .then(function (response) {
          if (response) {
            if (response.data.success) {
              //console.log(_this.columnnum);
              //console.log(response.data.data);
              for (i = 0; i < response.data.data.length; i++) {
                _this.colpapers.push({"name":response.data.data[i].paper_title,"id":response.data.data[i].paper_id});
              }

              // console.log("开始11");
              // console.log(response.data.data[0].column_id);
              // console.log("开始22");
            } else {
              console.log("没有专栏?");
            }
          } else {
            console.log("error2");
          }
        })
        .catch(function () {
          console.log("error");
        });
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
    searchcol() {
      let formData = new FormData();
      formData.append("author_id", this.$props.id);
      //console.log("开始找colid")
      //console.log(this.$props.id)
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post(
          "https://go-service-296709.df.r.appspot.com/api/v1/portal/column/searchcol",
          formData,
          config
        )
        .then(function (response) {
          if (response) {
            if (response.data.success) {
              console.log("下面col的");

              for (var i = 0; i < response.data.data.length; i++) {
                if (response.data.data[i].column_name in _this.column) continue;
                _this.column.push(response.data.data[i].column_name);
                _this.columnnum.push(response.data.data[i].column_id);
              }
              console.log(_this.columnnum);
               _this.total1 = _this.columnnum.length
              console.log(_this.total1);

              // console.log(_this.column);

              //_this.papersincol()
              console.log("上面");
            } else {
              console.log("没有专栏");
            }
          } else {
            console.log("error2");
          }
        })
        .catch(function () {
          console.log("error");
        });
    },
    thereAreResults() {
      return this.searchState.totalResults > 0;
    },

    handleCurrentChange1(currpage) {
      this.currentPage1 = currpage;
    },
    handleCurrentChange2(currpage) {
      this.currentPage2 = currpage;
    },
  },
  computed: {
    isportalauthor() {
      return this.$props.type == "portal";
    },
    isauthordetail() {
      return this.$props.type == "author";
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

#coldata {
  /* outline: #21ff06 dotted thick; */
  display: flex;
  justify-content: center;
  width: 1900px;
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
.link {
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.linkk {
  font-size:30px;
  cursor: pointer;
  align-items: center;
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
</style>
