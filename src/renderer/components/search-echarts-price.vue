<template>
  <div class="wh-100">
    <div class="ec"></div>
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
    }
  }
</script>

<style scoped>
  .ec {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
