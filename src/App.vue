<template>
  <div id="app">
    <NavBar/>
    <div class="app_container"><router-view/></div>
    <!-- <WishlistDrawer/> -->
    <Footer/>
  </div>
</template>

<script>
import NavBar from '../src/components/common/NavBar.vue'
import WishlistDrawer from './components/wishlist/WishlistDrawer.vue'
import Footer from './components/common/Footer.vue'
 export default{
  name: 'App',
  props: [],
  components:{NavBar, WishlistDrawer,Footer},
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
  width: 98vw;
  height: 98vh;

  font-family: Avenir, apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #191919;

}
.app_container{
  padding-top:55px;
}
</style>
