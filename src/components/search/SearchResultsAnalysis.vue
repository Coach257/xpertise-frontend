<template>
  <div>

      <SelectTitle :buttons='buttons' />

      <div id='wrapper'>

        <div v-if="show0">
        <YearAnalysis v-if="yearanalysis" :data="this.facets.year"></YearAnalysis>
        </div>

        <div v-if="show1">
        <VenueAnalysis v-if="venueanalysis" :data="this.facets.venue"></VenueAnalysis>
        </div>

        <div v-if="show2">
        <LangAnalysis v-if="langanalysis" :data="this.facets.lang"></LangAnalysis>
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
          show0: true,
          show1: false,
          show2: false,
      }
  },
  methods: {
    selected (index) {
      switch(index)
      {
          case 0:
              this.show0 = true
              this.show1 = false
              this.show2 = false
              break;
          case 1:
              this.show0 = false
              this.show1 = true
              this.show2 = false
              break;
          case 2:
              this.show0 = false
              this.show1 = false
              this.show2 = true
              break;
      }
    }
  },
  mounted(){
      this.facets = this.$props.data;
      if(this.facets.year){
          this.yearanalysis = true;
          this.buttons.push('时间分析')
      }
      if(this.facets.venue){
          this.venueanalysis = true;
          this.buttons.push('来源分析')
      }
      if(this.facets.lang){
          this.langanalysis = true;
          this.buttons.push('语言分析')
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
