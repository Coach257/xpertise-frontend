<template>
  <div id="app">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/common/NavBar.vue'
export default {
  name: 'App',
  components:{
    NavBar,
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
#app {
 font-family: 'Avenir', Helvetica, Arial, sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 text-align: center;
 color: #191919;
}
</style>
