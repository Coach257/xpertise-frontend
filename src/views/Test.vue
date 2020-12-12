<template>
  <div id="root">
  <h1>Test Page</h1>

  <!-- <RelationMap></RelationMap> -->
  <SelectBar :buttons='buttons'></SelectBar>
  <SelectBar :buttons='buttons2'></SelectBar>

  </div>
</template>

<script>
  import RelationMap from '../components/common/RelationMap.vue'
  import SelectBar from '../components/common/SelectBar.vue'

  export default {
    name: 'Test',
    components: {
      SelectBar,
      RelationMap
    },
    data () {
      return {
        buttons : ['英格兰', '华为你', '破哦是'],
        buttons2 : ['没带手','发的是']
      }
    }
  }
</script>

<style scoped>
  #root {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
