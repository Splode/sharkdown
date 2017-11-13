<template>
  <div id="app">
    <app-header/>
    <div class="container App-container">
      <div class="row">
        <app-sidebar/>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import cssLoader from './../utils/css-loader'
import appHeader from './components/Partials/Header'
import appSidebar from './components/Partials/Sidebar'
export default {
  name: 'sharkdown',

  components: {
    appHeader,
    appSidebar
  },

  mixins: [ cssLoader ],

  computed: {
    theme () {
      return this.$store.getters.settings.theme.toLowerCase()
    }
  },

  created () {
    const theme = this.theme
    const link = this.createCSS('static/themes/' + theme + '.css')
    this.mountToHead(link)
  }
}
</script>

<style lang="scss" scoped>
.App-container {
  padding: 80px 0 0 0;
}
</style>
