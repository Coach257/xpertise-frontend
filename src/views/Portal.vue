<template>
    <div >
        <el-container>
   
  <el-main>
 
  <div>
<el-row :gutter="10">
  <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="8" :offset="6"><div class="grid-content "><el-avatar :size="100" :src="circleUrl"></el-avatar></div></el-col>
  <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="8"><div class="grid-content "><h1 style="font-size:35px;bold"> ztx</h1></div></el-col>
  <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="1"><div class="grid-content " style="margin: 35px 0"> <el-button type="primary" size="large" icon="el-icon-edit-outline" round>认领</el-button></div></el-col>
  <el-col :xs="3" :sm="3" :md="4" :lg="3" :xl="1"><div class="grid-content " style="margin: 35px 0"> <el-button type="warning" size="large" icon="el-icon-star-on" round>收藏</el-button></div></el-col>
</el-row>

<el-row :gutter="24">
  <el-col :span="10" :offset="2">
    <div class="grid-content ">
        <el-table
        :data="tableDatainfo"
        show-header="false"
        style="width: 100%"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
        icon="el-icon-tickets">
            <el-table-column 
            prop="info"
            label="信息">
            </el-table-column>

        </el-table>
    </div>
  </el-col>

  <el-col :span="8">
      <div class="grid-content ">
        <el-table
        :data="tableDatapaper"
        icon="el-icon-tickets"
        style="width: 100%"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }">
            <el-table-column
            prop="papers"
            label="最具影响力成果">
            </el-table-column>
        </el-table>
      </div>
    </el-col>

     <el-col :span="2"><div class="grid-content ">
         <el-link href="https://element.eleme.io" type="primary" icon="el-icon-tickets" target="_blank">查看更多</el-link>
      </div></el-col>
</el-row>
 <el-row :gutter="5"> <el-col :span="20" :offset="2"><h1> </h1></el-col>  </el-row>
<el-row :gutter="10">
<el-col :span="20" :offset="2">
    <el-tabs v-model="activeName" @tab-click="handleClick" >
    <el-tab-pane label="全部" name="first">
        <el-row class="block-col-2">
            <el-col :span="2">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    所有时间<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>最近五年</el-dropdown-item>
                    <el-dropdown-item>最近一年</el-dropdown-item>
                    <el-dropdown-item>最近一月</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="2">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    全部作者<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>仅合作作者</el-dropdown-item>
                    <el-dropdown-item>其他作者</el-dropdown-item>
                    
                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="2">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    按时间排序<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>倒序</el-dropdown-item>
                    <el-dropdown-item>顺序</el-dropdown-item>

                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </el-tab-pane>
    <el-tab-pane label="科研成果" name="second">
         <el-row class="block-col-2">
            <el-col :span="2">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    所有时间<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>最近五年</el-dropdown-item>
                    <el-dropdown-item>最近一年</el-dropdown-item>
                    <el-dropdown-item>最近一月</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="2">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    全部作者<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>仅合作作者</el-dropdown-item>
                    <el-dropdown-item>其他作者</el-dropdown-item>
                    
                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="2">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    按时间排序<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>倒序</el-dropdown-item>
                    <el-dropdown-item>顺序</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </el-tab-pane>

    <el-tab-pane label="期刊会议论文" name="third">
         <el-row class="block-col-2">
            <el-col :span="2">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    所有时间<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>最近五年</el-dropdown-item>
                    <el-dropdown-item>最近一年</el-dropdown-item>
                    <el-dropdown-item>最近一月</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="2">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    全部作者<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>仅合作作者</el-dropdown-item>
                    <el-dropdown-item>其他作者</el-dropdown-item>
                    
                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="2">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    按时间排序<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>倒序</el-dropdown-item>
                    <el-dropdown-item>顺序</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </el-tab-pane>
    <el-tab-pane label="专利" name="fourth">
         <el-row class="block-col-2">
            <el-col :span="2">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    所有时间<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>最近五年</el-dropdown-item>
                    <el-dropdown-item>最近一年</el-dropdown-item>
                    <el-dropdown-item>最近一月</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="2">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    全部作者<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>仅合作作者</el-dropdown-item>
                    <el-dropdown-item>其他作者</el-dropdown-item>
                    
                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="2">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    按时间排序<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>倒序</el-dropdown-item>
                    <el-dropdown-item>顺序</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </el-tab-pane>
  </el-tabs>
  </el-col>
  </el-row>
   </div>
  </el-main>
</el-container>
  </div>
</template>

<script>

import { SearchDriver } from "@elastic/search-ui";
import {mainauthorconfig,csauthorconfig} from "../searchConfig";
//const driver = new SearchDriver(csauthorconfig)

  export default {
   name: 'Portal',
   props: ['type'],
   components:{},
   
   mounted() {
       driver.subscribeToStateChanges(state => {
        this.searchState = state;
       });
       driver.clearFilters()
       driver.addFilter("id",this.$route.params.authorid,"any")
       //driver.getActions().setSearchTerm("")
       
       console.log(this.searchState)
       //this.getInfo();
   },
   data(){
       return {
        circleUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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
        }],
        activeName: 'first'
        
      }
   }
  }
</script>

<style>
  .bg-purple {
    background: #d3dce6;
  }
</style>