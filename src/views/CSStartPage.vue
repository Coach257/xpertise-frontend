<template>
  <div id='root'>

      <div id='backpic' v-if='!show'>

        <StartPageInfo style='color: white;'/>

        <div id='title'>
            <span style="font-weight: bold; font-size: 40px; margin-right: 10px;">Xpertise</span>  <span style="font-size: 20px;">Scholar</span><br>
            <span>计算机科学 Computer Science</span>
        </div>

        <input id="searchinput" v-model='input' v-on:keyup.13="submit">
            <i class="el-icon-search" @click="submit()"></i>

      </div>

      <div v-if='!show' id='rankinglist'>
      <RankingList title='Top Conference' type='cs'/>
      <RankingList title='Top Author' type='cs'/>
      <RankingList title='Top Affiliation' type='cs'/>
      </div>

      <SearchSection :type="'cs'" :input='input' v-if='show' />
  </div>
</template>

<script>
  import SearchSection from "../components/search/SearchSection.vue";
  import StartPageInfo from "../components/common/StartPageInfo.vue";
  import RankingList from "../components/rankinglist/RankingList.vue"

  export default {
    name: 'StartPage',
    props: [
    ],
    components: {
      SearchSection,
      StartPageInfo,
      RankingList
    },
    mounted() {
      // this.$gsap.set("#root", {height: document.documentElement.clientHeight})
      if(this.$route.params.type == "cs"){
         this.$gsap.set("backpic", {"background-image": "url(../assets/csBack.png)"})
      }
    },
    data () {
      return {
        input: '',
        show: false
      }
    },
    methods: {
      submit () {
        if(this.input!=''){
          this.show = true
        }
      },
    }
  }
</script>

<style scoped>
#root {
  /* outline: #21ff06 dotted thick; */

  display: flex;
  flex-direction: column;
  align-items: center;
}


#title {
  margin-top: 100px;
  color: white;
}

#searchinput {
  /* outline: #21ff06 dotted thick; */

  border-radius: 30px;
  /* border: #cccccc solid thin; */
  border: 1px solid #f0f0f0;
  width: 500px;
  height: 36px;


  margin-top: 60px;
}
.el-icon-search {
  font-size: 20px;
  color: rgb(127,127,127,0.6);

  position: relative;
  top: -27px;
  left: 220px;

  cursor: pointer;
}

#backpic {
  /* outline: #21ff06 dotted thick; */

  border: #cccccc solid thin;
  border-radius: 300px;
  box-shadow: 0px 0px 50px 10px rgb(127,127,127,0.3);

  background-image: url(../assets/csBack.png);
  background-size:100% 100%;

  height: 500px;
  width: 1300px;
  margin-top: 5%;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: hidden;
}
#rankinglist {
  /* outline: #21ff06 dotted thick; */
  width: 1200px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  position: relative;
  top: -150px;
}
</style>
