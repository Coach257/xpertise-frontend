<template>
  <div id="root">
  <h1>Test Page</h1>

  <div id='backpic' @mouseover="mouseOver()">

    <img src="../assets/startBack.png" id='startbackpic'></img>
    <div id='title'>
        <span style="font-weight: bold; font-size: 40px; margin-right: 10px;">Xpertise</span>  <span style="font-size: 20px;">Scholar</span>
    </div>

  </div>

  </div>
</template>

<script>
  import RelationMap from '../components/common/RelationMap.vue'
  import SelectBar from '../components/common/SelectBar.vue'

  export default {
    name: 'Test',
    components: {
      SelectBar,
      RelationMap
    },
    data () {
      return {
        buttons : ['英格兰', '华为你', '破哦是'],
        buttons2 : ['没带手','发的是']
      }
    },
    methods: {
      mouseOver () {
        // this.$gsap.to('#startbackpic',{duration: 1, pixi:{blur:20}})
        console.log('hi')
      }
    }
  }
</script>

<style scoped>
  #root {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

#backpic {
  /* outline: #21ff06 dotted thick; */

  border: #cccccc solid thin;
  border-radius: 300px;
  box-shadow: 0px 0px 50px 10px rgb(127,127,127,0.3);

/*  background-image: url(../assets/startBack.png);
  background-size:100% 100%; */

  height: 500px;
  width: 1300px;
  margin-top: 5%;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: hidden;
  position: relative;
}

#startbackpic {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
}

  #title {
    margin-top: 100px;
  }
</style>
