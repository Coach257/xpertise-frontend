
<!-- 注意，这一页用不到 -->

<template>
  <div id="result_detail_page">
    <div class="result_detail_page_container">
      <div class="result_detail_title_area">
        <div class="result_detail_categories">
          <router-link
            tag="div"
            class="result_detail_category_part"
            :to="'/category/' + article.category"
          >
            >{{ article.category }}
          </router-link>
          <router-link
            tag="div"
            class="result_detail_category_part"
            :to="'/category/' + article.category + '/' + article.sub_category"
          >
            >{{ article.sub_category }}
          </router-link>
          <router-link
            tag="div"
            class="result_detail_category_part"
            :to="
              '/category/' +
              article.category +
              '/' +
              article.sub_category +
              '/' +
              article.detailed_category
            "
          >
            >{{ article.detailed_category }}
          </router-link>
        </div>
        <div class="result_detail_title">
          {{ article.title }}
        </div>
        <div class="result_deatil_author_container">
          <router-link
            tag="div"
            :to="'/author/' + author.id"
            class="result_detail_author"
            v-for="(author,index) in article.authors"
            :key="author.name"
          >
            {{ author.name}} 
              <div style="display:inline;" v-if="(index < (article.authors_count-1))">,</div>
              <div style="display:inline;" v-else>...</div>
          </router-link>
        </div>
      </div>
      <div class="result_detail_article_area">
        <h3>摘要</h3>
        <p>{{ article.abstract }}</p>
        <h3>信息</h3>
        <p v-for="item in article.other" :key="item.name1">item</p>
      </div>
      <div class="result_detail_side_area">
        <div class="result_detail_side_container">
          <h3>下载</h3>
          <el-button type="primary" icon="el-icon-document" plain>查看原文</el-button>
          <el-button icon="el-icon-download" plain>下载</el-button>
          <h3>引用</h3>          
          <el-button icon="el-icon-document-copy" plain>复制引用信息</el-button>
          <h3>操作</h3>
          <el-button type="warning" icon="el-icon-star-off" v-if="article.starred===false" @click="addToFav" plain>收藏</el-button>
          <el-button type="warning" icon="el-icon-star-on" v-else @click="removeFromFav">已收藏</el-button>
          <el-button type="success" icon="el-icon-circle-plus-outline" v-if="article.listed===false" @click="addToList" plain>添加到清单</el-button>
          <el-button type="success" icon="el-icon-circle-check" v-else @click="removeFromList">已添加到清单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ResultDetailPage",
  props: ['article_data'],
  components: {},
  mounted() {
    /**
     * 获取文章信息
     * gr: 未能找到父组件，暂时先注了这一行
     */
    //this.$data.article = this.$props.article_data;
  },
  data() {
    return {
      article: {
        paper_id: "114514",
        title: "This is an example title.",
        authors: [{name:"Author One",id:"1"},{name: "Author Two",id:"2"},{name:"Author Three",id:"3"}],
        authors_count:3,
        abstract:
          "We study symmetric spiked matrix models with respect to a general class of noise distributions. Given a rank-1 deformation of a random noise matrix, whose entries are independently distributed with zero mean and unit variance, the goal is to estimate the rank-1 part. For the case of Gaussian noise, the top eigenvector of the given matrix is a widely-studied estimator known to achieve optimal statistical guarantees, e.g., in the sense of the celebrated BBP phase transition. However, this estimator can fail completely for heavy-tailed noise. In this work, we exhibit an estimator that works for heavy-tailed noise up to the BBP threshold that is optimal even for Gaussian noise. We give a non-asymptotic analysis of our estimator which relies only on the variance of each entry remaining constant as the size of the matrix grows: higher moments may grow arbitrarily fast or even fail to exist. Previously, it was only known how to achieve these guarantees if higher-order moments of the noises are bounded by a constant independent of the size of the matrix. Our estimator can be evaluated in polynomial time by counting self-avoiding walks via a color -coding technique. Moreover, we extend our estimator to spiked tensor models and establish analogous results.",
        other: ["Pages:38 pages"],
        category: "工科",
        sub_category: "计算机科学",
        detailed_category: "机器学习",
        listed:false,
        starred: false,
      },
    };
  },
  methods: {
    addToFav(){
      let that = this;
      let formData = new FormData();
      formData.append("user_id",localStorage.getItem("userid"));
      console.log(this.$data);
      formData.append("paper_id",this.article.paper_id);
      let paperInfo = JSON.stringify(this.article);
      let articleWithoutAbstract = JSON.parse(paperInfo);
      delete articleWithoutAbstract["abstract"];
      paperInfo = JSON.stringify(articleWithoutAbstract);
      formData.append("paper_info",paperInfo);
      let config = {headers: {'Content-Type': 'multipart/form-data'} };
      axios.post("https://go-service-296709.df.r.appspot.com/api/v1/user/favorite/add",formData,config).then(response => {
        if(response) {
          if(response.data.success) {
            console.log("收藏成功",response.data);
            that.$data.article.starred = true;
          }else {
            console.log("收藏失败" + response.data);
            alert("收藏文献失败，请检查网络");
          }
        }else {
          console.log("收藏失败" + response.data);
          alert("收藏文献失败，请检查网络");
        }
      })
    },
    removeFromFav() {
      let that = this;
      let formData = new FormData();
      formData.append('user_id', localStorage.getItem('userid'));
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      axios.post('https://go-service-296709.df.r.appspot.com/api/v1/user/favorite/list', formData, config).then(response => {
        if(response) {
          if(response.data.success) {
            let favorArray = response.data.data;
            console.log(favorArray);
            for(let i = 0, len = favorArray.length; i < len; i++) {
              if(favorArray[i].paper_id == this.article.paper_id) {
                formData = new FormData();
                formData.append("favor_id",favorArray[i].favor_id);
                axios.post("https://go-service-296709.df.r.appspot.com/api/v1/user/favorite/remove",formData,config).then(response => {
                  if(response) {
                    if(response.data.success) {
                      console.log("删除成功",response.data);
                      that.$data.article.starred = false;
                    }else {
                      console.log("删除失败",response.data);
                      alert("取消收藏失败，请检查网络");
                    }
                  }else {
                    console.log("收藏失败",response.data);
                    alert("取消收藏失败，请检查网络");
                  }
                })
              }
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
    },
    addToList(){
      this.$data.article.listed = true;
    },
    removeFromList(){
      this.$data.article.listed = false;
    }
  },
};
</script>
<style scoped
.result_detail_category_part {
  display: inline;
  
  font-size: 13px;
}
.result_detail_author {
  display: inline;
  
  font-size: 13px;
  color:royalblue;
}
.result_detail_page_container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.result_detail_title_area {
  width: 85vw;
  padding: 0px 20px 20px;
}
.result_detail_article_area{
  width:50vw;
  border-width: 1px;
  border-color:grey;
  /* border-style: solid; */
  border-radius: 10px;
  margin-top:20px;
  padding: 0px 20px;
  /* background-image: linear-gradient(to right bottom, #abb7b7 ,#dadfe1); */
  box-shadow: 2px 2px 20px rgba(0,0,0,.1),
       -2px -2px 20px rgba(255, 255,255, .5)
}
.result_detail_side_area{
  width:30vw;
  padding:0px 20px 20px;
  margin-top:20px;
  box-shadow: 2px 2px 20px rgba(0,0,0,.1),
       -2px -2px 20px rgba(255, 255,255, .5)
}
.result_detail_side_container{
  width:100%
  
}
.result_detail_title{
  font-weight: bold;
  font-size: 40px;
  margin-top:-5px;
  margin-bottom: -5px;
  color: black;
}
</style>
