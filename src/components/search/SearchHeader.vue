<template>
  <div class="sui-layout-header">

    <div class="sui-layout-header__inner">

      <form @submit.prevent="$emit('submit', $event.target.value)">
        <div class="sui-search-box">

           <input
            type="text"
            placeholder="Try searching for 'water', 'dragon' or 'ragnaros'"
            class="sui-search-box__text-input"
            :value="value"
            @input="$emit('input', $event.target.value)"
            >
           <i class="el-icon-search"></i>
           </input>

         <!-- <input
            type="submit"
            class="button sui-search-box__submit"
            value="Search"
          /> -->


        </div>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      type: String
    }
  },
};
</script>

<style scoped>
.sui-layout-header {
  height: 15px;
}
.sui-layout-header__inner {
  /* outline: #21ff06 dotted thick; */

  display: flex;
  justify-content: center;
}

.sui-search-box__text-input {
  border-radius: 30px;
  border: #cccccc solid thin;
  width: 600px;
  height: 36px;

  position: relative;
  top: -22px;

  box-shadow: 0px 0px 10px 4px rgb(50,50,50,0.05);
}
.el-icon-search {
  font-size: 20px;
  color: rgb(127,127,127,0.6);

  position: relative;
  top: -13px;
  left: -40px;
}

</style>
