<template>

  <div id='root'>
  <div id='SelectBar'>
    <div id='block'></div>
    <div id='options'>
      <div class="option" v-for="(button, i) in buttons" :key="i" :id="['option'+i]" @click="select(i)">{{button}}</div>
    </div>
  </div>
  </div>

</template>

<script>
 export default{
  name: 'SelectBar',
  props: ['buttons'],
  mounted() {
    this.$gsap.set("#options", {width: this.buttons.length*120+'px', fontWeight: 200})
    this.$gsap.set('#option'+this.selected, {fontWeight: 500})
  },
  data () {
    return {
      selected: 0
    }
  },
  methods: {
    select: function (index) {
      this.$gsap.set(".option", {fontWeight: 200})
      this.$gsap.set('#option'+index, {fontWeight: 500})
      this.$gsap.to('#block', {duration: 0.4,left: index*120+11+'px', ease: 'power4.out'})
      this.selected = index

      this.$parent.selected(index);
    }
  }
 }
</script>

<style scoped>
#root {
  /* outline:#00ff00 dotted thick; */
  display: flex;
  justify-content: center;
  height: 51px;

}

 #SelectBar {
   /* outline:#00ff00 dotted thick; */
   border: #e6e6e6 solid thin;
   border-radius: 30px;
   box-shadow:inset 0px 0px 10px 1px #cccccc;
   background-color: #eeeeee;

   padding: 13px;

   display: flex;
   justify-content: center;

   position: absolute;

 }
 #options {
   /* outline:#00ff00 dotted thick; */

  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;

  z-index: 1;
 }
 .option {
   cursor: pointer;
 }
 #block {
   /* outline:#00ff00 dotted thick; */

   position: absolute;
   top: 6px;
   left: 11px;

   width: 120px;
   height: 35px;

   border: #e6e6e6 solid thin;
   border-radius: 30px;
   box-shadow:0px 0px 10px 1px #cccccc;

   background-color: #FFFFFF;
   z-index: 0;
 }

</style>
