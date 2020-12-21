<template>
  <div>
      <h3>分析</h3>
      <lang-analysis v-if="langanalysis" :data="this.facets.lang"></lang-analysis>
  </div>
</template>

<script>
import LangAnalysis from '../common/LangAnalysis.vue'
export default {
  props:['data'],
  components:{
      LangAnalysis,
  },
  data(){
      return{
          facets:{},
          langanalysis:false,
      }
  },
  mounted(){
      this.facets = this.$props.data;
      if(this.facets.lang){
          this.langanalysis = true;
      }
  }

};
</script>
