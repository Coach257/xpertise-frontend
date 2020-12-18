<template>
  <div id='root'>

      <div id='backpic' v-if='!show'>

        <StartPageInfo/>

        <div id='title'>
            <span style="font-weight: bold; font-size: 40px; margin-right: 10px;">Xpertise</span>  <span style="font-size: 20px;">Scholar</span>
        </div>

        <input id="searchinput" v-model='input' v-on:keyup.13="submit" @mouseover="mouseOver()" @mouseleave="mouseLeave()">
            <i class="el-icon-search" @click="submit()"></i>

      </div>

      <div v-if='!show' id='rankinglist'>
        <RankingList title='Top Paper' type='main'/>
        <RankingList title='Top Author' type='main'/>
        <RankingList title='Top Affiliation' type='main'/>
      </div>

      <SearchSection :type="'main'" :input='input' v-if='show' />
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
      console.log(sessionStorage.getItem('CurrentSearchBool'))
      console.log("好")
      if (sessionStorage.getItem('CurrentSearchBool')) {
        console.log("看看就看看")
        this.show = true
        this.input = sessionStorage.getItem('CurrentSearchInput')
        sessionStorage.setItem('CurrentSearchBool',false)
        //sessionStorage.setItem('CurrentSearchInput',"water")
        console.log("看看就看看")
        console.log(this.show)
      }
      console.log("给我看看")
      console.log(this.show);
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
          sessionStorage.setItem('CurrentSearchBool',false)
          sessionStorage.setItem('CurrentSearchInput',this.input)
          this.show = true
        }
      },
      mouseOver () {
        this.$gsap.to("#searchinput", {duration: 0.1,  boxShadow:'0px 0px 20px 10px rgb(127,127,127,0.3)'})
      },
      mouseLeave () {
        this.$gsap.to("#searchinput", {duration: 0.1,  boxShadow:'0px 0px 8px 2px rgb(50,50,50,0.1)'})
      }
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
}

#searchinput {
  /* outline: #21ff06 dotted thick; */

  border-radius: 30px;
  /* border: #cccccc solid thin; */
  border: 1px solid #f0f0f0;
  width: 500px;
  height: 36px;

  box-shadow: 0px 0px 8px 2px rgba(50,50,50,0.1);

  margin-top: 60px;
}
.el-icon-search {
  font-size: 20px;
  color: rgba(127,127,127,0.6);

  position: relative;
  top: -27px;
  left: 220px;

  cursor: pointer;
}

#backpic {
  /* outline: #21ff06 dotted thick; */

  border: #cccccc solid thin;
  border-radius: 300px;
  box-shadow: 0px 0px 50px 10px rgba(127,127,127,0.3);

  background-image: url(../assets/startBack.png);
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
  align-items: flex-start;
  justify-content: space-between;

  position: relative;
  top: -150px;
}
</style>
