<template>

  <div id='root'>
  <div id='SelectBar'>
    <div :id="['block'+this.differkey]" attr='block'></div>
    <div attr='options' :id="['options'+this.differkey]">
      <div attr='option' :class="['option'+differkey]" v-for="(button, i) in buttons" :key="i" :id="['option'+i+differkey]" @click="select(i)">{{button}}</div>
    </div>
  </div>
  </div>

</template>

<script>
 export default{
  name: 'SelectBar',
  props: ['buttons'],
  mounted() {
    this.$gsap.set("#options"+this.differkey, {width: this.buttons.length*70+'px', fontWeight: 200})
    this.$gsap.set('#option'+this.selected+this.differkey, {fontWeight: 500})
  },
  data () {
    return {
      selected: 0,
      differkey: this.buttons[0]
    }
  },
  methods: {
    select: function (index) {
      this.$gsap.set(".option"+this.differkey, {fontWeight: 200})
      this.$gsap.set('#option'+index+this.differkey, {fontWeight: 500})
      this.$gsap.to('#block'+this.differkey, {duration: 0.4,left: index*70+5+'px', ease: 'power4.out'})
      this.selected = index


     /**
     * @param {Object} index
     * @param {Object} differkey : differkey是Selectbar第一个选项的名字，用于区分不同的SelectBar
     */
      this.$parent.selected(index, this.differkey);
    }
  }
 }
</script>

<style scoped>
#root {
  /* outline:#00ff00 dotted thick; */
  display: flex;
  justify-content: flex-start;
  height: 36px;

}

 #SelectBar {
   /* outline:#00ff00 dotted thick; */
   border: #e6e6e6 solid thin;
   border-radius: 30px;
   box-shadow:inset 0px 0px 10px 1px #cccccc;
   background-color: #f2f2f2;

   height: 36px;

   padding: 5px;

   display: flex;
   justify-content: center;
   align-items: center;

   position: absolute;

 }
 [attr='options'] {
   /* outline:#00ff00 dotted thick; */

  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;

  z-index: 1;
 }
 [attr='option'] {
   cursor: pointer;
 }
 [attr='block'] {
   /* outline:#00ff00 dotted thick; */

   position: absolute;
   top: 3px;
   left: 5px;

   width: 70px;
   height: 28px;

   border: #e6e6e6 solid thin;
   border-radius: 30px;
   box-shadow:0px 0px 10px 1px #cccccc;

   background-color: #FFFFFF;
   z-index: 0;
 }

</style>
