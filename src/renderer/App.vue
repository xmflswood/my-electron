<template>
  <div id="app" class="flex">
    <template v-if="wlc">
      <welcome @confirm="wlc = false"></welcome>
    </template>
    <template v-else>
      <side-bar></side-bar>
      <div id="data" class="flex-1">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </template>
  </div>
</template>

<script>
  import sideBar from './components/side-bar.vue'
  import welcome from './components/welcome.vue'
  
  export default {
    name: 'dw',
    data () {
      return {
        wlc: true
      }
    },
    components: {
      sideBar,
      welcome
    }
  }
</script>

<style>
</style>
