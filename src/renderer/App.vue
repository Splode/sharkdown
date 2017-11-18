<template>
  <div id="app">
    <app-header/>
    <div class="container App-container">
      <app-drawer>
        <component :is="drawerComponent"/>
      </app-drawer>
      <div class="row Test" :class="{ 'is-compressed': drawerOpen }">
        <app-sidebar/>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import cssLoader from './../utils/css-loader'
import { editorSettings } from './../utils/defaultStore'
import appDrawer from './components/Drawer/Drawer'
import appDrawerFileTree from './components/Drawer/DrawerFileTree'
import appDrawerSettings from './components/Drawer/DrawerSettings'
import appHeader from './components/Partials/Header'
import appSidebar from './components/Partials/Sidebar'
export default {
  name: 'sharkdown',

  components: {
    appDrawer,
    appDrawerFileTree,
    appDrawerSettings,
    appHeader,
    appSidebar
  },

  mixins: [ cssLoader ],

  computed: {
    drawerComponent () {
      return this.$store.getters.viewState.drawerComponent
    },

    drawerOpen () {
      return this.$store.getters.viewState.drawerOpen
    }
  },

  methods: {
    loadTheme () {
      const localStore = editorSettings()
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
@import './assets/_variables.scss';

.App-container {
  padding: 80px 0 0 0;
}

.Test {
  transition: $transitionPrimary;
  &.is-compressed {
    // margin-left: 300px;
    overflow: hidden;
    transform: translateX(400px)
  }
}
</style>
