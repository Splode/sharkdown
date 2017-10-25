<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
const cssLoader = require('./../utils/css-loader')
export default {
  name: 'sharkdown',

  created () {
    const link = cssLoader.createCSS('static/themes/dracula.css')
    cssLoader.mountToHead(link)
  }
}
</script>
