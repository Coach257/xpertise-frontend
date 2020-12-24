<template>
  <div class="recommend_card">
    <el-card shadow="hover">
      <div slot="header" class="recommend_header_area">
        <div class="recommend_head">
          <div class="recommend_avatar"><i class="el-icon-user" /></div>
          <div class="recommend_username">
            {{ this.$props.recommend.username }}
          </div>
          <br />
          <div class="recommend_create_time">
            {{ this.$props.recommend.create_time }}
          </div>
        </div>
        <div class="recommend_actions">
          <i class="el-icon-star-on" />
          <i class="el-icon-star-on" />
          <i class="el-icon-star-on" />
          <i class="el-icon-star-on" />
          <i class="el-icon-star-on" />
        </div>
      </div>
      <div class="card_info">
        <span>
          {{ this.$props.recommend.recommend }}
        </span>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Drawer",
  props: ["recommend"],
  mounted() {
    // this.$data.itemExample;
  },
  methods: {},
  data() {
    return {
      short_abstract: "",
      itemExample: {
        username: "usernmae",
        create_time: "2020-12-18 20:23:23",
        recommend: "this is an example recommend",
      },
    };
  },
};
</script>

<style scoped>
.recommend_header_area {
  display: flex;
  justify-content: "space-between";
}
.recommend_avatar {
  display: inline;
}
.recommend_username {
  display: inline;
  font-weight: bold;
}
.recommend_create_time {
  display: inline-block;
  font-size: small;
}
.recommend_head {
  /* float: left; */
  display: inline-block;
}
.recommend_actions {
  display: inline-block;
  position: relative;
  right: 0;
  margin-left: auto;
  margin-right: 0;
  vertical-align: middle;
}
.el-icon-star-on{
    color: orange;
}
</style>