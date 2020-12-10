<template>
  <div class="sui-sorting">
    <div class="sui-sorting__label">Sort by</div>

    <SelectBar :buttons="buttons" style='margin-top: 8px;'/>

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
    selected (index) {
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
};
</script>

<style scoped>
.sui-sorting {
  /* outline: #21ff06 dotted thick; */
}
</style>
