<template>
  <div id='itemroot'>

    <div class="numcoin" :id="['numcoin' + this.information.rank]">
       <div class="num" :id="['num' + this.information.rank]">{{this.information.rank}}</div>
    </div>

    <div id='right'>

      <div id='up'>

        <div style="font-weight: bold; white-space: nowrap;" >
           <router-link
            class="link"
            :to="this.information.url"
            tag="a"
            target="_blank"
          >
          {{this.information.title | cutLongTitle}}
           </router-link>
        </div>

        <div style="font-size: 10px; text-align: right; display: flex; white-space: nowrap;">
          {{this.information.papers}} {{this.type}}
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
        return this.information.papers*100/this.information.maximum;
      }
    },
    mounted() {


      switch( this.information.rank )
      {
          case 1:
              this.$gsap.set("#numcoin"+this.information.rank, {backgroundImage: 'linear-gradient(to bottom right, #feff0b, #d1bb10)'})
              break;
          case 2:
              this.$gsap.set('#numcoin'+this.information.rank, {backgroundImage: 'linear-gradient(to bottom right, #e9e9e9, #8f8f8f)'})
              break;
          case 3:
              this.$gsap.set('#numcoin'+this.information.rank, {backgroundImage: 'linear-gradient(to bottom right, goldenrod, #996633)'})
              break;
          default:
              this.$gsap.set('#numcoin'+this.information.rank, {backgroundColor: '#e6e6e6'})
              this.$gsap.set('#num'+this.information.rank, {color: 'grey'})
      }

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
