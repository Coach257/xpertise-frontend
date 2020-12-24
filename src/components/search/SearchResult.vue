<template>
  <article class="search-result" @click="routerPush()">

  <div class="search-result__heading" v-if="ispaper">
    <i class="el-icon-document" attr='el-icon'></i>
    <div id='docTitle'>
      {{ this.commonApi.titleCase(this.paper.title) }}
    </div>
  </div>
  <div class="search-result__heading" v-if="isauthor">
    <i class="el-icon-s-custom" attr='el-icon'></i>
    <div id='docTitle'>
      {{ this.commonApi.titleCase(this.author.name) }}
    </div>
  </div>
   <div class="search-result__heading" v-if="isaffiliation">
    <i class="el-icon-office-building" attr='el-icon'></i>
    <div id='docTitle'>
      {{ this.commonApi.titleCase(this.affiliation.name) }}
    </div>
  </div>

   <div class="search-result__subhead" v-if="ispaper">
      <div id="calender">
         <svg class="icon" width="30px" height="30px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M507.05615234 833.35009765h-308.99047849c-27.19116212 0-49.43847655-7.41577148-66.74194338-24.71923829-7.41577148-7.41577148-9.8876953-17.30346679-9.8876953-27.19116209v-469.66552735c0-27.19116212 29.66308594-49.43847655 64.27001952-51.91040039h64.27001953c9.8876953 0 14.83154297-2.47192383 14.83154297-9.88769531v-19.77539063c4.94384766-19.77539065 19.77539065-29.66308594 44.4946289-29.66308593 19.77539065 0 34.6069336 12.35961914 37.07885743 32.13500976v2.47192383c2.47192383 27.19116212 2.47192383 27.19116212 34.60693359 27.19116212h269.43969727c12.35961914 0 17.30346679-2.47192383 17.30346679-12.35961915v-17.3034668c2.47192383-19.77539065 19.77539065-29.66308594 42.02270508-29.66308594 22.24731445 0 37.07885742 12.35961914 39.55078125 29.66308594 0 9.8876953-4.94384766 22.24731445 2.47192383 27.19116211 9.8876953 4.94384766 24.71923828 2.47192383 37.07885742 2.47192384h37.07885743c37.07885742 2.47192383 66.74194336 24.71923828 66.74194335 54.38232421v464.72167969c0 32.13500977-32.13500977 54.38232422-76.62963867 56.85424804-98.87695313-4.94384766-205.16967773-4.94384766-308.99047852-4.94384766z m2.47192383-422.6989746h-308.99047851c-12.35961914 0-17.30346679 2.47192383-17.30346681 12.35961913v341.12548829c0 14.83154297 7.41577148 17.30346679 22.24731446 17.3034668h608.09326172c22.24731445 0 22.24731445 0 22.24731445-17.3034668V425.48266602c0-12.35961914-2.47192383-14.83154297-17.30346679-14.83154297h-308.99047852z" fill="#666666" /><path d="M316.71801758 707.28198242H277.16723633c-17.30346679 0-24.71923828-7.41577148-27.19116211-19.77539062v-42.02270508c0-12.35961914 9.8876953-19.77539065 24.71923828-19.77539063h84.04541016c17.30346679 0 24.71923828 7.41577148 24.71923828 22.24731446v39.55078125c0 12.35961914-7.41577148 19.77539065-24.71923828 19.77539062h-42.02270508z m192.81005859 0h-39.55078125c-17.30346679 0-27.19116212-7.41577148-27.19116211-19.77539062V647.95581055c0-14.83154297 7.41577148-19.77539065 24.71923829-22.24731446H549.07885742c14.83154297 0 24.71923828 7.41577148 24.71923828 19.77539063v42.02270508c0 12.35961914-9.8876953 19.77539065-24.71923828 19.77539062h-39.55078125z m192.8100586-81.57348633h42.02270507c14.83154297 0 24.71923828 7.41577148 22.24731446 19.77539063v44.4946289c0 12.35961914-9.8876953 19.77539065-24.71923828 19.77539063H657.84350586c-14.83154297 0-24.71923828-7.41577148-24.71923828-19.77539063V647.95581055c0-12.35961914 9.8876953-19.77539065 24.71923828-19.77539064 14.83154297-4.94384766 29.66308594-2.47192383 44.49462891-2.47192382z m-192.8100586-59.32617187h-42.02270507c-17.30346679 0-24.71923828-4.94384766-24.71923829-19.77539062v-44.49462892c0-12.35961914 7.41577148-17.30346679 22.24731446-17.3034668h86.51733398c14.83154297 0 22.24731445 7.41577148 24.71923828 19.77539064v42.02270508c0 12.35961914-7.41577148 19.77539065-24.71923828 19.77539062h-42.02270508zM316.71801758 484.80883788h42.02270508c14.83154297 0 24.71923828 7.41577148 24.71923828 17.30346682v44.4946289c0 12.35961914-7.41577148 17.30346679-22.24731447 17.30346679h-86.51733397c-14.83154297 0-22.24731445-4.94384766-22.24731444-17.30346679V499.64038086c0-12.35961914 9.8876953-17.30346679 24.71923827-17.3034668 12.35961914 2.47192383 24.71923828 2.47192383 39.55078125 2.47192382z m383.14819337 81.57348634h-42.02270509c-14.83154297 0-24.71923828-7.41577148-24.71923828-19.77539064v-44.49462888c0-12.35961914 7.41577148-17.30346679 22.24731445-17.30346682h86.51733399c14.83154297 0 22.24731445 7.41577148 22.24731445 17.30346682v44.49462888c0 9.8876953-7.41577148 17.30346679-22.24731445 17.30346681-12.35961914 2.47192383-27.19116212 2.47192383-42.02270507 2.47192383z" fill="#666666" /></svg>
         <div class="subheadnum">
          {{this.paper.year}}年
        </div>
      </div>
      <div id="citation">
        <svg class="icon" width="21px" height="21px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M321.40024 143.1c22.4-17 53-19.9 78.4-7.4s40.9 38 39.8 65.4-18.8 51.6-45.1 62.1c-86.6 49.8-156 123.1-199.4 210.7h24.1c121 0 219.1 94.3 219.1 210.7s-98.1 210.7-219.1 210.7S0.00024 801 0.00024 684.6c-0.2-222 123.6-427.1 321.4-541.5z m584.3 0.7c22.4-17 53-19.9 78.4-7.4s40.9 38 39.8 65.4-18.8 51.6-45.1 62.1c-86.6 49.8-156 123.1-199.4 210.7h24.1c121 0 219.1 94.3 219.1 210.7S924.50024 896 803.50024 896s-219.1-94.3-219.1-210.7c0-221.7 123.8-427.2 321.3-541.5z" fill="#666666" /></svg>
        <div class="subheadnum">
          {{ this.paper.n_citation }}次被引
        </div>
      </div>
   </div>
   <div class="search-result__subhead" v-if="isauthor">
      <div id="calender">
         <svg class="icon" width="21px" height="21px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M734.634667 72.448C717.824 55.978667 685.226667 42.666667 661.674667 42.666667H204.8C162.389333 42.666667 128 79.189333 128 124.330667v775.338666C128 944.768 162.474667 981.333333 204.8 981.333333h614.4c42.410667 0 76.8-36.693333 76.8-81.578666V273.493333c0-23.68-13.781333-56.405333-30.378667-72.661333l-130.986666-128.426667zM341.333333 298.666667h341.333334a42.666667 42.666667 0 0 1 0 85.333333H341.333333a42.666667 42.666667 0 1 1 0-85.333333z m0 170.666666h170.666667a42.666667 42.666667 0 0 1 0 85.333334H341.333333a42.666667 42.666667 0 0 1 0-85.333334z" fill="#666666"/></svg>
         <div class="subheadnum">
          {{this.author.n_pubs}}篇文献
        </div>
      </div>
      <div id="citation">
        <svg class="icon" width="21px" height="21px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M321.40024 143.1c22.4-17 53-19.9 78.4-7.4s40.9 38 39.8 65.4-18.8 51.6-45.1 62.1c-86.6 49.8-156 123.1-199.4 210.7h24.1c121 0 219.1 94.3 219.1 210.7s-98.1 210.7-219.1 210.7S0.00024 801 0.00024 684.6c-0.2-222 123.6-427.1 321.4-541.5z m584.3 0.7c22.4-17 53-19.9 78.4-7.4s40.9 38 39.8 65.4-18.8 51.6-45.1 62.1c-86.6 49.8-156 123.1-199.4 210.7h24.1c121 0 219.1 94.3 219.1 210.7S924.50024 896 803.50024 896s-219.1-94.3-219.1-210.7c0-221.7 123.8-427.2 321.3-541.5z" fill="#666666" /></svg>
        <div class="subheadnum">
          {{ this.author.n_citation }}次被引
        </div>
      </div>
   </div>
   <div class="search-result__subhead" v-if="isaffiliation">
      <div id="calender">
         <svg class="icon" width="21px" height="21px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M734.634667 72.448C717.824 55.978667 685.226667 42.666667 661.674667 42.666667H204.8C162.389333 42.666667 128 79.189333 128 124.330667v775.338666C128 944.768 162.474667 981.333333 204.8 981.333333h614.4c42.410667 0 76.8-36.693333 76.8-81.578666V273.493333c0-23.68-13.781333-56.405333-30.378667-72.661333l-130.986666-128.426667zM341.333333 298.666667h341.333334a42.666667 42.666667 0 0 1 0 85.333333H341.333333a42.666667 42.666667 0 1 1 0-85.333333z m0 170.666666h170.666667a42.666667 42.666667 0 0 1 0 85.333334H341.333333a42.666667 42.666667 0 0 1 0-85.333334z" fill="#666666"/></svg>
         <div class="subheadnum">
          {{this.affiliation.n_pubs}}篇文献
        </div>
      </div>
      <div id="citation">
        <svg class="icon" width="21px" height="21px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M321.40024 143.1c22.4-17 53-19.9 78.4-7.4s40.9 38 39.8 65.4-18.8 51.6-45.1 62.1c-86.6 49.8-156 123.1-199.4 210.7h24.1c121 0 219.1 94.3 219.1 210.7s-98.1 210.7-219.1 210.7S0.00024 801 0.00024 684.6c-0.2-222 123.6-427.1 321.4-541.5z m584.3 0.7c22.4-17 53-19.9 78.4-7.4s40.9 38 39.8 65.4-18.8 51.6-45.1 62.1c-86.6 49.8-156 123.1-199.4 210.7h24.1c121 0 219.1 94.3 219.1 210.7S924.50024 896 803.50024 896s-219.1-94.3-219.1-210.7c0-221.7 123.8-427.2 321.3-541.5z" fill="#666666" /></svg>
        <div class="subheadnum">
          {{ this.affiliation.n_citation }}次被引
        </div>
      </div>
   </div>

  <div class="search-result__authors" v-if="ispaper">
    <div class="search-result__author" style="font-weight: 600;">作者</div>
    <div class="search-result__author" v-for="(author, i) in this.paper.authors" :key='i'>{{author}}</div>
  </div>
  <div class="search-result__authors" v-if="isauthor">
    <div class="search-result__author" style="font-weight: 600;">机构</div>
    <div class="search-result__author" v-for="(org, i) in this.author.orgs" :key='i'>{{org}}</div>
  </div>

  <div class="search-result__authors" v-if="isaffiliation">
    <div class="search-result__author" style="font-weight: 600;">学者</div>
    <div class="search-result__author" v-for="(author, i) in this.affiliation.authors" :key='i'>{{author}}</div>
  </div>

  <div class="search-result__venue" v-if="ispaper">
    <span id='venuetag'>来源</span>
    {{this.paper.venue}}
  </div>

  </article>

