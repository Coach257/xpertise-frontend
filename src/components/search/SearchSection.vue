<template>
  <div class="sui-layout">
    <el-button @click="debug()">DEBUG</el-button>
    <SearchHeader
      :type="type"
      v-model="searchInputValue"
      @submit="handleFormSubmit"
      v-on:OptionChange="ChangeOption"
    />
    <div v-if="searchState.wasSearched" class="sui-layout-body">
      <div class="sui-layout-body__inner">
        <div class="sui-layout-sidebar">

          <!-- 主文献 -->
          <div
            v-if="ismainpaper && thereAreResults"
            class="wrapper"
            @mouseover="mouseOverWrapper()"
            @mouseleave="mouseLeaveWrapper()"
            v-show="thereAreResults"
          >
            <SearchSort v-model="sortBy" />

            <SearchFacet
              :checked="year"
              :facet="searchState.facets.year[0]"
              @change="handleFacetChange($event, 'year')"
              style='margin-top: 32px;'
            />

            <SearchFacet
              :checked="lang"
              :facet="searchState.facets.lang[0]"
              @change="handleFacetChange($event, 'lang')"
            />
          </div>
          <!-- 主文献 -->
          <!-- 计算机文献 -->
          <div
            v-if="iscspaper  && thereAreResults"
            class="wrapper"
            @mouseover="mouseOverWrapper()"
            @mouseleave="mouseLeaveWrapper()"
            v-show="thereAreResults"
          >
            <SearchSort v-model="sortBy" />

            <SearchFacet
              :checked="year"
              :facet="searchState.facets.year[0]"
              @change="handleFacetChange($event, 'year')"
              style='margin-top: 32px;'
            />

            <SearchFacet
              :checked="venue"
              :facet="searchState.facets.venue[0]"
              @change="handleFacetChange($event, 'venue')"
            />
          </div>
          <!-- 计算机文献 -->
          <!-- 作者 -->
          <div
            v-else-if="getSearchObject === 'author'  && thereAreResults"
            class="wrapper"
            @mouseover="mouseOverWrapper()"
            @mouseleave="mouseLeaveWrapper()"
            v-show="thereAreResults"
          >
            <SearchSort v-model="sortBy" />
          </div>
          <!-- 作者 -->
          <!-- 机构 -->
          <div
            v-else-if="getSearchObject === 'affiliation'  && thereAreResults"
            class="wrapper"
            @mouseover="mouseOverWrapper()"
            @mouseleave="mouseLeaveWrapper()"
            v-show="thereAreResults"
          >
            <SearchSort v-model="sortBy" />
          </div>
          <!-- 机构 -->
        </div>

        <div class="sui-layout-main">
          <div class="sui-layout-main-header">
            <div class="sui-layout-main-header__inner">
              <SearchPagingInfo :search-state="searchState" />
              <SearchResultsPerPage
                v-show="thereAreResults"
                v-model.number="resultsPerPage"
              />
            </div>
          </div>
          <div class="sui-layout-main-body">
            <SearchResults
              :type="type"
              :option="this.configoption"
              v-show="thereAreResults"
              :results="searchState.results"
            />
          </div>
          <div class="sui-layout-main-footer">
            <SearchPagination
              v-show="thereAreResults"
              :total-pages="Math.min(searchState.totalPages, 100)"
              :click-handler="setCurrentPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SearchDriver } from "@elastic/search-ui";
import {
  mainpaperconfig,
  mainauthorconfig,
  cspaperconfig,
  csauthorconfig,
  csaffiliationconfig,
} from "../../searchConfig";
import SearchResults from "./SearchResults";
import SearchFacet from "./SearchFacet";
import SearchHeader from "./SearchHeader";
import SearchPagingInfo from "./SearchPagingInfo";
import SearchPagination from "./SearchPagination";
import SearchSort from "./SearchSort";
import SearchResultsPerPage from "./SearchResultsPerPage";

var driver = null;

