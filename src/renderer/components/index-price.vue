<template>
  <div class="flex-1">
    <echarts-price :index="index"></echarts-price>
  </div>
</template>

<script>
  import echartsPrice from './echarts-price.vue'
  export default {
    name: 'index-price',
    props: {
      index: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
      }
    },
    components: {
      echartsPrice
    },
    methods: {
    }
  }
</script>

<style scoped>
</style>
