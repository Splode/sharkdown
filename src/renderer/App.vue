<template>
  <div id="app">
    <app-modal v-if="modalOpen">

    </app-modal>
    <app-titlebar/>
    <app-header/>
    <div class="container App-container" :class="{ 'is-blurred': modalOpen }">
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
import appModal from './components/Modal/Modal'
import appSidebar from './components/Partials/Sidebar'
import appTitlebar from './components/Partials/Titlebar'
export default {
  name: 'sharkdown',

  components: {
    appDrawer,
    appDrawerFileTree,
    appDrawerSettings,
    appHeader,
    appModal,
    appSidebar,
    appTitlebar
  },

  mixins: [ cssLoader ],

  computed: {
    drawerComponent () {
      return this.$store.getters.viewState.drawerComponent
    },

    drawerOpen () {
      return this.$store.getters.viewState.drawerOpen
    },

    modalOpen () {
      return this.$store.getters.viewState.modalOpen
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
  // margin-top: 80px;
  // padding: 80px 0 0 0;
  &.is-blurred {
    opacity: .33;
    pointer-events: none;
  }
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
