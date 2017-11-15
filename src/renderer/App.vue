<template>
  <div id="app">
    <app-header/>
    <div class="container App-container">
      <!-- <div class="row"> -->
        <app-sidebar/>
        <router-view/>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import cssLoader from './../utils/css-loader'
import LocalStore from './../utils/local-store'
import appHeader from './components/Partials/Header'
import appSidebar from './components/Partials/Sidebar'
export default {
  name: 'sharkdown',

  components: {
    appHeader,
    appSidebar
  },

  mixins: [ cssLoader ],

  methods: {
    loadTheme () {
      const localStore = new LocalStore({
        configName: 'editor-settings',
        dirName: 'settings',
        defaults: {
          theme: 'Dracula',
          font: 'Fira Sans'
        }
      })
      const theme = localStore.get('theme')
      const link = this.createCSS('static/themes/' + theme + '.css')
      this.mountToHead(link)
    }
  },

  mounted () {
    this.loadTheme()
  }
}
</script>

<style lang="scss" scoped>
.App-container {
  padding: 80px 0 0 0;
}
</style>
