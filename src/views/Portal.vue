<template>
    <div >
        <NavBar></NavBar>
   
  
  <h1>       </h1>
  <h1>欢迎来到 {{ this.$route.params.docid }} 的详情页</h1>
 

  </div>
</template>

<script>
 import NavBar from '../components/common/NavBar.vue'
  export default {
    name: 'Portal',
   components:{NavBar},
  }
</script>

<style>
</style>