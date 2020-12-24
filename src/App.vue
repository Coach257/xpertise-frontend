<template>
  <div id="app">
    <NavBar/>
    <div class="app_container">
    <router-view v-wechat-title='$route.meta.title'></router-view>
    </div>
    <WishlistDrawer/>
    <!-- <el-button @click="debug">debug</el-button> -->
    <Footer/>
  </div>
</template>

<script>
import NavBar from '../src/components/common/NavBar.vue'
import WishlistDrawer from './components/wishlist/WishlistDrawer.vue'
import Footer from './components/common/Footer.vue'
import commonApi from './commonApi'

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
    debug(){
       console.log(":")
       console.log(this.commonApi.titleCase("TOTEM AND TABOO:"))
    }
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
