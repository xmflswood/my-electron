<template>
  <div style="padding: 10px 0;">
    <el-button @click="main" round type="primary">新增价格数据</el-button>
    <div class="color-main">
      <span>设定合同展示跌涨幅范围:</span>
      <el-input v-model="rate" style="display: inline-block;width: 150px;"></el-input> %
      <el-button @click="saveRate" round type="primary" size="small">保存</el-button>
    </div>
    <h3 class="color-main">数据保存在{{showPrice}}/*.json文件中,请妥善保管。</h3>
  </div>
</template>

<script>
  import {remote} from 'electron'
  import _ from 'lodash'
  const fs = require('fs')
  const path = require('path')
  const dbPath = process.env.NODE_ENV === 'production' ? path.resolve(remote.app.getAppPath(), '../', 'price-db.json') : path.resolve(remote.app.getAppPath(), 'price-db.json')
  // 创建db文件
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({}, null, 2))
  }
  let myData = JSON.parse(fs.readFileSync(dbPath))
  const dialog = remote.dialog
  const xlsx = require('node-xlsx')
  export default {
    name: 'else-page',
    data () {
      return {
        rate: '',
        showPrice: process.env.NODE_ENV === 'production' ? path.resolve(remote.app.getAppPath(), '../') : path.resolve(remote.app.getAppPath())
      }
    },
    created () {
      this.init()
    },
    methods: {
      saveRate () {
        const dbPath = process.env.NODE_ENV === 'production' ? path.resolve(remote.app.getAppPath(), '../', 'else-db.json') : path.resolve(remote.app.getAppPath(), 'else-db.json')
        fs.writeFileSync(dbPath, JSON.stringify({contactRate: +this.rate / 100}, null, 2))
        this.$message.success('保存成功')
      },
      init () {
        const dbPath = process.env.NODE_ENV === 'production' ? path.resolve(remote.app.getAppPath(), '../', 'else-db.json') : path.resolve(remote.app.getAppPath(), 'else-db.json')
        // 创建db文件
        if (!fs.existsSync(dbPath)) {
          fs.writeFileSync(dbPath, JSON.stringify({contactRate: 0.03}, null, 2))
        }
        this.rate = JSON.parse(fs.readFileSync(dbPath)).contactRate * 100
      },
      openFile () {
        return new Promise((resolve, reject) => {
          dialog.showOpenDialog({
            defaultPath: '..',
            properties: [
              'openFile'
            ]
          }, (res) => {
            resolve(res[0])
          })
        })
      },
      async main () {
        let path = await this.openFile()
        if (path) {
          let source = xlsx.parse(path)
          source = source[0].data
          let parseData = this.parseData(source)
          this.save(parseData)
        }
      },
      save (parseData) {
        if (!myData[parseData.name]) {
          myData[parseData.name] = _.sortBy(_.uniqBy(parseData.data, 'date'), [(o) => +new Date(o.date)])
        } else {
          let newArray = _.concat(parseData.data, myData[parseData.name])
          myData[parseData.name] = _.sortBy(_.uniqBy(newArray, 'date'), [(o) => +new Date(o.date)])
        }
        fs.writeFileSync(dbPath, JSON.stringify(myData, null, 2))
        window.$data = JSON.parse(fs.readFileSync(dbPath))['方坯']
        this.$message.success('新增数据成功')
        this.$store.commit('SET_DONE', true)
      },
      parseData (source) {
        let o = {
          name: '方坯',
          data: []
        }
        let start = 8
        for (let i = start; i < source.length; i++) {
          let item = source[i]
          let date = +new Date(item[0])
          if (date !== 'Invalid Date') {
            o.data.push({
              date: item[0],
              price: +item[1],
              expectPrice: (+item[1] + _.random(-20, 20))
            })
          }
        }
        return o
      }
    },
    watch: {
      $route (v) {
        this.init()
      }
    }
  }
</script>

<style scoped>
</style>
