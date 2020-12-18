<template>
  <div>
    <h1> 我的收藏 </h1>
    <el-table :data="favorList" stripe height="75vh" style="width:100%;" @cell-click="handleClick"> 
      <el-table-column type="index" width="80px" fixed="left">
      </el-table-column>
      <el-table-column label="标题" min-width="200px" show-overflow-tooltip> 
        <template slot-scope="scope"> 
          <span> {{ scope.row.paperTitle }} </span>
        </template>
      </el-table-column>
      <el-table-column label="作者" min-width="200px" show-overflow-tooltip> 
        <template slot-scope="scope"> 
          <el-link v-for="(author,index) in scope.row.authors" :key="index" @click="handleClickOnAuthor(scope.row,author.id)" style="margin:5px">{{author.name}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="取消收藏" fixed="right" width="80px"> 
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
          for(let i = 0, len = favorArray.length; i < len; i++) {
            //读取response中数据
            let favorItem = new Object();
            favorItem.favorID = favorArray[i].favor_id;
            favorItem.paperID = favorArray[i].paper_id;
            if (favorItem.paperID.length==8){
              favorItem.paper_type = "cs";
            } else {
              favorItem.paper_type = "main";
            }

            //请求论文相关信息
            let article = JSON.parse(favorArray[i].paper_info);
            favorItem.paperTitle = article.title;
            favorItem.authors = article.authors;

            //收藏项加入收藏列表
            that.favorList.push(favorItem);
          }
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
        this.$router.push({path: "/detail/"+row.paper_type+"/"+row.paperID.toString()});
      }
    },
    handleClickOnAuthor(row,authorID) {
      this.$router.push({path: "/detail/"+row.paper_type+"/"+authorID});
    }
  }
}
</script>

<style scoped>

</style>