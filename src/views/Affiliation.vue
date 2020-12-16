<template>
  <div id='root'>

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


    <h2>以下是发表论文列表</h2>
    <div>
      <router-link
        v-for="(pub, index) in this.affiliation.pubs"
        :key = pub.id
        :to="'/detail/cs/' + pub.id">
        {{ pub.title }} <div>  </div>
      </router-link>
    </div>

    <h2> 以下是作者列表 </h2>
    <div>
      <router-link
        v-for="(author, index) in this.affiliation.authors"
        :key = author.id
        :to="'/author/' + author.id">
        {{ author.name }} <div>  </div>
      </router-link>
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
    };
  },
  mounted() {
    console.log(this.$route.params.affId);
    driver = new SearchDriver(csaffiliationconfig);
    driver.addFilter("id", this.$route.params.affId, "any");
    driver.subscribeToStateChanges((state) => {
      this.searchState = state;
    })
  },
  methods: {
    thereAreResults() {
      return this.searchState.totalResults > 0;
    }

  },
  watch: {
    searchState(newsearchState) {
      if(this.thereAreResults()) {
        console.log(newsearchState);
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

  position: relative;
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

}
#affiliationInfo {
  display: flex;
  justify-content: space-between;

  color: #666666;
  font-weight: 500;

  width: 160px;
  margin-top: 20px;
}
</style>
