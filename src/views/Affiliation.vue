<template>
  <div id='root'>

    <div id='trigger'> </div>
    <div style="position: fixed; top: 70px;">
    <div id='affiliationHeader'>

    <svg id='affsvg' class="icon" width="35px" height="35px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M969.176313 950.856281l3.364561-580.715848a88.100288 88.100288 0 0 0-89.745997-86.19858h-126.756164v-197.485079a84.552871 84.552871 0 0 0-26.258201-61.403232A91.391706 91.391706 0 0 0 666.292716 0.002194H141.274975a91.391706 91.391706 0 0 0-63.268368 25.051348 84.845442 84.845442 0 0 0-24.978206 61.147232V952.319133h-14.482239A37.778164 37.778164 0 0 0 0.036571 988.159018c0.365713 9.508541 4.388557 18.505083 11.263964 25.051348 7.314262 6.98512 17.115374 10.861679 27.245627 10.788537h948.001524C1007.210477 1023.998903 1024.03328 1007.1761 1024.03328 986.403595c0-20.772505-16.822803-37.595308-37.485594-37.595308L969.176313 950.856281zM311.039 421.523125h196.753654c20.699362 0 37.485594 16.822803 37.485593 37.595308 0 20.772505-16.786232 37.595308-37.485593 37.595308H311.258428a38.76559 38.76559 0 0 1-33.75532-20.553077 35.657028 35.657028 0 0 1 0-36.351883c7.204548-11.556534 19.894793-18.505083 33.499321-18.285656z m196.753654 345.086891H311.258428c-20.735933 0-37.522165-16.822803-37.522165-37.595308 0-20.735933 16.822803-37.558736 37.522165-37.558736h196.753654c13.67767-0.329142 26.5142 6.619407 33.718748 18.285655 7.423976 11.812533 7.314262 26.879914-0.219428 38.582733a38.729018 38.729018 0 0 1-33.75532 18.285656z" fill="#666666"/></svg>

      <div id='affiliationName'>
        <div>{{ this.affiliation.name }}</div>
      </div>

      <div id='affiliationInfo'>

      <div style="display: flex;">
      <svg class="icon" width="21px" height="21px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M734.634667 72.448C717.824 55.978667 685.226667 42.666667 661.674667 42.666667H204.8C162.389333 42.666667 128 79.189333 128 124.330667v775.338666C128 944.768 162.474667 981.333333 204.8 981.333333h614.4c42.410667 0 76.8-36.693333 76.8-81.578666V273.493333c0-23.68-13.781333-56.405333-30.378667-72.661333l-130.986666-128.426667zM341.333333 298.666667h341.333334a42.666667 42.666667 0 0 1 0 85.333333H341.333333a42.666667 42.666667 0 1 1 0-85.333333z m0 170.666666h170.666667a42.666667 42.666667 0 0 1 0 85.333334H341.333333a42.666667 42.666667 0 0 1 0-85.333334z" fill="#666666"/></svg>
      <div style="margin-left: 5px;">{{ this.affiliation.n_pubs }}篇</div>
      </div>

      <div style="display: flex;">
      <svg class="icon" width="21px" height="21px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M321.40024 143.1c22.4-17 53-19.9 78.4-7.4s40.9 38 39.8 65.4-18.8 51.6-45.1 62.1c-86.6 49.8-156 123.1-199.4 210.7h24.1c121 0 219.1 94.3 219.1 210.7s-98.1 210.7-219.1 210.7S0.00024 801 0.00024 684.6c-0.2-222 123.6-427.1 321.4-541.5z m584.3 0.7c22.4-17 53-19.9 78.4-7.4s40.9 38 39.8 65.4-18.8 51.6-45.1 62.1c-86.6 49.8-156 123.1-199.4 210.7h24.1c121 0 219.1 94.3 219.1 210.7S924.50024 896 803.50024 896s-219.1-94.3-219.1-210.7c0-221.7 123.8-427.2 321.3-541.5z" fill="#666666" /></svg>
      <div style="margin-left: 5px;">{{ this.affiliation.n_citation }}次</div>
      </div>

      </div>
    </div>
    </div>


    <div style="height: 200px;"></div>


    <div id='affdata'>

      <div id='affpapers' class="datawrapper">

        <div class="datatitle">
        <h2>论文列表</h2>
        <svg class="icon" width="27px" height="27px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M734.634667 72.448C717.824 55.978667 685.226667 42.666667 661.674667 42.666667H204.8C162.389333 42.666667 128 79.189333 128 124.330667v775.338666C128 944.768 162.474667 981.333333 204.8 981.333333h614.4c42.410667 0 76.8-36.693333 76.8-81.578666V273.493333c0-23.68-13.781333-56.405333-30.378667-72.661333l-130.986666-128.426667zM341.333333 298.666667h341.333334a42.666667 42.666667 0 0 1 0 85.333333H341.333333a42.666667 42.666667 0 1 1 0-85.333333z m0 170.666666h170.666667a42.666667 42.666667 0 0 1 0 85.333334H341.333333a42.666667 42.666667 0 0 1 0-85.333334z" fill="#666666"/></svg>
        </div>

        <el-divider></el-divider>

        <div>
          <router-link
            class="link"
            v-for="(pub, index) in (this.affiliation.pubs).slice((this.currentPage1-1)*this.eachPage, this.currentPage1*this.eachPage)"
            :key = pub.id
            :to="'/detail/cs/' + pub.id"
            tag="a"
            >


              <div id='paperindex'>{{index+1+(currentPage1-1)*eachPage}}</div>
              <div style="width: 700px;"> {{ pub.title }} </div>


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


      <div id='affauthors' class="datawrapper">

        <div class="datatitle">
        <h2> 作者列表 </h2>
        <svg class="icon" width="27px" height="27px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M179.224976 417.39239v2.397659c2.397659 0 2.397659 0 2.397658 2.397658l4.795317 4.795317c33.467317 33.467317 71.829854 50.250927 117.285464 50.250927s83.818146-16.78361 114.887805-50.250927c2.397659 0 2.397659 0 4.795317-2.397658l2.397658-2.397659c0-2.397659 0-2.397659 2.397659-2.397658 7.192976-9.590634 16.78361-21.578927 23.976585-33.467317v-2.397659c11.988293-21.479024 16.78361-45.45561 16.78361-71.829853 0-45.45561-16.78361-86.215805-47.853269-117.285464-33.467317-33.467317-71.829854-47.853268-117.285463-47.853268s-83.818146 16.78361-114.887805 47.853268h-2.397658c-31.069659 33.467317-47.853268 71.829854-47.853269 117.285464 0 26.374244 7.093073 50.250927 19.081366 74.227512 4.795317 9.490732 11.988293 21.479024 21.479025 31.069658z m287.219512 45.555512c50.350829 0 76.625171 23.976585 79.122732 74.227513v265.740487c-2.397659 19.081366-4.795317 33.467317-11.988293 45.45561-11.988293 16.78361-28.771902 26.374244-55.046244 28.771903H143.36c-31.069659 0-55.046244-7.093073-66.934634-28.771903-7.093073-11.988293-11.988293-26.374244-11.988293-45.45561v-265.740487c2.397659-50.250927 28.771902-74.227512 78.922927-74.227513h4.795317l2.397659 2.397659c43.057951 40.760195 93.308878 62.23922 153.150439 64.636878 59.841561-2.397659 112.590049-23.976585 153.150439-64.636878l2.397658-2.397659h7.192976z m146.057366 55.046244c28.771902 31.069659 64.636878 45.45561 105.29717 45.45561s76.625171-14.385951 105.297171-45.45561l2.397659-2.397658 2.397658-2.397659c0-2.397659 0-2.397659 2.397659-2.397658 7.192976-9.590634 14.385951-19.081366 21.479024-28.771903v-2.397658c9.590634-19.081366 14.385951-40.760195 14.385951-64.636878 0-40.760195-14.385951-76.625171-43.057951-105.297171-28.771902-28.771902-64.636878-43.057951-105.297171-43.057951s-74.227512 14.385951-105.29717 43.057951c-28.771902 28.771902-43.057951 64.636878-43.057952 105.297171 0 9.590634 2.397659 19.081366 4.795318 28.771902 16.78361 16.78361 28.771902 38.362537 33.467317 69.432195l4.795317 4.795317z m268.138146 38.262634c50.250927-2.397659 76.625171 23.976585 78.922927 71.829854v174.729366c0 19.081366-4.795317 33.467317-11.988293 45.45561-11.988293 16.78361-28.771902 26.374244-52.748488 28.771902H598.016V584.92878c33.467317 23.976585 74.227512 35.864976 119.683122 35.864976 62.23922 0 112.590049-21.479024 155.548098-64.636878l7.39278 0.099902z" fill="#666666"/></svg>
        </div>


        <el-divider></el-divider>

        <div>
          <router-link
            class="link"
            v-for="(author, index) in (this.affiliation.authors).slice((this.currentPage2-1)*this.eachPage, this.currentPage2*this.eachPage)"
            :key = author.id
            :to="'/author/' + author.id"
            tag="a"
            >

            <div id='authorindex'>{{index+1+(currentPage2-1)*eachPage}}</div>
            <div style="width: 200px;"> {{ author.name }} </div>

          </router-link>
        </div>

        <center style="margin-top: 30px; margin-bottom: 30px;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total='total2'
          :page-size='eachPage'
          @current-change='handleCurrentChange2'
          >
        </el-pagination>
        </center>


      </div>

    </div>


  </div>
