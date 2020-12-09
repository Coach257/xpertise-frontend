<template>
  <div id='root'>

      <div id='backpic'>

        <div id='title'>
            <span style="font-weight: bold; font-size: 40px; margin-right: 10px;">Xpertise</span>  <span style="font-size: 20px;">Scholar</span>
        </div>

        <input id="searchinput" v-model='input' v-on:keyup.13="submit">
            <i class="el-icon-search"></i>
        </input>

      </div>


  </div>
</template>

<script>
  export default {
    name: 'StartPage',
    mounted() {
      this.$gsap.set("#root", {height: document.documentElement.clientHeight})
    },
    data () {
      return {
        input: ''
      }
    },
    methods: {
      submit () {
        console.log(this.input)
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
#title {
  margin-top: 120px;
}

#searchinput {
  /* outline: #21ff06 dotted thick; */

  border-radius: 30px;
  border: #cccccc solid thin;
  width: 500px;
  height: 36px;

  margin-top: 60px;
}
.el-icon-search {
  font-size: 20px;
  color: rgb(127,127,127,0.6);

  position: relative;
  top: -27px;
  left: 220px;
}

#backpic {
  /* outline: #21ff06 dotted thick; */

  border: #cccccc solid thin;
  border-radius: 300px;
  box-shadow: 0px 0px 50px 10px rgb(127,127,127,0.3);

  background-image: url(../assets/startBack.png);
  background-size:100% 100%;


  height: 450px;
  width: 1200px;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  top: 20%;
}
</style>
