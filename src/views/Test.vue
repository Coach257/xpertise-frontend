<template>
  <div id="root">
  <h1>Test Page</h1>
  <SelectBar :buttons='buttons' />

  </div>
</template>

<script>
  import SelectBar from '../components/common/SelectBar.vue'
  export default {
    name: 'Test',
    components: {
      SelectBar
    },
    data () {
      return {
        buttons : ['英格兰', '华为你', '破哦是'],
        buttons2 : ['没带手','发的是']
      }
    },
    methods: {
      
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
