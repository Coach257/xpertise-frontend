<template>
  <div id="root">
  <h1>Test Page</h1>
	
	<RelationMap/>
	
  </div>
</template>

<script>
import RelationMap from '../components/common/RelationMap.vue'

  export default {
    name: 'Test',
    components: {
      RelationMap
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
