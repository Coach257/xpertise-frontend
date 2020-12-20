<template>
  <div>
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <div class="comment_avatar"></div>
        <span>{{ this.$props.item.username }}</span>
        <span>{{ this.$props.item.create_time }}</span>
        <el-button-group>
          <el-button icon="el-icon-top">顶</el-button>
          <el-button icon="el-icon-bottom">踩</el-button>
          <el-button icon="el-icon-more">操作</el-button>
        </el-button-group>
      </div>
      <div class="card_info">
        <span>
          {{ this.$data.short_abstract }}
        </span>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Drawer",
  props: ["item"],
  mounted() {
    this.$data.short_abstract =
      this.$props.item.abstract.substring(0, 40) + "...";
  },
  methods: {},
  data() {
    return {
      short_abstract: "",
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