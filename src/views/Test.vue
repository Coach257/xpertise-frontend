<template>
  <div>
  <h1>Test Page</h1>

  <SelectBarTemplate></SelectBarTemplate>
  
  <RelationMap></RelationMap>
  </div>
</template>

<script>
  import SelectBarTemplate from '../components/template/SelectBarTemplate.vue'
  import RelationMap from '../components/common/RelationMap.vue'
  export default {
    name: 'Test',
    components: {
      SelectBarTemplate,
      RelationMap
    }
  }
</script>

<style>
</style>
