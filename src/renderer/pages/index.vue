<template>
  <div>
    <el-button @click="save">{{test}}</el-button>
  </div>
</template>

<script>
  import { remote } from 'electron'
  const fs = require('fs')
  const l = require('path').resolve(remote.app.getAppPath(), 'db.txt')
  export default {
    data () {
      return {
        test: '123'
      }
    },
    methods: {
      save () {
        fs.writeFileSync(l, '2s')
      }
    }
  }
</script>

<style scoped>
</style>
