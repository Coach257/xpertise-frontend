<template>
  <div>
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>{{ this.$props.item.title }}</span>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </div>
      <div class="card_info">
        <span>
          {{ this.$data.short_abstract }}
        </span>
        <el-divider content-position="left">操作</el-divider>
        <el-button-group>
          <el-button type="primary" icon="el-icon-document">查看</el-button>
          <el-button type="primary" icon="el-icon-share">分享链接</el-button>
          <el-button type="danger" icon="el-icon-delete">移除</el-button>
        </el-button-group>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Drawer",
  props: ["item"],
  mounted(){
    this.$data.short_abstract = this.$props.item.abstract.substring(0,40) + "...";
  },
  methods: {

  },
  data() {
    return {
      
      short_abstract:"",
      itemExample: {
        title: "title",
        abstract: "abstract",
        authors: "authors",
        id: "id",
      },
    };
  },
};
</script>