export default {
  props: ["input", "type"],
  components: {
    SearchResults,
    SearchFacet,
    SearchHeader,
    SearchPagingInfo,
    SearchPagination,
    SearchSort,
    SearchResultsPerPage,
  },
  data() {
    return {
      searchInputValue: "",
      searchState: {},
      year: [],
      lang: [],
      venue:[],
      resultsPerPage: 20,
      sortBy: "relevance",
      // 搜索的内容
      configoption: "paper",
    };
  },
  computed: {
    thereAreResults() {
      return this.searchState.totalResults && this.searchState.totalResults > 0;
    },
    getSearchObject() {
      return this.configoption;
    },
    ismainpaper(){
      return this.configoption == 'paper' && this.$props.type == 'main';
    },
    iscspaper(){
      return this.configoption == 'paper' && this.$props.type == 'cs';
    },
  },
  watch: {
    resultsPerPage(newResultsPerPage) {
      driver.setResultsPerPage(newResultsPerPage);
    },
    sortBy(newSortBy) {
      driver.setSort(newSortBy, "desc");
    },
    configoption(newconfigoption) {
      if (this.$props.type == "main") {
        if (this.configoption == "paper") {
          console.log("mainpaperconfig");
          driver = new SearchDriver(mainpaperconfig);
        } else {
          console.log("mainauthorconfig");
          driver = new SearchDriver(mainauthorconfig);
        }
      } else {
        if (this.configoption == "paper") {
          console.log("cspaperconfig");
          driver = new SearchDriver(cspaperconfig);
        } else if (this.configoption == "affiliation") {
          console.log("csaffiliationconfig");
          driver = new SearchDriver(csaffiliationconfig);
        } else{
          driver = new SearchDriver(csauthorconfig);
        }
      }

      const {
        searchTerm,
        sortField,
        resultsPerPage,
        filters,
        facets,
      } = driver.getState();

      // restoring UI from url query
      this.searchInputValue = searchTerm;
      this.sortBy = sortField;
      this.resultsPerPage = resultsPerPage;
      filters.forEach((filter) => {
        if (facets[filter.field][0].type === "range") {
          this[filter.field] = filter.values.map((value) => value.name);
        } else {
          this[filter.field] = filter.values;
        }
      });

      driver.subscribeToStateChanges((state) => {
        this.searchState = state;
      });

      driver.getActions().setSearchTerm(this.searchInputValue);
    },
  },
  mounted() {
    console.log("SearchSection" + this.$props.type);
    if (this.$props.type == "main") {
      if (this.configoption == "paper") {
        driver = new SearchDriver(mainpaperconfig);
      } else driver = new SearchDriver(mainauthorconfig);
    } else {
      if (this.configoption == "paper") {
        driver = new SearchDriver(cspaperconfig);
      } else driver = new SearchDriver(csauthorconfig);
    }
    driver.reset()

    const {
      searchTerm,
      sortField,
      resultsPerPage,
      filters,
      facets,
    } = driver.getState();

    // restoring UI from url query
    this.searchInputValue = searchTerm;
    this.sortBy = sortField;
    this.resultsPerPage = resultsPerPage;
    filters.forEach((filter) => {
      if (facets[filter.field][0].type === "range") {
        this[filter.field] = filter.values.map((value) => value.name);
      } else {
        this[filter.field] = filter.values;
      }
    });

    driver.subscribeToStateChanges((state) => {
      this.searchState = state;
    });
    driver.getActions().setSearchTerm(this.input);
    this.searchInputValue = this.input;
  },

  methods: {
    handleFormSubmit() {
      if (this.searchInputValue != "") {
        driver.getActions().setSearchTerm(this.searchInputValue);
      }
    },
    handleFacetChange(event, facet) {
      const { value, checked } = event.target;
      const facetFromDriver = driver.getState().facets[facet][0];
      const valueforApi =
        facetFromDriver.type === "range"
          ? facetFromDriver.data.find((item) => item.value.name === value).value
          : value;

      if (checked) {
        this[facet].push(value);
        driver.addFilter(facet, valueforApi, "any");
      } else {
        const index = this[facet].indexOf(value);
        if (index > -1) {
          this[facet].splice(index, 1);
        }
        driver.removeFilter(facet, valueforApi, "any");
      }
    },
    setCurrentPage(page) {
      driver.setCurrent(page);
    },
    mouseOverWrapper() {
      this.$gsap.to(".wrapper", {
        duration: 0.1,
        boxShadow: "0px 0px 35px 13px rgb(127,127,127,0.3)",
      });
    },
    mouseLeaveWrapper() {
      this.$gsap.to(".wrapper", {
        duration: 0.1,
        boxShadow: "0px 0px 10px 2px rgb(127,127,127,0.2)",
      });
    },

    debug() {
      console.log(this.configoption);
    },
    ChangeOption: function (data) {
      if (this.configoption != data) {
        this.configoption = data;
        console.log("change");
        console.log(this.configoption);
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  /* border: #cccccc solid thin; */
  border: 1px solid #f0f0f0;
  border-radius: 30px;
  box-shadow: 0px 0px 10px 2px rgb(127, 127, 127, 0.2);
  padding: 15px;

  margin-top: 20px;
}
</style>
