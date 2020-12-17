<template>
  <div>
    <div class="sui-sorting__label">Sort by</div>

    <SelectBar :buttons="buttons" style='margin-top: 9px;'/>

<!--    <select
      name="sortBy"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
      <option value="">相关性</option>
      <option value="n_citation">引用</option>
    </select> -->

  </div>
</template>

<script>
import SelectBar from '../common/SelectBar.vue'

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  components: {
    SelectBar
  },
  data () {
    return {
      buttons: ['相关性','引用量']
    }
  },
  methods: {

    /**
     * @param {Object} index
     * @param {Object} differkey : differkey是对应的SelectBar的第一个选项的名字，用于区分不同的SelectBar
     */
    selected (index, differkey) {

      if (differkey == '相关性') {
        switch(index)
        {
            case 0:
                this.$emit('input', "")
                break;
            case 1:
                this.$emit('input', "n_citation")
                break;
        }
      }

    }
  }
};
</script>

<style scoped>
</style>