</template>

<script>
import commonApi from "../../commonApi"
export default {
  props: {
    result: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    option:{
      type: String,
      required:true
    }
  },
  data () {
    return {
      paper:{
        id: 0,
        title:"",
        authors: [],
        authorNum: 0,
        venue: "",
        n_citation:0,
        year:0,
      },
      author:{
        id: 0,
        name:"",
        n_pubs:0,
        pubs:[],
        orgs:[],
        n_citation:0,
        pubsnum:0,
      },
      affiliation:{
        id: 0,
        name:"",
        authors:[],
        n_pubs:0,
        n_citation:0,
        pubs:[],
        authorNum:0,
        pubsnum:0,
      }

    }
  },
  computed:{
    ispaper(){
      return this.$props.option == 'paper'
    },
    isauthor(){
      return this.$props.option == 'author'
    },
    isaffiliation(){
      return this.$props.option == 'affiliation'
    }
  },
  methods: {

    addToAuthors (value, index, array) {
      var limit = 10
      if (this.paper.authorNum == limit) {
        this.paper.authors.push('...');
        this.paper.authorNum++;
        return
      } else if (this.paper.authorNum > limit) {
        return
      } else {
        this.paper.authors.push(JSON.parse(value).name);
        //this.paper.authors[authorNum].name=this.commonApi.titleCase(this.paper.authors[authorNum].name)
        this.paper.authorNum++;
      }
    },
    addToAffiliationAuthors (value, index, array) {
      var limit = 10
      if (this.affiliation.authorNum == limit) {
        this.affiliation.authors.push('...');
        this.affiliation.authorNum++;
        return
      } else if (this.affiliation.authorNum > limit) {
        return
      } else {
        this.affiliation.authors.push(JSON.parse(value).name);
        //this.affiliation.authors[authorNum].name=this.commonApi.titleCase(this.affiliation.authors[authorNum].name)
        this.affiliation.authorNum++;
      }
    },
    addToAuthorPubs (value, index, array) {
      var limit = 10
      if (this.author.pubsnum == limit){
        this.author.pubs.push('...');
        //this.author.pubs[pubsnum].title=this.commonApi.titleCase(this.author.pubs[pubsnum].title)
        this.author.pubsnum ++;
        return ;
      }
      else if(this.author.pubsnum > limit){
        return ;
      }
      else {
        this.author.pubs.push(JSON.parse(value).title);
        //this.author.pubs[pubsnum].title=this.commonApi.titleCase(this.author.pubs[pubsnum].title)
        this.author.pubsnum ++;
      }
    },
    addToOrgs(value, index, array){
      if(this.$props.type=='main'){
        this.author.orgs.push(value);
      }
      else {
        this.author.orgs.push(JSON.parse(value).name);
      }
    },
    addToAffiliationPubs (value, index, array) {
      var limit = 10
      if (this.affiliation.pubsnum == limit) {
        this.affiliation.pubs.push('...');
        this.affiliation.pubsnum++;
        return
      } else if (this.affiliation.pubsnum > limit) {
        return
      } else {
        this.affiliation.pubs.push(JSON.parse(value).title);
        //this.affiliation.pubs[pubsnum].title=this.commonApi.titleCase(this.affiliation.pubs[pubsnum].title)
        this.affiliation.pubsnum++;
      }
    },
    routerPush () {
      //console.log(" 至诚不悖否?")
      if (this.$props.option == 'paper') {
        let routeData = this.$router.resolve({ path: '/detail/'+this.type+'/'+this.paper.id, query: {  id: 1 } });
        window.open(routeData.href, '_blank');
        //console.log(" 言行不耻否?")
        //this.$router.push('/detail/'+this.type+'/'+this.paper.id)
      }else if(this.$props.option == 'author') {
        let routeData = this.$router.resolve({ path: '/author/'+this.type+'/'+this.author.id, query: {  id: 1 } });
        window.open(routeData.href, '_blank');
        //console.log(" 气力无缺否?")
        //this.$router.push('/author/'+this.type+'/'+this.author.id)
      }else {
        let routeData = this.$router.resolve({ path: '/affiliation/'+this.affiliation.id, query: {  id: 1 } });
        window.open(routeData.href, '_blank');
        //console.log(" 努力无憾否?")
        //this.$router.push('/affiliation/'+this.affiliation.id)
      }
      //console.log(" 亘勿懈怠否?")
    }
  },
  mounted() {
    if(this.$props.option == 'paper'){
      if(this.result.venue && this.result.venue.raw)this.paper.venue = JSON.parse(this.result.venue.raw).raw;
      if(this.result.title && this.result.title.raw) this.paper.title = this.result.title.raw;
      if(this.result.n_citation && this.result.n_citation.raw)this.paper.n_citation = this.result.n_citation.raw;
      if(this.result.year&&this.result.year.raw)this.paper.year = this.result.year.raw;
      if(this.result.id && this.result.id.raw) this.paper.id = this.result.id.raw;
      if(this.result.authors && this.result.authors.raw)this.result.authors.raw.forEach(this.addToAuthors)
    }
    else if(this.$props.option == 'author'){
      
      if(this.result.name && this.result.name.raw) this.author.name = this.result.name.raw;
      if(this.result.n_pubs && this.result.n_pubs.raw) this.author.n_pubs = this.result.n_pubs.raw;
      // this.result.pubs.raw.forEach(this.addToAuthorPubs); mainauhtor数据没有文献标题
      if(this.result.orgs && this.result.orgs.raw){//没有机构，为null值
        this.result.orgs.raw.forEach(this.addToOrgs);
      }
      if(this.result.n_citation && this.result.n_citation.raw) this.author.n_citation = this.result.n_citation.raw;
      if(this.result.id && this.result.id.raw) this.author.id = this.result.id.raw;
    }
    else{
      if(this.result.name && this.result.name.raw) this.affiliation.name = this.result.name.raw;
      if(this.result.n_pubs && this.result.n_pubs.raw) this.affiliation.n_pubs = this.result.n_pubs.raw;
      if(this.result.n_citation && this.result.n_citation.raw) this.affiliation.n_citation = this.result.n_citation.raw;
      if(this.result.authors && this.result.authors.raw) this.result.authors.raw.forEach(this.addToAffiliationAuthors);
      if(this.result.pubs && this.result.pubs.raw) this.result.pubs.raw.forEach(this.addToAffiliationPubs);
      if(this.result.id && this.result.id.raw) this.affiliation.id = this.result.id.raw;
    }
  },
};
</script>

