<template>
  <div style="padding: 10px 20px;box-sizing: border-box;height: 100%;" class="flex-column">
    <div style="height: 50px;">
      <el-button round type="primary" size="small" @click="addK">新 增</el-button>
    </div>
    <div class="flex-1 custom-bar" style="overflow: auto;">
      <data-k-show
        v-for="(i, index) in list"
        :key="index"
        :showData="i"
        @confirmDelete="deleteK(index)"
        @editK="editK(index)"
        @checkK="checkK(index)">
      </data-k-show>
      <div v-if="list.length === 0" class="color-main">暂无物资数据</div>
    </div>
    <el-dialog
      :visible.sync="showDetail"
      custom-class="dw-dialog"
      top="10vh"
      :show-close="false">
      <data-k-detail :propsData="itemTemp" :readOnly="readOnly"></data-k-detail>
      <span slot="footer">
        <el-button v-if="!readOnly" type="primary" round size="small" @click="submit" :disabled="doing">提 交</el-button>
        <el-button @click="showDetail=false" round size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import _ from 'lodash'
  import dataKShow from '../components/data-k-show.vue'
  import dataKDetail from '../components/data-k-detail.vue'
  import {remote} from 'electron'
  const path = require('path')
  const fs = require('fs')
  const dbPath = process.env.NODE_ENV === 'production' ? path.resolve(remote.app.getAppPath(), '../', 'data-k-db.json') : path.resolve(remote.app.getAppPath(), 'data-k-db.json')
  // 创建db文件
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]))
  }
  export default {
    name: 'data-k',
    components: {
      dataKShow,
      dataKDetail
    },
    created () {
      this.list = this.readFile()
    },
    data () {
      return {
        showDetail: false,
        temp: {
          kName: '',
          kNum: '',
          materials: [
            {
              name: '方坯',
              rate: null
            }
          ]
        },
        doing: false,
        isEdit: false,
        itemTemp: {},
        clickIndex: null,
        readOnly: false,
        list: []
      }
    },
    methods: {
      saveFile () {
        fs.writeFileSync(dbPath, JSON.stringify(this.list, null, 2))
      },
      readFile () {
        return JSON.parse(fs.readFileSync(dbPath))
      },
      addK () {
        this.itemTemp = _.cloneDeep(this.temp)
        this.isEdit = false
        this.showDetail = true
        this.readOnly = false
      },
      deleteK (index) {
        this.list.splice(index, 1)
        this.saveFile()
        this.$message.success('删除成功')
      },
      editK (index) {
        this.itemTemp = _.cloneDeep(this.list[index])
        this.isEdit = true
        this.clickIndex = index
        this.showDetail = true
        this.readOnly = false
      },
      checkK (index) {
        this.itemTemp = _.cloneDeep(this.list[index])
        this.isEdit = false
        this.showDetail = true
        this.readOnly = true
      },
      submit () {
        this.doing = true
        if (!this.isEdit) {
          this.list.push(this.itemTemp)
          this.saveFile()
          this.showDetail = false
          this.$message.success('新增成功')
        } else {
          this.list[this.clickIndex] = this.itemTemp
          this.saveFile()
          this.showDetail = false
          this.$message.success('修改成功')
        }
        setTimeout(() => {
          this.doing = false
        }, 300)
      }
    }
  }
</script>

<style scoped>
</style>
