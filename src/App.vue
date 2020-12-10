<template>
  <div id="app">
    <NavBar/>
    <div class="app_container"><router-view/></div>
  </div>
</template>

<script>
import NavBar from '../src/components/common/NavBar.vue'
 export default{
  name: 'App',
  props: [],
  components:{NavBar},
  mounted() {

  },
  data () {
    return {

    }
  },
  methods: {
  }
 }

</script>

<style scoped>
#app{
  width: 100vw;
  height: 100vh;
}
.app_container{
  padding-top:55px;
}
@import "../node_modules/@elastic/react-search-ui-views/lib/styles/styles.css";

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
