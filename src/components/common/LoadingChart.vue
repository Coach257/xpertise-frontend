<template>
  <div
    :id="'loading-chart-container'+this.id"
    style="width: 600px; height: 500px"
  ></div>
</template>


<script>
export default {
  name: "LoadingChart",
  props: {
    id: Number
  },
  mounted() {
    let mychart = this.$echarts.init(document.getElementById('loading-chart-container' + this.id))
    mychart.showLoading()
  }
}
</script>

<style scoped>

</style>
