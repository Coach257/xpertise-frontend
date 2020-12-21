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
  </div>
</template>

<script>
import LangAnalysis from '../common/LangAnalysis.vue'
import YearAnalysis from '../common/YearAnalysis.vue'
export default {
  props:['data'],
  components:{
      LangAnalysis,
      YearAnalysis,
  },
  data(){
      return{
          facets:{},
          langanalysis:false,
          yearanalysis:false,
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
  }

};
</script>
