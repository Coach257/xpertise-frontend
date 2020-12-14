<template>
  <div id='root'>
      <div id='title'>
          <span>{{this.title}}</span>
      </div>
      <div v-if='showSubTitle' style="font-weight: 200; font-size: 10px;">
        In  Computer Science
      </div>

      <div id='rank'>
          <RankingItem v-for='(item,i) in itemList' :information='item' :key='i'/>
      </div>

  </div>
</template>

<script>
import RankingItem from './RankItem.vue'

 export default {
   name: 'RankingList',
   props: ['title','type'],
   components: {
     RankingItem
   },
   mounted() {
     if (this.type == 'cs') {
       this.showSubTitle = true
     }
   },
   data () {
     return {
       showSubTitle: false,
       itemList : [
       {
         rank: 1,
         title: 'IBM | IBM',
         papers: 2098,
         maximum: 2098,
       },
       {
         rank: 2,
         title: 'THU | THU',
         papers: 1881,
         maximum: 2098,
       },{
         rank: 3,
         title: 'INTEL | intel',
         papers: 1664,
         maximum: 2098,
       },{
         rank: 4,
         title: 'CSA | CSA',
         papers: 1423,
         maximum: 2098,
       },{
         rank: 5,
         title: 'NTU | NTU',
         papers: 1137,
         maximum: 2098,
       },{
         rank: 6,
         title: 'CMU | CMU',
         papers: 983,
         maximum: 2098,
       },{
         rank: 7,
         title: 'SJTU | SJTU',
         papers: 981,
         maximum: 2098,
       }]
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
  height: 470px;
  margin-top: 55px;
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
