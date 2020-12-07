<template>
  <div class="sui-sorting">
    <div class="sui-sorting__label">Sort by</div>
    <select
      name="sortBy"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
      <option value="">相关性</option>
      <option value="n_citation">引用</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  }
};
</script>
