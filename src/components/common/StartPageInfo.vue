<template>
  <div id='wrapper4'>

    <div id="wrapper3">

    <div class="wrapper1">
       <i class="el-icon-user"></i>

       <div class="wrapper2">
         <div class="num">
           {{authors}}
         </div>
         <div class="title">
           authors
         </div>
       </div>
    </div>

    <div class="wrapper1">
      <i class="el-icon-document"></i>

      <div class="wrapper2">
        <div class="num">
          {{papers}}
        </div>
        <div class="title">
          papers
        </div>
      </div>
    </div>

    <div class="wrapper1">
      <i class="el-icon-office-building"></i>

      <div class="wrapper2">
        <div class="num">
          {{affiliation}}
        </div>
        <div class="title">
          affiliation
        </div>
      </div>
    </div>

    <div class="wrapper1">
      <i class="el-icon-data-line"></i>

      <div class="wrapper2">
        <div class="num">
          {{venue}}
        </div>
        <div class="title">
          venue
        </div>
      </div>
    </div>

    <div class="wrapper1">
      <i class="el-icon-discover"></i>

      <div class="wrapper2">
        <div class="num">
          {{field}}
        </div>
        <div class="title">
          field
        </div>
      </div>
    </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'StartPageInfo',
    data () {
      return {
        authors: 14121,
        papers: 121413,
        affiliation: 6387,
        venue: 5399,
        field: 7128
      }
    }
  }
</script>

<style scoped>
#wrapper4 {
  /* outline: #21ff06 dotted thick; */
  width: 1200px;
  height: 50px;

  display: flex;
  justify-content: center;

  background-color: rgba(255, 255, 255, 0.3);

  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 30px 3px rgba(128, 128, 128, 0.2);
}
#root {
  /* height: 40px; */
  /* outline: #21ff06 dotted thick; */
  /* width: 1200px; */


  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
}
#wrapper3 {
  /* outline: #21ff06 dotted thick; */
  width: 750px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrapper1 {
  display: flex;
  align-items: center;
}
.wrapper2 {
  display: flex;
  flex-direction: column;
  margin-left: 6px;
}
.title {
  font-size: 8px;
  position: relative;
  top: -1px;
}
.num {
  font-size: 17px;
  font-weight: 500;
}
i {
  font-size: 25px;
}
</style>
