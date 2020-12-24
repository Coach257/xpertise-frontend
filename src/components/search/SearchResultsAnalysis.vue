<template>
  <div>

      <SelectTitle :buttons='buttons' />

      <div id='wrapper'>

        <div v-if="show[0]">
        <YearAnalysis v-if="yearanalysis" :data="this.facets.year"></YearAnalysis>
        </div>

        <div v-if="show[1]">
        <VenueAnalysis v-if="venueanalysis" :data="this.facets.venue"></VenueAnalysis>
        </div>

        <div v-if="show[2]">
        <LangAnalysis v-if="langanalysis" :data="this.facets.lang"></LangAnalysis>
        </div>

        <div v-if="show[3]">
          <h1>机构排行</h1>
        </div>

        <div v-if="show[4]">
          <h1>作者排行</h1>
        </div>

      </div>


  </div>
</template>

<script>
import LangAnalysis from '../common/LangAnalysis.vue'
import YearAnalysis from '../common/YearAnalysis.vue'
import VenueAnalysis from '../common/VenueAnalysis.vue'
import SelectTitle from '../common/SelectTitle.vue'

export default {
  props:['data'],
  components:{
      LangAnalysis,
      YearAnalysis,
      VenueAnalysis,
      SelectTitle
  },
  data(){
      return{
          buttons: [],
          facets:{},
          langanalysis:false,
          yearanalysis:false,
          venueanalysis:false,
          show: {0:true, 1:false, 2:false, 3:false, 4:false},
          disable: {0:true, 1:true, 2:true, 3:true, 4:true},
      }
  },
  methods: {
    selected (index) {

       let i
       let tem = -1;//记录现在是第几个有效的

       for (i=0; i<5; i++) {

        if (this.disable[i]==false){
          tem++;
          if (tem == index) {
            this.show[i] = true;
          }
          else this.show[i]=false;

        } else {
          continue;
        }

       }
    }

  },
  mounted(){
      this.facets = this.$props.data;
      if(this.facets.year){
          this.yearanalysis = true;
          this.buttons.push('时间分析')
          this.disable[0] = false;
      }
      if(this.facets.venue){
          this.venueanalysis = true;
          this.buttons.push('来源分析')
          this.disable[1] = false;
      }
      if(this.facets.lang){
          this.langanalysis = true;
          this.buttons.push('语言分析')
          this.disable[2] = false;
      }
      if(true){
          this.buttons.push('机构排行')
          this.disable[3] = false;
      }
      if(true){
          this.buttons.push('作者排行')
          this.disable[4] = false;
      }

  }

};
</script>

<style scoped>
#wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 20px;
}
</style>
