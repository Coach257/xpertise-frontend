<template>
  <div v-show="facet.data.length" class="sui-multi-checkbox-facet sui-facet">
    <div class="sui-multi-checkbox-facet__label">
      {{ facet.field }}
    </div>
    <div class="sui-multi-checkbox-facet__options-list">
      <label
        v-for="facetItem in facet.data"
        :key="getValue(facetItem, facet.type)"
        class="sui-multi-checkbox-facet__option-label"
      >
        <div class="sui-multi-checkbox-facet__option-input-wrapper">
          <input
            class="sui-multi-checkbox-facet__checkbox"
            type="checkbox"
            :value="getValue(facetItem, facet.type)"
            :checked="isChecked(getValue(facetItem, facet.type))"
            @change="$emit('change', $event)"
          />
          <span class="sui-multi-checkbox-facet__input-text">{{
            showValue(facetItem, facet.type)
          }}</span>
        </div>
        <span class="sui-multi-checkbox-facet__option-count">{{
          facetItem.count
        }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    facet: {
      type: Object,
      required: true
    },
    checked: {
      type: Array,
      required: true
    }
  },
  methods: {
    isChecked(value) {
      return this.checked && this.checked.includes(value);
    },
    getValue(facetItem, type) {
      return  facetItem.value;
    },
    showValue(facetItem, type) {
      return this.$props.facet.field == 'venue' ? JSON.parse(facetItem.value).raw : facetItem.value;
    }
  }
};
</script>
