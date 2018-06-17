<template>
  <div style="padding: 10px 20px;box-sizing: border-box;">
    <div>
      <el-select v-model="type" style="width: 180px;" placeholder="合同/物资/原材料">
        <el-option
          v-for="item in typeOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-select v-model="sub" style="width: 280px;margin-left: 20px;" placeholder="小类选择">
        <el-option
          v-for="item in subOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <div style="margin-top: 20px;">
      <el-date-picker
        v-model="dates"
        type="daterange"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions">
      </el-date-picker>
      <span style="margin-left: 20px;">
        <el-button type="primary" round @click="check">查询</el-button>
      </span>
    </div>
    <div style="margin-top: 30px;font-size: 20px;font-weight: bold;margin-left: 10px;">
      <span class="color-blue">{{ecTitle}}</span><span class="color-main">价格走势图</span>
    </div>
    <div :style="{height: ecHeight}">
      <div v-if="canShow" class="wh-100">
        <echartsPrice :index="index" ref="ec"></echartsPrice>
      </div>
    </div>
    <div v-if="showTips" class="tips color-main" style="font-size: 20px;font-weight: bold;">
      <p>{{`${tipsDates[0]}-${tipsDates[1]}`}}</p>
      <p v-if="tipsRate">平均涨幅为: <span :class="[{'color-green': tipsRate < 0},{'color-yellow': tipsRate >= 0}]"> {{' ' + tipsRate + '%'}}</span></p>
      <p v-if="tipsRP">均价为: <span class="color-yellow"> {{tipsRP}}元</span></p>
      <p v-if="tipsRate"><span>{{tipsText}}</span> <span :class="[{'color-green': tipsPrice < 0},{'color-yellow': tipsPrice >= 0}]"> {{' ' + tipsPrice + '元'}}</span></p>
    </div>
  </div>
</template>

