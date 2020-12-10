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
@import "../node_modules/@elastic/react-search-ui-views/lib/styles/styles.css";

#app{
  width: 100vw; /* 会导致/admin/application-manage 出现多余的滚动条 */
  height: 100vh;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #191919;

}
.app_container{
  padding-top:55px;
}
</style>
