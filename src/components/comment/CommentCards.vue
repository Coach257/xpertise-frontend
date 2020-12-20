<template>
  <div>
    我是小熊的小迷弟
  </div>
</template>

<script>
export default {
  name: "CommentCards",
  props: {
    id: String
  },
  data() {
    return{

    }
  },
  mounted () {
    console.log(this.id);
  },
  methods: {

  },

}

</script>

<style scoped>

</style>
