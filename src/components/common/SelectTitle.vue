<template>
  <div id='root'>

    <div id='buttons'>
      <div v-for="(button, i) in buttons" :key="i" class="button" :id="['button'+i]" @click="select(i)">{{button}}</div>
    </div>

  </div>
</template>

<script>
export default{
  name: 'SelectTitle',
  props: ['buttons'],
  data () {
    return {
      selected: 0
    }
  },
  methods: {
    select: function (index) {
      if(index != this.selected){
        this.$gsap.to("#button"+this.selected, {duration: 0.5, fontWeight: 400, fontSize: '15px', ease: "bounce.out"})
        this.$gsap.to("#button"+index, {duration: 0.5, fontWeight: 700, fontSize: '30px', ease: "bounce.out"})
        this.selected = index
      }

      this.$parent.selected(index);

    }
  }
}
</script>

<style scoped>
#button0 {
  font-weight: 700;
  font-size: 30px;
}
#buttons {
  border: 1px solid #f0f0f0;
  border-radius: 30px;
  box-shadow: 0px 0px 10px 2px rgb(127, 127, 127, 0.2);
  padding: 1px 10px 0px 10px;

  color: #191919;
  height: 45px;

  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
}
.button {
  margin-right: 10px;
  margin-left: 10px;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
}
</style>
