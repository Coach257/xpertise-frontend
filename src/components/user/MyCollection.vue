<template>
  <div>
    <h1> 我的收藏 </h1>
    <el-table :data="favorList" stripe height="75vh" style="width:100%;" @cell-click="handleClick"> 
      <el-table-column type="index" width="80px" fixed="left">
      </el-table-column>
      <!--el-table-column label="收藏ID" fixed="left" width="80px"> 
        <template slot-scope="scope"> 
          {{ scope.row.favorID }}
        </template>
      </el-table-column-->
      <el-table-column label="标题" min-width="200px" show-overflow-tooltip> 
        <template slot-scope="scope"> 
          <span> {{ scope.row.paperTitle }} </span>
        </template>
      </el-table-column>
      <el-table-column label="作者" min-width="200px" show-overflow-tooltip> 
        <template slot-scope="scope"> 
          <el-link v-for="author in scope.row.authors" :key="author" @click="handleClickOnAuthor(author.id)" style="margin:5px">{{author.name}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="描述" min-width="200px" show-overflow-tooltip> 
        <template slot-scope="scope"> 
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="80px"> 
        <template slot-scope="scope"> 
          <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row.favorID)"></el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyCollection',
  data() {
    return{
      favorList:[
        //{favorID:0,paperID:0,paperTitle:"paper0",description:"null"},
      ],
    }
  },
  mounted() {
    let formData = new FormData();
    console.log(localStorage.getItem('userid'));
    formData.append('user_id', localStorage.getItem('userid'));
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    var that = this;
    axios.post('https://go-service-296709.df.r.appspot.com/api/v1/user/favorite/list', formData, config).then(response => {
      if(response) {
        if(response.data.success) {
          let favorArray = response.data.data;
          console.log(favorArray);
          for(let i = 0, len = favorArray.length; i < len; i++) {
            //读取response中数据
            let favorItem = new Object();
            favorItem.favorID = favorArray[i].favor_id;
            favorItem.paperID = favorArray[i].paper_id;

            //请求论文相关信息
            let article = JSON.parse(favorArray[i].paper_info);
            favorItem.paperTitle = article.title;
            favorItem.authors = article.authors;
            favorItem.description = JSON.stringify({category:article.category,sub_category:article.sub_category,detailed_category:article.detailed_category});

            //收藏项加入收藏列表
            that.favorList.push(favorItem);
          }
          console.log("list loaded")
          console.log(that.favorList);
        } else {
          console.log(response.data);
          console.log("获取失败 " + response.data);
          alert("收藏列表获取失败，请检查网络");
        }
      } else {
        console.log(response.data);
        console.log("获取失败 " + response.data);
        alert("收藏列表获取失败，请检查网络");
      }
    });
    console.log("end of mounted, ",that.favorList);
  },
  methods:{
    handleDelete(favorID) {
      console.log("deleting favorite item ",favorID);

      let that = this;
      let formData = new FormData();
      formData.append("favor_id",favorID);
      let config = {headers: {'Content-Type': 'multipart/form-data'} };
      axios.post("https://go-service-296709.df.r.appspot.com/api/v1/user/favorite/remove",formData,config).then(response => {
        if(response) {
          if(response.data.success) {
            console.log("删除成功",response.data);
            
            for(let i = 0, len = that.favorList.length; i < len; i++) {
              if(that.favorList[i].favorID === favorID) {
                that.favorList.splice(i,1);
                break;
              }
            }

          }else {
            console.log("删除失败" + response.data);
            alert("取消收藏失败，请检查网络");
          }
        }else {
          console.log("收藏失败" + response.data);
          alert("取消收藏失败，请检查网络");
        }
      })

      console.log("item deleted",favorID);
    },
    handleClick(row,column) {
      console.log(row,column);
      if(column.label === "标题"){
        console.log("routing to "+"/article/:"+row.paperID.toString());
        this.$router.push({path: "/article/:"+row.paperID.toString()});
      }
    },
    handleClickOnAuthor(authorID) {
      console.log("routing to "+"/article/:"+row.paperID.toString());
      this.$router.push({path: "/portal/:"+authorID});
    }
  }
}
</script>

<style scoped>

</style>

<!--
"/user/favorite/list": {
  "post": {
    "description": "获取收藏列表",
    "tags": [
      "user"
    ],
    "parameters": [
      {
        "type": "string",
        "description": "用户ID",
        "name": "user_id",
        "in": "formData",
        "required": true
      }
    ],
    "responses": {
      "200": {
        "description": "{\"success\":true, \"message\":\"查询成功\",\"data\":\"user的所有收藏\"}",
        "schema": {
          "type": "string"
        }
      }
    }
  }
},
