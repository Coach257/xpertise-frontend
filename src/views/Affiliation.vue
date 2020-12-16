<template>
  <div>
    <h1> 机构名称是 {{ this.affiliation.name }}</h1>
    <h2> 发表论文数目 n_pub {{ this.affiliation.n_pubs }} 以下是发表论文列表 </h2>
    <div>
      <router-link
        v-for="(pub, index) in this.affiliation.pubs"
        :key = pub.id
        :to="'/detail/cs/' + pub.id">
        {{ pub.title }}
      </router-link>
    </div>
    <h2> 论文引用量 n_citation {{ this.affiliation.n_citation }} </h2>
    <h2> 以下是作者列表 </h2>
    <div>
      <router-link
        v-for="(author, index) in this.affiliation.authors"
        :key = author.id
        :to="'/author/' + author.id">
        {{ author.name }}
      </router-link>
    </div>

  </div>
</template>

<script>
import { SearchDriver } from "@elastic/search-ui"
import {
  mainpaperconfig,
  mainauthorconfig,
  cspaperconfig,
  csauthorconfig,
  csaffiliationconfig,
} from "../searchConfig";
var driver = null;

export default {
  name: "Affiliation",
  data() {
    return {
      affiliation: {
        authors: [],
        pubs: [],
        n_citation: 1,
        n_pubs: 1,
        name: "NUS",
      },

      contendLoaded: false,
      searchState: {},
    };
  },
  mounted() {
    console.log(this.$route.params.affId);
    driver = new SearchDriver(csaffiliationconfig);
    driver.addFilter("id", this.$route.params.affId, "any");
    driver.subscribeToStateChanges((state) => {
      this.searchState = state;
    })
  },
  methods: {
    thereAreResults() {
      return this.searchState.totalResults > 0;
    }

  },
  watch: {
    searchState(newsearchState) {
      if(this.thereAreResults()) {
        console.log(newsearchState);
        var results = newsearchState.results[0];
        var raw;
        if(results.name)
          this.affiliation.name = results.name.raw;
        if(results.authors) {
          raw = results.authors.raw;
          for(let i = 0; i < raw.length; i++)
            this.affiliation.authors.push(JSON.parse(raw[i]));
        }
        if(results.n_citation)
          this.affiliation.n_citation = results.n_citation.raw;
        if(results.n_pubs)
          this.affiliation.n_pubs = results.n_pubs.raw;

        if(results.pubs) {
          raw = results.pubs.raw;
          for(let i = 0; i < raw.length; i++)
            this.affiliation.pubs.push(JSON.parse(raw[i]));
        }
        this.contendLoaded = true;
      }
    }
  },
  computed: {

  },





}
</script>

<style scoped>

</style>
