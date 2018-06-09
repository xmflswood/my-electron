<template>
  <div class="flex-1">
    <div class="detail" :style="{float: index%2 === 1 ? 'left' : 'right'}">
      <div class="tips color-main">
        <div class="tips-title">方坯均价</div>
        <div class="tips-price">1233</div>
        <div class="rate">
          <span style="margin-right: 20px;">
            月同比
            <i class="icon iconfont icon-msnui-triangle-down color-red"></i>
            12%
          </span>
          <span>
            月环比
            <i class="icon iconfont icon-msnui-triangle-up color-green"></i>
            12%
          </span>
        </div>
      </div>
    </div>
    <div class="ec-box color-main" :style="{float: index%2 === 0 ? 'right' : 'left'}">
      <div class="title">
        <span class="price-title" :style="{color: color}">方坯</span><span>价格走势图</span>
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
      }
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
