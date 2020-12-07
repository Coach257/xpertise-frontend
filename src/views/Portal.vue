<template>
    <div >
        <el-container>
      <el-header><NavBar></NavBar></el-header> 
   
  <el-main>
 
  <div>
<el-row :gutter="20">
  <el-col :span="2" :offset="6"><div class="grid-content "><el-avatar :size="100" :src="circleUrl"></el-avatar></div></el-col>
  <el-col :span="9"><div class="grid-content "><h1 style="font-size:35px;bold"> ztx</h1></div></el-col>
  <el-col :span="6"><div class="grid-content " style="margin: 35px 0"> <el-button type="primary" size="large" icon="el-icon-edit-outline" round>认领</el-button></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
</el-row>

<el-row :gutter="20">
  <el-col :span="10" :offset="2"><div class="grid-content ">
    <el-table
    :data="tableDatainfo"
    show-header="false"
    style="width: 100%"
    :header-cell-style="{textAlign: 'center'}"
    :cell-style="{ textAlign: 'center' }">

    <el-table-column
      prop="info"
      label="信息">
    </el-table-column>

  </el-table></div></el-col>
  <el-col :span="12"><div class="grid-content ">
      <el-table
    :data="tableDatapaper"
    show-header="false"
    style="width: 100%"
    :header-cell-style="{textAlign: 'center'}"
    :cell-style="{ textAlign: 'center' }">

    <el-table-column
      prop="papers"
      label="最具影响力成果">
    </el-table-column>

  </el-table></div></el-col>

</el-row>
  </div>
  </el-main>
</el-container>
  </div>
</template>

<script>
 import NavBar from '../components/common/NavBar.vue'
  export default {
    name: 'Portal',
   components:{NavBar},
   data(){
       return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
         tableDatainfo: [{
          info: '毕业于北京航空航天大学'
        }, {
          info: '研究方向量子力学'
        }, {
          info: '被引用量：777'
        }],
        tableDatapaper: [{
          papers: '量子力学概论  被引用数:77'
        }, {
          papers: '量子力学小概论  被引用数:77'
        }]
        
      }
   }
  }
</script>

<style>
  .bg-purple {
    background: #d3dce6;
  }
</style>