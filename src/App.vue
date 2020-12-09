<template>
  <div id="app">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue';
export default {
  name: 'Index',
  components:[NavBar]
}
</script>

<style scoped>
#app{
  width: 100vw;
  height: 100vh;
}
</style>