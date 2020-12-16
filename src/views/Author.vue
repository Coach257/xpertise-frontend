<template>
  <div>
    <h1> 作者名称是 {{ this.author.name }}</h1>
    <h2> 论文引用量 n_citation {{ this.author.n_citation }} </h2>
    <h2
      :to="'/affiliation/'+ this.author.orgs_cs.id"
      v-if="type==1"
    >
      作者隶属的机构是 {{ this.author.orgs_cs.name }}
    </h2>

    <h2 v-if="type==2"> 作者隶属的机构是 {{ this.author.orgs_main }}</h2>

    <h2> 发表论文数目 n_pub {{ this.author.n_pubs }}</h2>
    <h2 v-if="type==2"> 高引用次数 h_index {{ this.author.h_index }} </h2>
    <h2> 以下是发表论文列表 </h2>
    <div v-if="type==1">
      <div
        v-for="(pub, index) in this.author.pubs"
        :key = pub.i
        :to="'/detail/cs/' + pub.id">
        {{ pub.title }} 引用次数为 {{ pub.r }}
      </div>
    </div>

    <div v-if="type==2">
      <div
        v-for="(pub, index) in this.author.pubs"
        :key = pub.i
        :to="'/detail/cs/' + pub.id">
        {{ pub.i }} 引用次数为 {{ pub.r }}
      </div>
    </div>


    <div v-if="type==2">
      <h2> 以下是作者标签 </h2>
      <div
        v-for="(tag, index) in this.author.tags"
        :key = tag.t
        >
        {{ tag.t }}
      </div>
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
  name: "Author",
  components: {},
  props: [],
  data() {
    return {
      type: 0,
      author: {
        h_index: -1,
        orgs_main: "",
        orgs_cs: {},
        pubs: [],
        n_citation: -1,
        n_pubs: -1,
        name: "IAmParasite",
        tags: [],
      },

      contendLoaded: false,
      searchState: {},
    };
  },
  mounted() {

    console.log(this.$route.params.authorId);
    if(this.$route.params.type == 'cs') {
      driver = new SearchDriver(csauthorconfig);
      this.type = 1;
    }
    else {
      driver = new SearchDriver(mainauthorconfig);
      this.type = 2;
    }
    console.log(this.type);
    driver.addFilter("id", this.$route.params.authorId, "any");
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
          this.author.name = results.name.raw;
        if(results.h_index)
          this.author.h_index = results.h_index.raw;
        if(results.orgs) {
          this.author.orgs_main = results.orgs.raw[0];
          if(this.type === 1)
            this.author.orgs_cs = JSON.parse(results.orgs.raw[0]);
        }

        if(results.authors) {
          raw = results.authors.raw;
          for(let i = 0; i < raw.length; i++)
            this.author.authors.push(JSON.parse(raw[i]));
        }
        if(results.n_citation)
          this.author.n_citation = results.n_citation.raw;
        if(results.n_pubs)
          this.author.n_pubs = results.n_pubs.raw;

        if(results.pubs) {
          raw = results.pubs.raw;
          for(let i = 0; i < raw.length; i++)
            this.author.pubs.push(JSON.parse(raw[i]));
        }

        if(results.tags) {
          raw = results.tags.raw;
          for(let i = 0; i < raw.length; i++)
            this.author.tags.push(JSON.parse(raw[i]));
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
