<template>
  <div id="app">
    <transition name="slide-down">
      <app-modal v-if="modalOpen"/>
    </transition>

    </app-modal>
    <app-titlebar/>
    <div class="container-fluid" style="overflow: auto">
      <div class="container App-container" :class="{ 'is-blurred': modalOpen }">
      <app-drawer>
        <transition name="fade">
          <component :is="drawerComponent"/>
        </transition>
      </app-drawer>
      <div class="row Test" :class="{ 'is-compressed': drawerOpen }">
        <app-sidebar/>
        <router-view/>
      </div>
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
import appModal from './components/Modal/Modal'
import appSidebar from './components/Partials/Sidebar'
import appTitlebar from './components/Partials/Titlebar'
export default {
  name: 'sharkdown',

  components: {
    appDrawer,
    appDrawerFileTree,
    appDrawerSettings,
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
  // overflow: auto;
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
    transform: translateX(430px)
  }
}
</style>
