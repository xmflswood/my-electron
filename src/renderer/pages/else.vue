<template>
  <div>
    2222222
    <div>2132321231231</div>
    <el-button @click="main">213</el-button>
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
      }
    },
    methods: {
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
        let path = '123'
        path = await this.openFile()
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
      },
      parseData (source) {
        let o = {
          name: '方培',
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
    }
  }
</script>

<style scoped>
</style>
