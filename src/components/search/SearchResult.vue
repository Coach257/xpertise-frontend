<template>
  <article class="search-result">
    <h2 class="search-result__heading">{{ result.title.raw }}</h2>
    <div class="search-result__body">
      <div class="search-result__data">
        <div v-if="result.doc_type">文献类型: {{ result.doc_type.raw }}</div>
        <div v-if="result.id">文献编号: {{result.id.raw}}</div>
        <div v-if="result.authors">作者: {{ result.authors.raw }}</div>
        <div v-if="result.n_citation">被引次数: {{ result.n_citation.raw }}</div>
        <div v-if="result.year">年份: {{ result.year.raw }}</div>
        <div v-if="result.publisher">出版社: {{ result.publisher.raw }}</div>
        <br/>
        <div v-if="result.page_start">Page_start: {{ result.page_start.raw }}</div>
        <div v-if="result.page_end">Page_end: {{ result.page_end.raw }}</div>
        <br />
        <div v-if="result.issue">Issue: {{ result.issue.raw }}</div>
        <div v-if="result.volume">volume: {{ result.volume.raw }}</div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  methods: {

  }
};
</script>

<style scoped>
.search-result {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  align-items: center;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search-result__heading {
  text-align: center;
  margin: 0;
}

.search-result__body {
  display: flex;
  justify-content: flex-start;
  align-self: flex-start;
}

.search-result__data {
  padding-top: 50px;
}

.search-result__flavor {
  margin: 0;
}

.search-result__image {
  flex: none;
  width: 256px;
  height: 387px;
}
</style>
