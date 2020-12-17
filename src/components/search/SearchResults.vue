<template>
  <ul class="sui-results-container search-section__search-results">
    <li
      v-for="result in results"
      :key="result.id.raw"
      class="search-section__search-result"
    >
      <SearchResult 
        :type="type"
        :option="option" 
        :result="result" />
    </li>
  </ul>
</template>

<script>
import SearchResult from "./SearchResult";

export default {
  components: {
    SearchResult
  },
  props: {
    results: {
      type: Array,
      required: true
    },
    type:{
      type:String,
      required:true
    },
    option:{
      type:String,
      required:true
    }
  },
  mounted(){
  }
};
</script>

<style>
.search-section__search-results {
  display: flex;
  flex-wrap: wrap;
}

.search-section__search-result {
  width: 48%;
  margin: 1%;
  background: white;
}
</style>
