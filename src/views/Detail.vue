<template>
  <div>
  <h1>Detail Page4</h1>
  <h1>欢迎来到 {{ this.$route.params.docid }} 的详情页</h1>
  <h1>title</h1>
  <div>
        <h1> {{ docinfo.title }} </h1>
  </div>
  <h1>摘要</h1>
  <div>
        <h1> {{ docinfo.abstract }} </h1>
  </div>
  <h1>信息</h1>
  <h1>版本历史</h1>

  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Detail',
    data() {
        return {
            labelPosition: 'right',
            docinfo: {
                doc_id: '',
                title: '',
                author_list: '',
                type_list: '',
                abstract: '',
                cite_list: '',
                publish_time: '',
                source: '',
                original: '',
                com_id: '',
            },
        };
    },
    methods: {
        getInfo() {
            let formData = new FormData();
            console.log("hello");
            console.log(this.$route.params.docid);
            //console.log(localStorage.getItem('userid'));
            //formData.append('user_id', 1);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            var _this = this;
            axios.get('https://go-service-296709.df.r.appspot.com/api/v1/portal/doc/query/' + this.$route.params.docid).then(response => {
                console("进入")
                if(response) {
                     if(response) {
                        if(response.data.success) {
                            console.log(response)
                            _this.docinfo.title = response.data.data.title
                            _this.docinfo.abstract = response.data.data.abstract
                            _this.docinfo.author_list = response.data.data.author_list
                            console("陈坤")
                        }
                        else {
                            console.log(response.data)
                            console.log("获取失败 " + response.data)
                        }
                        console.log(_this.docinfo.title)
                    }
                }
                else {
                    console.log("error");
                }
            })
        }
    },
    mounted() {
        this.getInfo();
    }
  }
</script>

<style>
</style>
