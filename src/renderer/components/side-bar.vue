<template>
  <div class="side-bar">
    <el-menu
      router
      :default-active="$route.path"
      background-color="#313131"
      text-color="#bfbfbc"
      active-text-color="#f2f2f2"
      style="height: 100%;border: none;">
      <el-menu-item index="/index" :disabled="disabled">
        <div slot="title" class="menu-item" :disabled="disabled">首页
          <i class="icon iconfont icon-shouye"></i>
        </div>
      </el-menu-item>
      <el-menu-item index="/contact" :disabled="disabled">
        <div slot="title" class="menu-item">合同档案管理
          <i class="icon iconfont icon-dangan"></i>
        </div>
      </el-menu-item>
      <el-menu-item index="/data-k" :disabled="disabled">
        <div slot="title" class="menu-item">K值数据库
          <i class="icon iconfont icon-chilun"></i>
        </div>
      </el-menu-item>
      <el-menu-item index="/data-search" :disabled="disabled">
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
  import {remote} from 'electron'
  const fs = require('fs')
  const path = require('path')

  export default {
    data () {
      return {
        disabled: false
      }
    },
    methods: {
    },
    mounted () {
      const dbPath = process.env.NODE_ENV === 'production' ? path.resolve(remote.app.getAppPath(), '../', 'price-db.json') : path.resolve(remote.app.getAppPath(), 'price-db.json')
      if (!JSON.parse(fs.readFileSync(dbPath))['方坯']) {
        this.$router.replace({name: 'else'})
        this.disabled = true
      } else {
        this.$router.replace({name: 'index'})
      }
    },
    computed: {
      done () {
        return this.$store.state.Counter.done
      }
    },
    watch: {
      done (v) {
        if (v) {
          this.disabled = false
        }
      }
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
