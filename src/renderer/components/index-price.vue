<template>
  <div class="flex-1">
    <div v-if="index !== 2" class="detail" :style="{float: index%2 === 1 ? 'left' : 'right'}">
      <div class="tips color-main">
        <div class="tips-title">{{name}}均价</div>
        <div class="tips-price">{{price}}</div>
        <div class="rate" v-if="rate">
          <!-- <span style="margin-right: 20px;">
            月同比
            <i class="icon iconfont icon-msnui-triangle-down color-red"></i>
            12%
          </span> -->
          <span v-if="rate < 0">
            同期环比
            <i class="icon iconfont icon-msnui-triangle-down color-red"></i>
            {{rate}}%
          </span>
          <span v-if="rate > 0">
            同期环比
            <i class="icon iconfont icon-msnui-triangle-up color-green"></i>
            {{rate}}%
          </span>
        </div>
      </div>
    </div>
    <div class="ec-box color-main" :style="{float: index%2 === 0 ? 'right' : 'left', width: index === 2 ? '100%' : '60%'}">
      <div class="title">
        <span class="price-title" :style="{color: color}">{{name}}</span><span>价格走势图</span>
      </div>
      <div class="ec"></div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import setting from './echarts-price.js'
  export default {
    name: 'echarts-price',
    props: {
      index: {
        type: Number,
        required: true
      },
      k: {
        type: String,
        default: '--'
      },
      price: {
        type: String
      },
      oldPrice: {}
    },
    data () {
      return {
        ec: null,
        textColor: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.ec = echarts.init(this.$el.querySelector('.ec'))
        let options = setting(this.index)
        this.ec.setOption(options)
      },
      setOption (o) {
        this.ec.setOption(o)
      }
    },
    computed: {
      color () {
        let t = this.index % 3
        switch (t) {
          case 0:
            return '#FF5000'
          case 1:
            return '#0070c0'
          case 2:
            return 'Yellow'
        }
      },
      name () {
        switch (this.index) {
          case 0:
            return '方坯'
          case 1:
            return this.k
          case 2:
            return '合同'
        }
      },
      rate () {
        if (this.index === 0) {
          if (this.price && this.oldPrice) {
            return Number(((+this.price - this.oldPrice) / this.oldPrice) * 100).toFixed(2)
          }
        }
        return false
      }
    }
  }
</script>

<style scoped>
  .ec {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .ec-box {
    width: 60%;
    height: 100%;
    position: relative;
  }
  .detail {
    width: 40%;
    height: 100%;
    position: relative;
  }
  .title {
    font-weight: bold;
    font-size: 20px;
    position: absolute;
    top: 20px;
    left: 30px;
  }
  .tips {
    background: #404040;
    border-radius: 20px;
    box-sizing: border-box;
    height: 60%;
    width: 100%;
    position: relative;
    top: 25%;
    padding: 15px 20px;
    box-sizing: border-box;
    position: relative;
  }
  .tips-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .tips-price {
    font-size: 18px;
    font-weight: bold;
  }
  .rate {
    font-size: 14px;
    position: absolute;
    bottom: 20px;
  }
</style>
