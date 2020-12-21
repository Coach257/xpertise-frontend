<template>
  <div>
      <div>
      <h3>1</h3>
      <LangAnalysis v-if="langanalysis" :data="this.facets.lang"></LangAnalysis>
      </div>
      <div>
      <h3>2</h3>
      <YearAnalysis v-if="yearanalysis" :data="this.facets.year"></YearAnalysis>
      </div>
      <h3>3</h3>
      <VenueAnalysis v-if="venueanalysis" :data="this.facets.venue"></VenueAnalysis>
  </div>
</template>

<script>
import LangAnalysis from '../common/LangAnalysis.vue'
import YearAnalysis from '../common/YearAnalysis.vue'
import VenueAnalysis from '../common/VenueAnalysis.vue'
export default {
  props:['data'],
  components:{
      LangAnalysis,
      YearAnalysis,
      VenueAnalysis,
  },
  data(){
      return{
          facets:{},
          langanalysis:false,
          yearanalysis:false,
          venueanalysis:false,
      }
  },
  mounted(){
      this.facets = this.$props.data;
      if(this.facets.lang){
          this.langanalysis = true;
      }
      if(this.facets.year){
          this.yearanalysis = true;
      }
      if(this.facets.venue){
          this.venueanalysis = true;
      }
  }

};
</script>
