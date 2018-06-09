<template>
  <div style="padding: 10px 20px;box-sizing: border-box;height: 100%;" class="flex-column">
    <div style="height: 50px;">
      <el-button round type="primary" size="small" @click="addContact">新 增</el-button>
    </div>
    <div class="flex-1 custom-bar" style="overflow: auto;">
      <contact-show
        v-for="(i, index) in list"
        :key="index"
        :showData="i"
        @confirmDelete="deleteContact(index)"
        @editContact="editContact(index)"
        @checkContact="checkContact(index)">
      </contact-show>
      <div v-if="list.length === 0" class="color-main">暂无档案数据</div>
    </div>
    <el-dialog
      :visible.sync="showDetail"
      custom-class="dw-dialog"
      top="10vh"
      :show-close="false">
      <contact-detail :propsData="itemTemp" :readOnly="readOnly"></contact-detail>
      <span slot="footer">
        <el-button v-if="!readOnly" type="primary" round size="small" @click="submit" :disabled="doing">提 交</el-button>
        <el-button @click="showDetail=false" round size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import _ from 'lodash'
  import contactShow from '../components/contact-show.vue'
  import contactDetail from '../components/contact-detail.vue'
  import {remote} from 'electron'
  const path = require('path')
  const fs = require('fs')
  const dbPath = process.env.NODE_ENV === 'production' ? path.resolve(remote.app.getAppPath(), '../', 'contact-db.json') : path.resolve(remote.app.getAppPath(), 'contact-db.json')
  // 创建db文件
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]))
  }
  export default {
    name: 'contact',
    components: {
      contactShow,
      contactDetail
    },
    created () {
      this.list = this.readFile()
    },
    data () {
      return {
        showDetail: false,
        temp: {
          projectName: '',
          contactNum: '',
          date: '',
          subjects: [
            {
              subject: '',
              nums: null,
              price: null
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
      addContact () {
        this.itemTemp = _.cloneDeep(this.temp)
        this.isEdit = false
        this.showDetail = true
        this.readOnly = false
      },
      deleteContact (index) {
        this.list.splice(index, 1)
        this.saveFile()
        this.$message.success('删除成功')
      },
      editContact (index) {
        this.itemTemp = _.cloneDeep(this.list[index])
        this.isEdit = true
        this.clickIndex = index
        this.showDetail = true
        this.readOnly = false
      },
      checkContact (index) {
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
