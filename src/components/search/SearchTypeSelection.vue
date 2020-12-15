<template>
  <div class="sui-sorting" style="margin-top: 25px;">
      <div class="sui-sorting__label">Type</div>

      <SelectBar :buttons="buttons" style='margin-top: 8px;'/>

    </div>
</template>

<script>
 import SelectBar from '../common/SelectBar.vue'
  export default {
    name: 'SearchTypeSelection',
    components: {
      SelectBar
    },
    data () {
      return {
        buttons: ['文献','作者']
      }
    },
    methods: {
      /**
       * @param {Object} index
       * @param {Object} differkey : differkey是对应的SelectBar的第一个选项的名字，用于区分不同的SelectBar
       */
      selected (index, differkey) {
        if (differkey == '文献') {
          switch(index)
          {
              case 0:
                  this.$emit('OptionChange', "paper")
                  break;
              case 1:
                  this.$emit('OptionChange', "author")
                  break;
          }
        }
      }
    }

  }
</script>

<style scoped>

</style>