<script>
  import {remote} from 'electron'
  import echartsPrice from '../components/search-echarts-price.vue'
  import _ from 'lodash'
  const path = require('path')
  const fs = require('fs')
  export default {
    name: 'data-search',
    components: {
      echartsPrice
    },
    data () {
      return {
        sub: '',
        subOptions: [],
        dates: [],
        type: '',
        typeOptions: ['合同', '物资', '原材料'],
        subjectOptions: ['方坯'],
        contactOptions: [],
        allContact: [],
        kOptions: [],
        allK: [],
        index: 0,
        pickerOptions: {
          disabledDate (t) {
            t = +new Date(t) + window.$h8
            return !window.$data.some((i) => +new Date(i.date) === t)
          }
        },
        canShow: false,
        ecHeight: null,
        main: {
          price: [],
          expectPrice: [],
          min: null,
          max: null,
          dates: []
        },
        allData: [],
        showTips: false,
        tipsDates: [],
        tipsRate: '',
        tipsPrice: '',
        tipsText: '',
        tipsRP: null,
        ecTitle: ''
      }
    },
    created () {
      this.setKoptions()
      this.setContactoptions()
    },
    mounted () {
      this.setHeight()
      let debounceHeight = _.debounce(this.setHeight, 200)
      window.addEventListener('resize', debounceHeight)
    },
    methods: {
      setKoptions () {
        const dbPath = process.env.NODE_ENV === 'production' ? path.resolve(remote.app.getAppPath(), '../', 'data-k-db.json') : path.resolve(remote.app.getAppPath(), 'data-k-db.json')
        const a = JSON.parse(fs.readFileSync(dbPath))
        this.allK = a
        this.kOptions = a.map(i => i.kName)
      },
      setContactoptions () {
        const dbPath = process.env.NODE_ENV === 'production' ? path.resolve(remote.app.getAppPath(), '../', 'contact-db.json') : path.resolve(remote.app.getAppPath(), 'contact-db.json')
        const a = JSON.parse(fs.readFileSync(dbPath))
        this.allContact = a
        this.contactOptions = a.map(i => i.contactNum)
      },
      check () {
        if (!this.type || !this.sub || !this.dates || this.dates.length === 0) {
          this.showTips = false
          this.$message('不可留空')
        } else {
          this.tipsDates = this.dates
          this.showTips = true
          switch (this.type) {
            case '原材料':
              this.setData0()
              break
            case '物资':
              this.setData1()
              break
            case '合同':
              this.setData2()
          }
        }
      },
      setHeight () {
        this.canShow = false
        let height = document.getElementById('data').offsetHeight
        let itemHeight = height / 3
        this.ecHeight = itemHeight + 'px'
        this.$nextTick(() => {
          this.canShow = true
          this.$nextTick(() => {
            // this.setData0()
          })
        })
      },
      reflow () {
        return new Promise((resolve, reject) => {
          this.canShow = false
          this.$nextTick(() => {
            this.canShow = true
            this.$nextTick(() => {
              resolve(true)
            })
          })
        })
      },
      setMain () {
        this.main.price = this.allData.map(i => i.price)
        this.main.expectPrice = this.allData.map((i) => i.expectPrice)
        this.main.min = _.minBy(this.allData, 'price').price - 50
        this.main.max = _.maxBy(this.allData, 'price').price + 50
        this.main.dates = this.allData.map(i => i.date)
      },
      async setData0 () {
        this.ecTitle = this.sub
        this.index = 0
        await this.reflow()
        let o = {
          series: [
            {
              name: '价格',
              data: this.main.price
            },
            {
              name: '预期价格',
              data: this.main.expectPrice
            }
          ],
          xAxis: [
            {
              data: this.main.dates
            }
          ],
          yAxis: [
            {
              min: this.main.min,
              max: this.main.max
            }
          ]
        }
        // eslint-disable-next-line
        this.tipsRP = Number(eval(this.main.price.join('+'))  / this.main.dates.length).toFixed(2)
        this.tipsRate = ''
        this.$refs['ec'].setOption(o)
      },
      async setData1 () {
        this.index = 1
        this.ecTitle = this.sub
        await this.reflow()
        let rate = _.find(this.allK, {kName: this.sub}).materials[0].rate * 0.01
        let truePrice = this.main.price.map(i => Number(i * rate).toFixed(2))
        let expectPrice = this.main.expectPrice.map(i => Number(i * rate).toFixed(2))
        let o = {
          series: [
            {
              name: '价格',
              data: truePrice
            },
            {
              name: '预期价格',
              data: expectPrice
            }
          ],
          xAxis: [
            {
              data: this.main.dates
            }
          ],
          yAxis: [
            {
              min: Number(this.main.min * rate).toFixed(),
              max: Number(this.main.max * rate).toFixed()
            }
          ]
        }
        // eslint-disable-next-line
        this.tipsRP = Number(eval(truePrice.join('+'))  / this.main.dates.length).toFixed(2)
        this.tipsRate = ''
        this.$refs['ec'].setOption(o)
      },
      async setData2 () {
        this.ecTitle = '合同'
        const dbPath = process.env.NODE_ENV === 'production' ? path.resolve(remote.app.getAppPath(), '../', 'else-db.json') : path.resolve(remote.app.getAppPath(), 'else-db.json')
        let contactRate = JSON.parse(fs.readFileSync(dbPath)).contactRate * 100
        this.index = 1
        await this.reflow()
        let contact = _.find(this.allContact, {contactNum: this.sub})
        let s = contact.subjects.map(i => i.nums * i.price)
        // eslint-disable-next-line
        let sum = eval(s.join('+'))
        // rates = rate * nums
        let rates = contact.subjects.map(i => _.find(this.allK, {kName: i.subject}).materials[0].rate * 0.01 * i.nums)
        // eslint-disable-next-line
        let need = eval(rates.join('+'))
        let trueRates = this.main.price.map(i => {
          let a = Number(i * need)
          let p = Number((a - sum) / sum * 100).toFixed(2)
          if (p > contactRate || p < -contactRate) {
            return p
          }
          return 0
        })
        let expectRates = this.main.expectPrice.map(i => {
          let a = Number(i * need)
          let p = Number((a - sum) / sum * 100).toFixed(2)
          if (p > contactRate || p < -contactRate) {
            return p
          }
          return 0
        })
        let o = {
          series: [
            {
              name: '当日与合同相比(%)',
              data: trueRates
            },
            {
              name: '当日预期与合同相比(%)',
              data: expectRates
            }
          ],
          xAxis: [
            {
              data: this.main.dates
            }
          ],
          yAxis: [
            {
              axisLabel: {
                show: true,
                formatter: `{value}%`
              }
              // min: Number(this.main.min * need).toFixed(),
              // max: Number(this.main.max * need).toFixed()
            }
          ]
        }
        // eslint-disable-next-line
        this.tipsRate = Number(eval(trueRates.join('+'))  / this.main.dates.length).toFixed(2)
        this.tipsPrice = Number(sum * this.tipsRate * 0.01).toFixed(2)
        this.tipsText = `应${this.tipsRate < 0 ? '少' : '多'}付供应商:`
        this.tipsRP = null
        this.$refs['ec'].setOption(o)
      },
      async setData3 () {
        this.index = 2
        await this.reflow()
        let rate = _.find(this.allK, {kName: this.sub}).materials[0].rate * 0.01
        let o = {
          series: [
            {
              name: '价格',
              data: this.main.price.map(i => Number(i * rate).toFixed(2))
            },
            {
              name: '预期价格',
              data: this.main.expectPrice.map(i => Number(i * rate).toFixed(2))
            }
          ],
          xAxis: [
            {
              data: this.main.dates
            }
          ],
          yAxis: [
            {
              min: Number(this.main.min * rate).toFixed(),
              max: Number(this.main.max * rate).toFixed()
            }
          ]
        }
        this.$refs['ec'].setOption(o)
      }
    },
    watch: {
      $route () {
        this.setKoptions()
        this.setContactoptions()
      },
      type (v) {
        this.sub = ''
        if (v === '原材料') {
          this.subOptions = this.subjectOptions
          this.sub = '方坯'
        } else {
          if (v === '物资') {
            this.subOptions = this.kOptions
          } else {
            if (v === '合同') {
              this.subOptions = this.contactOptions
            }
          }
        }
      },
      dates (v) {
        if (v) {
          let d = window.$data
          let start = _.findIndex(d, {date: v[0]})
          let end = _.findIndex(d, {date: v[1]})
          this.allData = _.cloneDeep(d.slice(start, end + 1))
          this.setMain()
        }
      }
    }
  }
</script>

<style scoped>
  .tips {
    margin-top: 40px;
    margin-left: 10px;
  }
</style>
