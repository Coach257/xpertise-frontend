<template>
  <div id='root'>

      <div id='backpic'>

        <div id='title'>
            <span style="font-weight: bold; font-size: 40px; margin-right: 10px;">Xpertise</span>  <span style="font-size: 20px;">Scholar</span>
        </div>

        <input v-model='input' style="border-radius: 10px;">

        </input>

        <el-button @click='submit()'>submit</el-button>

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
      }
    }
  }
</script>

<style scoped>

#backpic {
  outline: #21ff06 dotted thick;

  border: #cccccc solid thin;
  border-radius: 300px;

  background-image: url(../assets/startBack.png);
  background-size:100% 100%;


  height: 450px;
  width: 1200px;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  top: 17%;
}
</style>
