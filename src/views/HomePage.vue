<template>
    <div>
      <h1>HomePage</h1>
      <div id="app">
        <NavBar/>
        <SearchSection />
      </div>
    </div>
</template>

<script>
import NavBar from '../components/common/NavBar.vue'
import SearchSection from "../components/search/SearchSection.vue";

export default {
  name: 'HomePage',
  components:{
    NavBar,
    SearchSection
  },
  provide () {
    return {
      sleep: this.sleep
    }
  },
  methods: {
    sleep: function (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }
  }
}
</script>

<style>
@import "../../node_modules/@elastic/react-search-ui-views/lib/styles/styles.css";

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header {
  text-align: center;
}
</style>
