<template>
  <div id='root'>

     <div>
       authors{{authors}}
     </div>


  </div>
</template>

<script>
  export default {
    name: 'StartPageInfo',
    data () {
      return {
        authors: 14121,
        papers: 121413,
        affiliation: 6387,
        venue: 5399,
        field: 7128
      }
    }
  }
</script>

<style scoped>
#root {
  outline: #21ff06 dotted thick;
}
</style>
