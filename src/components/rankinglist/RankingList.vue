<template>
  <div id='root'>
      <div id='title'>
          <span>{{this.title}}</span>
      </div>
      <div v-if='showSubTitle' style="font-weight: 200; font-size: 10px;">
        In  Computer Science
      </div>

      <div id='rank' v-if="contendLoaded">
          <RankingItem v-for='(item,i) in itemList' :information='item' :key='i' :type='itemType'/>
      </div>

  </div>
</template>

<script>
import RankingItem from './RankItem.vue'
import { SearchDriver } from "@elastic/search-ui"
import {
  mainpaperconfig,
  mainauthorconfig,
  cspaperconfig,
  csauthorconfig,
  csaffiliationconfig,
} from "../../searchConfig";
var driver = null;

 export default {
   name: 'RankingList',
   props: ['title','type'],
   components: {
     RankingItem
   },
   mounted() {
     if (this.type == 'cs')
       this.showSubTitle = true;

     if(this.title == 'Top Paper' && this.type == 'main'){
       driver = new SearchDriver(mainpaperconfig);
       this.itemType = 'Citations'
     }


     if(this.title == 'Top Paper' && this.type == 'cs'){
       driver = new SearchDriver(cspaperconfig);
       this.itemType = 'Citations'
     }


     if(this.title == 'Top Author')
       driver = new SearchDriver(mainauthorconfig);

     if(this.title == 'Top Affiliation')
       driver = new SearchDriver(csaffiliationconfig);

     driver.setSearchTerm("");
     if(this.title == 'Top Paper')
        driver.setSort("n_citation", "desc");
     else
        driver.setSort("n_pubs", "desc");
     driver.setResultsPerPage(7);

     driver.subscribeToStateChanges((state) => {
       this.searchState = state;
     })
   },
   watch: {
     searchState(newsearchState) {
       if(this.thereAreResults()) {
         // console.log(newsearchState);
         var results = newsearchState.results;
         var raw;
         // console.log(results.length);

         let Maximum
         if (this.title == 'Top Paper') {
           Maximum = results[0].n_citation.raw;
           //TODO 把papers换成citation
         } else{
           Maximum = results[0].n_pubs.raw;
         }


         for(let i = 0; i < Math.min(7, results.length); i++) {
          let item = {
                     rank: 0,
                     title: '',
                     papers: 0,
                     maximum: Maximum,
                   }
          item.rank = i+1

          if(this.title == 'Top Paper'){
            item.title = results[i].title.raw;
            item.papers = results[i].n_citation.raw;
          }else{
            item.title = results[i].name.raw;
            item.papers = results[i].n_pubs.raw;
          }

          this.itemList.push(item)
         }

         this.contendLoaded = true;
       }
     }
   },
   methods: {
     thereAreResults() {
       return this.searchState.totalResults > 0;
     },
   },
   data () {
     return {
       showSubTitle: false,
       contendLoaded: false,
       searchState: {},
       itemList : [],
       itemType : 'Papers'
     }
   }
 }
</script>

<style scoped>
#root {
  box-shadow:inset 0px 0px 10px 6px rgb(50,50,50,0.1);
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
  box-shadow:0px 0px 10px 1px #cccccc;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
}
</style>
