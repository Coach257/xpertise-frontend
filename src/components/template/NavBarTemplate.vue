<template>
    <div id="nav_bar_template">
        <NavBar></NavBar>
    </div>
</template>


<script>
    import NavBar from '../common/NavBar.vue'
 export default{
  name: 'NavBarTemplate',
  props: [],
  components:{NavBar},
  mounted() {
  },
  data () {
    return {

    }
  },
  methods: {
  }
 }

</script>

<style scoped>
#nav_bar_template{
    height: 100vh;
    width: 100vw;
    background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%); 
}
</style>