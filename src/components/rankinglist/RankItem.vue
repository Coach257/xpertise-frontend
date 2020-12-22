<template>
  <div id='itemroot' v-if="loaded">

    <div class="numcoin" :id="['numcoin' + this.information.rank]">
       <div class="num" :id="['num' + this.information.rank]">{{this.info.rank}}</div>
    </div>

    <div id='right'>

      <div id='up'>

        <div style="font-weight: bold; white-space: nowrap;" >
           <router-link
            class="link"
            :to="this.info.url"
            tag="a"
            target="_blank"
          >
          {{this.info.title | cutLongTitle}}
           </router-link>
        </div>

        <div style="font-size: 10px; text-align: right; display: flex; white-space: nowrap;">
          {{this.info.papers}} {{this.type}}
        </div>

      </div>

      <el-progress v-if="getPercentage" :percentage='getPercentage' :show-text='false' color="#26BEB8" :stroke-width="9" style="margin-top: 6px;"></el-progress>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'RankingItem',
    props: ['information','type'],
    data () {
      return {
        info: {
          rank: 0,
          title: "",
          papers: 0,
          maximum: 0,
        },
        loaded:false,
      }
    },
    filters: {
      cutLongTitle: function (value) {
        if (value.length > 16) {
          return value.slice(0, 14) + '...'
        }
        return value
      }
    },
    computed: {
      getPercentage () {
        return this.info.papers*100/this.info.maximum;
      }
    },
    mounted() {
      this.info.rank = this.information.rank;
      this.info.title = this.information.title;
      this.info.papers = this.information.papers;
      this.info.maximum= this.information.maximum;
      this.info.url = this.information.url;
      

      switch( this.info.rank )
      {
          case 1:
              this.$gsap.set("#numcoin"+this.info.rank, {backgroundImage: 'linear-gradient(to bottom right, #feff0b, #d1bb10)'})
              break;
          case 2:
              this.$gsap.set('#numcoin'+this.info.rank, {backgroundImage: 'linear-gradient(to bottom right, #e9e9e9, #8f8f8f)'})
              break;
          case 3:
              this.$gsap.set('#numcoin'+this.info.rank, {backgroundImage: 'linear-gradient(to bottom right, goldenrod, #996633)'})
              break;
          default:
              this.$gsap.set('#numcoin'+this.info.rank, {backgroundColor: '#e6e6e6'})
              this.$gsap.set('#num'+this.info.rank, {color: 'grey'})
      }
      this.loaded = true;
    }
  }
</script>

<style scoped>
#itemroot {
  /* outline: #21ff06 dotted thick; */
  display: flex;
  margin-top: 13px;
}
.numcoin {
  width: 35px;
  height: 35px;
  border-radius: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 20px;
}
.num {
  font-size: 20px;
  font-weight: bolder;
  color: white;
}
#right {
  width: 240px;
}
#up {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.link {
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
