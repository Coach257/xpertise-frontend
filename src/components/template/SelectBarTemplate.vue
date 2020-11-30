<template>
  <div>
    <h1>Select Bar Template</h1>
    <h2>
    如果你要使用这个模版，你需要：
    1、向组件SelectBar传入一个数组buttons，代表每个选择的名称（长度>=2）
    2、改变每个子页面的内容。
    </h2>

     <SelectBar :buttons="buttons"></SelectBar>

    <transition-group appear name="slide-fade" mode="out-in">
    <div v-show="show1" key=1>
      <h1>学术成果</h1>
      <h1>学术成果</h1>
      <h1>学术成果</h1>
      <h1>学术成果</h1>
      <h1>学术成果</h1>
      <h1>学术成果</h1>
    </div>

    <div v-show="show2" key=2>
      <h1>科研人员</h1>
      <h1>科研人员</h1>
      <h1>科研人员</h1>
      <h1>科研人员</h1>
      <h1>科研人员</h1>
      <h1>科研人员</h1>
    </div>

    <div v-show="show3" key=3>
      <h1>科研机构</h1>
      <h1>科研机构</h1>
      <h1>科研机构</h1>
      <h1>科研机构</h1>
      <h1>科研机构</h1>
      <h1>科研机构</h1>
    </div>

    <div v-show="show4" key=4>
      <h1>会议期刊</h1>
      <h1>会议期刊</h1>
      <h1>会议期刊</h1>
      <h1>会议期刊</h1>
      <h1>会议期刊</h1>
      <h1>会议期刊</h1>
    </div>
    </transition-group>

  </div>
</template>

<script>
/**
 * 如果你要使用这个模版，你需要：
 * 1、向组件SelectBar传入一个数组buttons，代表每个选择的名称（长度>=2）
 * 2、改变每个子页面的内容。
 */
import SelectBar from '../common/SelectBar.vue'
export default{
  name: 'SelectBarTemplate',
  inject: ['sleep'],
  methods: {
    selected: function (index) {
      this.show1=false;
      this.show2=false;
      this.show3=false;
      this.show4=false;
      this.sleep(199).then(()=>{
        switch(index)
        {
            case 0:
                this.show1=true;
                break;
            case 1:
                this.show2=true;
                break;
            case 2:
                this.show3=true;
                break;
            case 3:
                this.show4=true;
                break;
        }
      })
    }
  },
  components: {
    SelectBar
  },
  data () {
    return {
      buttons: ['学术成果', '科研人员', '科研机构', '会议期刊'],
      show1: true,
      show2: false,
      show3: false,
      show4: false
    }
  }
}
</script>

<style scoped>
  .slide-fade-enter-active {
    transition: all .2s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s ease;
  }
  .slide-fade-enter {
    transform: translateX(20px);
    opacity: 0;
  }
  .slide-fade-leave-to {
    transform: translateX(-20px);
    opacity: 0;
  }
</style>
