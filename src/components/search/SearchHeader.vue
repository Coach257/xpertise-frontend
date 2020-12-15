<template>
  <div class="sui-layout-header">

    <div class="sui-layout-header__inner">

      <form @submit.prevent="$emit('submit', $event.target.value)">

        <div class="sui-search-box">

           <input
            type="text"
            placeholder="Search anything"
            class="sui-search-box__text-input"
            :value="value"
            @input="$emit('input', $event.target.value)"
            @mouseover="mouseOver()"
            @mouseleave="mouseLeaver()"
            >
           <i class="el-icon-search" @click="$emit('submit', $event.target.value)"></i>
           </input>


           <SelectBar attr='SelectBar' :buttons="buttons" />


        </div>
      </form>
    </div>

  </div>
</template>

<script>
import SelectBar from '../common/SelectBar.vue'
export default {
  props: {
    value: {
      required: true,
      type: String,
    },
  },
  components: {
    SelectBar
  },
  data () {
    return {
      buttons: ['文献','作者']
    }
  },
  methods: {
    mouseOver() {
      this.$gsap.to(".sui-search-box__text-input", {
        duration: 0.1,
        boxShadow: "0px 0px 20px 6px rgb(127,127,127,0.3)",
      });
    },
    mouseLeaver() {
      this.$gsap.to(".sui-search-box__text-input", {
        duration: 0.1,
        boxShadow: "0px 0px 8px 2px rgb(50,50,50,0.1)",
      });
    },
    selected (index, differkey) {
      if (differkey == '文献') {
        switch(index)
        {
            case 0:
                this.$emit('OptionChange', "paper")
                break;
            case 1:
                this.$emit('OptionChange', "author")
                break;
        }
      }
    }
  },
};
</script>

<style scoped>
[attr='SelectBar']{
  /* outline: #21ff06 dotted thick; */
  position: relative;
  top: -22px;
  width: 200px;
}
.sui-layout-header {
  height: 15px;
}
.sui-layout-header__inner {
  /* outline: #21ff06 dotted thick; */

  display: flex;
  justify-content: center;
}

.sui-search-box__text-input {
  /* outline: #21ff06 dotted thick; */
  border-radius: 30px;
  /* border: #cccccc solid thin; */
  border: 1px solid #f0f0f0;
  width: 500px;
  height: 36px;

  position: relative;
  top: -22px;

  box-shadow: 0px 0px 8px 2px rgb(50, 50, 50, 0.1);
}
.el-icon-search {
  font-size: 20px;
  color: rgb(127, 127, 127, 0.6);

  position: relative;
  top: -13px;
  left: -40px;

  cursor: pointer;
}
</style>
