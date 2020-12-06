<template>
  <div id="nav_bar">
    <div class="nav_bar_frame">
      <div class="nav_bar_icon">
          <div class="nav_bar_icon_title_bold">Xpertise</div>
          <div class="nav_bar_icon_title">  Scholar</div>
      </div>
      <div class="nav_bar_item_outer_frame">
          <div class="nav_bar_item_frame" v-for="(item,i) in pages" :key=item @click="onIndexChange(i)">
              <div class="nav_bar_active_item" v-if="i===activeIndex">
                 {{item.title}}
              </div>
              <div class="nav_bar_inactive_item" v-else>
                  {{item.title}}
              </div>
          </div>
     </div>
      <div class="nav_bar_action_frame"></div>
    </div>
    <div class="nav_bar_underline"></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: [],
  mounted() {},
  data() {
    return {
        pages:[
            {
                title:"首页",
                url:"/",
            },
            {
                title:"学科",
                url:"/categories",
            },{
                title:"学者",
                url:"/scholars"    
            }
        ],
        activeIndex:0,
    };
  },
  methods: {
    onIndexChange(i){
        this.activeIndex = i;
        this.$root.$router.push(pages[this.activeIndex].url);
    }
  },
};
</script>

<style scoped>
#nav_bar {
  position: fixed;
  top: 0px;
  height: 46px;
  width: 100%;
  
    vertical-align: middle;
}
.nav_bar_frame {
    vertical-align: middle;
  height: 45px;
  background-color: white;
  opacity: 50%;
  backdrop-filter: blur(50px);
  width: 100%;
}
.nav_bar_underline {
  /* position: relative; */
  bottom: 0px;
  height: 0.5px;
  opacity: 50%;
  background-color: grey;
  width: 100vw;
}

.nav_bar_icon{
    margin-left: 25px;
    float:left;
    line-height: 45px;
    font-family: 'MavenPro';
    vertical-align: middle;
    height: 45px;
}
.nav_bar_icon_title_bold{
    display: inline;
    font-weight: bold;
}
.nav_bar_icon_title{
    display: inline;
}
.nav_bar_item_outer_frame{
        float:left;
    margin-left: 20px;
}
.nav_bar_item_frame{
    display: inline;
    color: black;
    margin:0px 10px 10px 0px;
    line-height: 45px;
}
.nav_bar_active_item{
    display: inline;
    line-height: 45px;
    border-bottom-style:outset;
    border-bottom-color:black;
    border-bottom-width: 2px;
    font-weight: bold;
    height: 45px;
    width: 100%;
}
.nav_bar_inactive_item{
    display: inline;
}
</style>