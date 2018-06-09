<template>
  <div class="side-bar">
    <el-menu
      router
      :default-active="$route.path"
      background-color="#313131"
      text-color="#bfbfbc"
      active-text-color="#f2f2f2"
      style="height: 100%;border: none;">
      <el-menu-item index="/">
        <div slot="title" class="menu-item">首页
          <i class="icon iconfont icon-shouye"></i>
        </div>
      </el-menu-item>
      <el-menu-item index="/contact">
        <div slot="title" class="menu-item">合同档案管理
          <i class="icon iconfont icon-dangan"></i>
        </div>
      </el-menu-item>
      <el-menu-item index="/data-k">
        <div slot="title" class="menu-item">K值数据库
          <i class="icon iconfont icon-chilun"></i>
        </div>
      </el-menu-item>
      <el-menu-item index="/data-search">
        <div slot="title" class="menu-item">数据查询
          <i class="icon iconfont icon-sousuo"></i>
        </div>
      </el-menu-item>
      <el-menu-item index="/else">
        <div slot="title" class="menu-item">其他
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .side-bar {
    width: 200px;
  }
  .menu-item {
    font-weight: bold;
    font-size: 18px;
  }
  .menu-item i {
    float: right;
    font-size: 22px;
  }
</style>
