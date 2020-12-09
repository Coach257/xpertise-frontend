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
</style>