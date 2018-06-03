<template>
  <div id="app" class="flex">
    <side-bar></side-bar>
    <div id="data" class="flex-1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import sideBar from './components/side-bar.vue'

  export default {
    name: 'dw',
    components: {
      sideBar
    }
  }
</script>

<style>
</style>
