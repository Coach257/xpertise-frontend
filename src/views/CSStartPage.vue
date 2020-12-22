<template>
  <div id='root'>

    <div id='backpic' v-if='!show'>

      <StartPageInfo :type="'cs'" style='color: white;'/>

      <div id='title'>
        <span style="font-weight: bold; font-size: 40px; margin-right: 10px;">Xpertise</span> <span
        style="font-size: 20px;">Scholar</span><br>
        <span>计算机科学 Computer Science</span>
      </div>

      <input id="searchinput" v-model='input' v-on:keyup.13="submit">
      <i class="el-icon-search" @click="submit()"></i>

    </div>

    <div v-if='!show' id='rankinglist'>
      <RankingList title="Hot Paper" type="cs"/>
      <RankingList title='Top Paper' type='cs'/>
      <RankingList title='Top Author' type='cs'/>
      <RankingList title='Top Affiliation' type='cs'/>
      
    </div>


    <c-s-total-paper-chart v-if="!show" id = 'paper-chart'></c-s-total-paper-chart>

    <SearchSection :type="'cs'" :input='input' v-if='show'/>
  </div>
</template>

<script>
import SearchSection from "../components/search/SearchSection.vue";
import StartPageInfo from "../components/common/StartPageInfo.vue";
import RankingList from "../components/rankinglist/RankingList.vue"
import CSTotalPaperChart from "@/components/common/CSTotalPaperChart";

export default {
  name: 'StartPage',
  props: [],
  components: {
    CSTotalPaperChart,
    SearchSection,
    StartPageInfo,
    RankingList
  },
  mounted() {

    if (sessionStorage.getItem('CurrentSearchBool')) {
      console.log("看看就看看")
      //this.show = true
      //this.input = sessionStorage.getItem('CurrentSearchInput')
      sessionStorage.setItem('CurrentSearchBool', false)
    }
    // this.$gsap.set("#root", {height: document.documentElement.clientHeight})
    if (this.$route.params.type == "cs") {
      this.$gsap.set("backpic", {"background-image": "url(../assets/csBack.png)"})
    }
  },
  data() {
    return {
      input: '',
      show: false
    }
  },
  methods: {
    submit() {
      if (this.input != '') {
        sessionStorage.setItem('CurrentSearchBool', false)
        sessionStorage.setItem('CurrentSearchInput', this.input)
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
  color: rgba(127, 127, 127, 0.6);

  position: relative;
  top: -27px;
  left: 220px;

  cursor: pointer;
}

#backpic {
  /* outline: #21ff06 dotted thick; */

  border: #cccccc solid thin;
  border-radius: 300px;
  box-shadow: 0px 0px 50px 10px rgba(127, 127, 127, 0.3);

  background-image: url(../assets/csBack.png);
  background-size: 100% 100%;

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
  align-items: flex-start;
  justify-content: space-between;

  position: relative;
  top: -150px;
}
#paper-chart{
  position: relative;top: -115px;
  /* border: #cccccc solid thin; */
  border-radius: 30px;
  box-shadow:inset 0px 0px 10px 6px rgb(50,50,50,0.1);
  padding: 20px 40px 20px 40px;
}
</style>
