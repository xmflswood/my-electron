<template>
  <div :style="{height: boxHeight}" class="flex-column">
    <div v-if="canShow" class="flex-column wh-100" style="padding: 10px 0;box-sizing: border-box;">
      <div>
        <el-date-picker
          v-model="dates"
          type="daterange"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions">
        </el-date-picker>
        <div class="selector">
          <span class="color-main">物资选择：</span>
          <el-select v-model="k" style="width: 150px;">
            <el-option
              v-for="item in kOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="selector">
          <span class="color-main">合同选择:</span>
          <el-select v-model="contactNum" style="width: 150px;">
            <el-option
              v-for="item in contactOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </div>
      <index-price
        v-for="(i, index) in source"
        :k="k"
        :price="prices[index]"
        :oldPrice="oldPrices[index]"
        :key="i"
        :index="index"
        :ref="'e' + index">
      </index-price>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import indexPrice from '../components/index-price.vue'
  import {remote} from 'electron'
  const path = require('path')
  const fs = require('fs')
  export default {
    name: 'index',
    components: {
      indexPrice
    },
    data () {
      return {
        source: [1, 2, 3],
        boxHeight: '',
        canShow: false,
        dates: '',
        allData: [],
        oldAllData: [],
        k: '--',
        allK: [],
        kOptions: [],
        allContact: [],
        contactOptions: [],
        contactNum: '',
        pickerOptions: {
          disabledDate (t) {
            t = +new Date(t) + window.$h8
            return !window.$data.some((i) => +new Date(i.date) === t)
          }
        },
        main: {
          price: [],
          expectPrice: [],
          min: null,
          max: null,
          dates: []
        },
        prices: ['--', '--'],
        oldPrices: []
      }
    },
    mounted () {
      this.setHeight()
      let debounceHeight = _.debounce(this.setHeight, 200)
      window.addEventListener('resize', debounceHeight)
      this.setKoptions()
      this.setContactoptions()
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
      setHeight () {
        this.canShow = false
        let l = this.source.length
        let height = document.getElementById('data').offsetHeight
        let itemHeight = height / 3
        this.boxHeight = l * itemHeight + 'px'
        this.$nextTick(() => {
          this.canShow = true
          this.$nextTick(() => {
            if (this.dates && this.dates.length > 0) {
              this.setData0()
              this.setData1()
              this.setData2()
            }
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
      setData0 () {
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
        this.$refs['e0'][0].setOption(o)
        // eslint-disable-next-line
        this.$set(this.prices, 0, Number(eval(this.main.price.join('+'))  / this.main.dates.length).toFixed(2))
        if (this.oldAllData.length > 0) {
          // eslint-disable-next-line
          this.$set(this.oldPrices, 0, Number(eval(this.oldAllData.map(i => i.price).join('+'))  / this.main.dates.length).toFixed(2))
        }
      },
      setData1 () {
        if (!this.k || this.k === '--') return
        let rate = _.find(this.allK, {kName: this.k}).materials[0].rate * 0.01
        let truePrice = this.main.price.map(i => Number(i * rate).toFixed(2))
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
        this.$refs['e1'][0].setOption(o)
        // eslint-disable-next-line
        this.$set(this.prices, 1, Number(eval(truePrice.join('+'))  / this.main.dates.length).toFixed(2))
        if (this.oldAllData.length > 0) {
          // eslint-disable-next-line
          this.$set(this.oldPrices, 1, Number(eval(this.oldAllData.map(i => i.price).map(i => Number(i * rate).toFixed(2)).join('+'))  / this.main.dates.length).toFixed(2))
        }
      },
      setData2 () {
        if (!this.contactNum) return
        const dbPath = process.env.NODE_ENV === 'production' ? path.resolve(remote.app.getAppPath(), '../', 'else-db.json') : path.resolve(remote.app.getAppPath(), 'else-db.json')
        let contactRate = JSON.parse(fs.readFileSync(dbPath)).contactRate * 100
        let contact = _.find(this.allContact, {contactNum: this.contactNum})
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
        this.$set(this.prices, 2, Number(eval(this.main.price.join('+'))  / this.main.dates.length).toFixed(2))
        this.$refs['e2'][0].setOption(o)
      }
    },
    watch: {
      $route () {
        this.setContactoptions()
        this.setKoptions()
      },
      dates (v) {
        if (v) {
          let d = window.$data
          let start = _.findIndex(d, {date: v[0]})
          let end = _.findIndex(d, {date: v[1]})
          let ot = end - start + 1
          this.oldAllData = []
          this.oldPrices = []
          if (start - ot >= 0) {
            this.oldAllData = _.cloneDeep(d.slice((start - ot), end + 1 - ot))
          }
          this.allData = _.cloneDeep(d.slice(start, end + 1))
          this.setMain()
          this.setData0()
          this.setData1()
          this.setData2()
        }
      },
      k () {
        this.setData1()
      },
      contactNum () {
        this.setData2()
      }
    }
  }
</script>

<style scoped>
  .selector {
    display: inline-block;
    width: 250px;
    margin-left: 20px;
  }
</style>
