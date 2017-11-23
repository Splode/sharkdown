<template>
  <div class="col-1 d-flex flex-column align-items-center" @mouseover="toolbarIsActive = true" @mouseout="toolbarIsActive = false">
  <!-- <div class="col-1 d-flex flex-column align-items-center"> -->
    <div class="Sidebar Sidebar--fixed pb-5" :class="sidebarClasses">

      <div 
        class="Icon-wrapper--circle" 
        title="New Document" 
        style="margin-bottom: 75px"
        @click="newDoc">
        <svg 
          version="1.2" 
          baseProfile="tiny" 
          id="Layer_1" 
          class="Icon Icon--new"
          xmlns="http://www.w3.org/2000/svg" 
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px" y="0px" 
          viewBox="0 0 35 35" 
          xml:space="preserve">
          <line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="17.5" y1="25" x2="17.5" y2="10"/>
          <line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="10" y1="17.5" x2="25" y2="17.5"/>
        </svg>
      </div>

      <div class="Icon-group">
        <div 
        class="Icon-wrapper" 
        title="Notes" 
        @click="toggleDrawer('appDrawerFileTree')">
        <svg 
          version="1.2" 
          baseProfile="tiny" 
          id="Layer_1" 
          class="Icon Icon--files"
          xmlns="http://www.w3.org/2000/svg" 
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px" y="0px" 
          viewBox="0 0 35 35" 
          xml:space="preserve"
          :class="{ 'is-selected': viewState.drawerComponent === 'appDrawerFileTree' && viewState.drawerOpen }">
            <rect class="Icon--files-secondary" x="7.7" y="13.1" fill="#FFFFFF" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
              width="11.9" height="16.6" />

            <rect class="Icon--files-secondary" x="11.5" y="9.2" fill="#FFFFFF" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
              width="11.9" height="16.6" />
            <rect class="Icon--files-primary" x="15.4" y="5.3" fill="#FFFFFF" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
              width="11.9" height="16.6" />
        </svg>
      </div>

      <div 
        class="Icon-wrapper" 
        title="Settings" 
        @click="toggleDrawer('appDrawerSettings')">
        <svg class="Icon Icon--slider" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px" viewBox="0 0 35 35" xml:space="preserve"
        :class="{ 'is-selected': viewState.drawerComponent === 'appDrawerSettings' && viewState.drawerOpen }">
          <line fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" x1="4.5" y1="7.5" x2="29.5" y2="7.5"/>
          <circle fill-rule="evenodd" fill="#FFFFFF" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" cx="19.5" cy="7.5" r="3"/>
          <line fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" x1="4.5" y1="17.5" x2="29.5" y2="17.5"/>
          <circle fill-rule="evenodd" fill="#FFFFFF" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" cx="7.5" cy="17.5" r="3"/>
          <line fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" x1="4.5" y1="27.5" x2="29.5" y2="27.5"/>
          <circle fill-rule="evenodd" fill="#FFFFFF" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" cx="26.5" cy="27.5" r="3"/>
        </svg>
      </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import Payload from './../../../utils/payload'
import { EventBus } from './../../../utils/event-bus'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/cog'
import 'vue-awesome/icons/list'
import 'vue-awesome/icons/plus'
export default {
  components: {
    Icon
  },

  data () {
    return {
      toolbarIsActive: false
    }
  },

  computed: {
    drawerOpen () {
      return this.$store.getters.viewState.drawerOpen
    },

    settings () {
      return this.$store.getters.settings
    },

    sidebarClasses () {
      if (!this.settings.focusMode || this.drawerOpen) {
        return 'is-active'
      } else if (!this.toolbarIsActive) {
        return 'is-inactive'
      }
    },

    viewState () {
      return this.$store.getters.viewState
    }
  },

  methods: {
    emitNewDoc () {
      console.log('clicked new document')
      EventBus.$emit('new-doc-init')
    },

    newDoc () {
      const payloadModalToggle = new Payload('modalOpen', true)
      const payloadModalComponent = new Payload('modalComponent', 'appModalFilename')
      this.$store.dispatch('setViewState', payloadModalToggle)
      this.$store.dispatch('setViewState', payloadModalComponent)
    },

    toggleDrawer (drawerComponent) {
      if (this.drawerOpen) {
        drawerComponent = ''
      }
      const payloadToggle = new Payload('drawerOpen', !this.drawerOpen)
      const payloadComponent = new Payload('drawerComponent', drawerComponent)
      this.$store.dispatch('setViewState', payloadToggle)
      this.$store.dispatch('setViewState', payloadComponent)
    }
  }
}
</script>

<style lang="scss">
.Sidebar {
  align-items: center;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  padding-top: 100px;
  transition: all .3s ease;
  height: 100%;
  &.is-inactive {
    opacity: 0;
  }
  &.is-active {
    opacity: 1;
  }
}

.Sidebar--fixed {
  position: fixed;
}
</style>