<style scoped>
.search-result {
  /* outline: #21ff06 dotted thick; */
  cursor: pointer;

  border: 1px solid #e8e6e9;
  border-radius: 30px;


  align-items: center;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.search-result__heading {
  display: flex;
  align-items: flex-start;
}
[attr='el-icon'] {
  font-size: 30px;
  font-weight: 500;
  margin-right: 15px;

  position: relative;
  top: 3px;
}
#docTitle {
  font-size: 18px;
  font-weight: bolder;
}
.search-result__subhead {
  /* width: 250px; */
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 12px;
}
#calender {
  display: flex;
  align-items: center;
}
#citation {
  display: flex;
  align-items: center;
  margin-left: 30px;
}
.subheadnum {
  margin-left: 5px;
  font-size: 15px;
  font-weight: 550;
  color: #666666;
}
.search-result__authors {
  /* outline: #21ff06 dotted thick; */

  border-radius: 20px;
  box-shadow: 0px 0px 10px 5px rgb(127,127,127,0.12);
  padding: 15px;

  width: 400px;
  margin-top: 20px;

  display: flex;
  flex-wrap: wrap;

}
.search-result__author {
  border-radius: 10px;
  background-color: #26BEB8;
  color: white;

  font-size: 14px;
  font-weight: 500;

  padding: 2px 8px 2px 8px;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
  margin-top: 3px;
}
.search-result__venue {

  width: 380px;
  background-color: white;

  padding: 2px 8px 2px 8px;
  margin-top: 20px;

}
#venuetag{
  border-radius: 10px;
  background-color: #dace0a;
  color: white;
  padding: 2px 8px 2px 8px;
  font-size: 14px;
  font-weight: 500;
}
</style>
