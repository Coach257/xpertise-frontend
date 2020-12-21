<template>
  <div id="root">


	<SelectTitle :buttons='buttons' />

  </div>
</template>

<script>
import SelectTitle from '../components/common/SelectTitle.vue'

  export default {
    name: 'Test',
    components: {
      SelectTitle
    },
    data () {
      return {
        buttons: ['语言分析数据', '时间分析数据' ,'来源分析数据']
      }
    },
    methods: {
      selected(index) {
        console.log(index)
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
