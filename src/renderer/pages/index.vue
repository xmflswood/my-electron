<template>
  <div :style="{height: boxHeight}" class="flex-column">
    <div v-if="canShow" class="flex-column wh-100" style="padding: 10px 0;box-sizing: border-box;">
      <index-price v-for="(i, index) in source" :key="i" :index="index"></index-price>
    </div>
  </div>
</template>

<script>
  import indexPrice from '../components/index-price.vue'
  export default {
    name: 'index',
    components: {
      indexPrice
    },
    data () {
      return {
        source: [1, 2, 3],
        boxHeight: '',
        canShow: false
      }
    },
    mounted () {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    methods: {
      setHeight () {
        this.canShow = false
        let l = this.source.length
        let height = document.getElementById('data').offsetHeight
        let itemHeight = height / 3
        this.boxHeight = l * itemHeight + 'px'
        this.$nextTick(() => {
          this.canShow = true
        })
      }
    }
  }
</script>

<style scoped>
</style>