</template>

<script>
import { SearchDriver } from "@elastic/search-ui"
import {
  mainpaperconfig,
  mainauthorconfig,
  cspaperconfig,
  csauthorconfig,
  csaffiliationconfig,
} from "../searchConfig";
var driver = null;
export default {
  name: "Affiliation",
  data() {
    return {
      affiliation: {
        authors: [],
        pubs: [],
        n_citation: 1,
        n_pubs: 1,
        name: "NUS",
      },
      contendLoaded: false,
      searchState: {},
      currentPage1: 1,
      currentPage2: 1,
      eachPage: 50,
      total1: 0,
      total2: 0
    };
  },
  mounted() {
    // console.log(this.$route.params.affId);
    driver = new SearchDriver(csaffiliationconfig);
    driver.addFilter("id", this.$route.params.affId, "any");
    driver.subscribeToStateChanges((state) => {
      this.searchState = state;
    })
    this.initAnimation()
  },
  methods: {
    thereAreResults() {
      return this.searchState.totalResults > 0;
    },
    initAnimation () {
      this.$gsap.to('#affiliationHeader', {duration: 1, height: '80px' , borderRadius: '50px', scrollTrigger: {
        trigger: '#affiliationHeader',
        start: 'top top',
        end: '+=200px',
        scrub: 0.7,
      }})
      this.$gsap.to('#affiliationInfo', {duration: 1, opacity: 0, scrollTrigger: {
        trigger: '#affiliationHeader',
        start: 'top top',
        end: '+=200px',
        scrub: 0.7,
      }})
      this.$gsap.to('#affiliationName', {duration: 1, top: '20px', color: "#7f7f7f", fontSize: '23px', scrollTrigger: {
        trigger: '#affiliationHeader',
        start: 'top top',
        end: '+=200px',
        scrub: 0.7,
      }})
    },
    handleCurrentChange1 (currpage) {
      this.currentPage1 = currpage
    },
    handleCurrentChange2 (currpage) {
      this.currentPage2 = currpage
    }
  },
  watch: {
    searchState(newsearchState) {
      if(this.thereAreResults()) {
        // console.log(newsearchState);
        var results = newsearchState.results[0];
        var raw;
        if(results.name)
          this.affiliation.name = results.name.raw;
        if(results.authors) {
          raw = results.authors.raw;
          for(let i = 0; i < raw.length; i++)
            this.affiliation.authors.push(JSON.parse(raw[i]));
        }
        if(results.n_citation)
          this.affiliation.n_citation = results.n_citation.raw;
        if(results.n_pubs)
          this.affiliation.n_pubs = results.n_pubs.raw;
        if(results.pubs) {
          raw = results.pubs.raw;
          for(let i = 0; i < raw.length; i++)
            this.affiliation.pubs.push(JSON.parse(raw[i]));
        }
        this.contendLoaded = true;
        this.total1 = this.affiliation.pubs.length
        this.total2 = this.affiliation.authors.length
      }
    }
  },
  computed: {
  },
}
</script>

<style scoped>
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
  opacity: 10%;
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
  color:#666666;
}
a:hover {
  color:#1292fd;
  font-weight: bold;
}
</style>
