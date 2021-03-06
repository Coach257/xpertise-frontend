<template>
  <div id="root">
    <div id="title">
      <span>{{ this.title }}</span>
    </div>
    <div v-if="showSubTitle" style="font-weight: 200; font-size: 10px">
      In Computer Science
    </div>

    <div id="rank" v-if="this.contendLoaded">
      <RankingItem
        v-for="(item, i) in itemList"
        :information="item"
        :key="i"
        :type="itemType"
      />
    </div>
  </div>
</template>

<script>
import RankingItem from "./RankItem.vue";
import { SearchDriver } from "@elastic/search-ui";
import axios from "axios";
import {
  mainpaperconfig,
  mainauthorconfig,
  cspaperconfig,
  csauthorconfig,
  csaffiliationconfig,
} from "../../searchConfig";
var driver = null;

export default {
  name: "RankingList",
  props: ["title", "type"],
  components: {
    RankingItem,
  },
  mounted() {
    if (this.type == "cs") this.showSubTitle = true;

    if (this.title == "Top Paper" && this.type == "main") {
      driver = new SearchDriver(mainpaperconfig);
      this.itemType = "Citations";
    } else if (this.title == "Top Paper" && this.type == "cs") {
      driver = new SearchDriver(cspaperconfig);
      this.itemType = "Citations";
    } else if (this.title == "Top Author" && this.type == "main") {
      driver = new SearchDriver(mainauthorconfig);
    } else if (this.title == "Top Author" && this.type == "cs") {
      driver = new SearchDriver(csauthorconfig);
    } else if (this.title == "Top Affiliation") {
      driver = new SearchDriver(csaffiliationconfig);
    } else if (this.title == "Hot Paper" && this.type == "cs") {
      this.itemType = "🔥";
      this.getCSHotPaper();
      return;
    } else if (this.title == "Hot Paper" && this.type == "main") {
      this.itemType = "🔥";
      this.getMainHotPaper();
      return;
    }
    driver.setSearchTerm("");
    if (this.title == "Top Paper") driver.setSort("n_citation", "desc");
    else driver.setSort("n_pubs", "desc");
    driver.setResultsPerPage(7);
    driver.subscribeToStateChanges((state) => {
      this.searchState = state;
    });
  },
  watch: {
    searchState(newsearchState) {
      if (this.thereAreResults()) {
        var results = newsearchState.results;
        let Maximum;
        if (this.title == "Top Paper") {
          Maximum = results[0].n_citation.raw;
        } else if (this.title != "Hot Paper") {
          Maximum = results[0].n_pubs.raw;
        }
        for (let i = 0; i < Math.min(7, results.length); i++) {
          let item = {
            rank: 0,
            title: "",
            papers: 0,
            url: "",
            maximum: Maximum,
          };
          item.rank = i + 1;
          if (this.title == "Top Paper") {
            item.title = results[i].title.raw;
            item.papers = results[i].n_citation.raw;
            if (this.type == "cs") {
              item.url = "/detail/cs/" + results[i].id.raw;
            } else {
              item.url = "/detail/main/" + results[i].id.raw;
            }
          } else if (this.title == "Top Affiliation") {
            item.title = results[i].name.raw;
            item.papers = results[i].n_pubs.raw;
            item.url = "/affiliation/" + results[i].id.raw;
          } else if (this.title == "Top Author") {
            item.title = results[i].name.raw;
            item.papers = results[i].n_pubs.raw;
            if (this.type == "cs") {
              item.url = "/author/cs/" + results[i].id.raw;
            } else {
              item.url = "/author/main/" + results[i].id.raw;
            }
          }

          if (this.title != "Hot Paper") {
            this.itemList.push(item);
          }
        }
         this.contendLoaded = true;
      }
    },
  },
  methods: {
    thereAreResults() {
      return this.searchState.totalResults > 0;
    },
    getCSHotPaper() {
      let formData = new FormData();
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      var _this = this;
      axios.get("https://go-service-296709.df.r.appspot.com/api/v1/portal/recommend/cs/top")
        .then(function (response) {
          if (response.data.success) {
            let list = response.data.data;
            if(list.length == 0)return
            console.log(list)
            let Maximum;
            Maximum = list[0].value;
            console.log(list[0].paper_title);
            for(let i = 0; i < Math.min(list.length, 7); i++) {
              let item = {
                rank: 0,
                title: "",
                papers: 0,
                url: "",
                maximum: Maximum,
              };
              item.rank = i + 1;
              item.papers = list[i].value;
              item.title = list[i].paper_title;
              item.url = "/detail/cs/" + list[i].paper_id;
              _this.itemList.push(item);
            }
            _this.contendLoaded = true;
          } else {
            console.log(response);
          }
        });
    },
    getMainHotPaper() {
      let formData = new FormData();
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      var _this = this;
      axios.get("https://go-service-296709.df.r.appspot.com/api/v1/portal/recommend/main/top")
        .then(function (response) {
          if (response.data.success) {
            let list = response.data.data;
            let Maximum;
            Maximum = list[0].value;
            for(let i = 0; i < Math.min(list.length, 7); i++) {
              let item = {
                rank: 0,
                title: "",
                papers: 0,
                url: "",
                maximum: Maximum,
              };
              item.rank = i + 1;
              item.papers = list[i].value;
              item.title = list[i].paper_title;
              item.url = "/detail/main/" + list[i].paper_id;
              _this.itemList.push(item);
            }
            _this.contendLoaded = true;
          } else {
            console.log(response);
          }
        });
    },
  },
  data() {
    return {
      showSubTitle: false,
      contendLoaded: false,
      searchState: {},
      itemList: [],
      itemType: "Papers",
    };
  },
};
</script>

<style scoped>
#root {
  box-shadow: inset 0px 0px 10px 6px rgb(50, 50, 50, 0.1);
  border: #e6e6e6 solid thin;
  border-radius: 30px;
  background-color: white;

  width: 350px;
  margin-top: 55px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 25px 0px 25px 0px;
}
#title {
  width: 150px;
  height: 35px;
  margin-bottom: 14px;

  border: #e6e6e6 solid thin;
  border-radius: 30px;
  box-shadow: 0px 0px 10px 1px #cccccc;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
}
</style>
