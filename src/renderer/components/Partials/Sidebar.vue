<template>
  <div class="col-1 d-flex flex-column align-items-center" @mouseover="toolbarIsActive = true" @mouseout="toolbarIsActive = false">
  <!-- <div class="col-1 d-flex flex-column align-items-center"> -->
    <div class="Sidebar Sidebar--fixed" :class="tooltipClasses">
      <button 
        class="Button Button--transparent" 
        title="New Document" 
        @click="newDoc">
        <icon name="plus" scale="1.5" />
      </button>
      <button 
        class="Button Button--transparent" 
        title="Notes" 
        @click="toggleDrawer('appDrawerFileTree')" 
        :class="{ 'is-selected': viewState.drawerComponent === 'appDrawerFileTree' && viewState.drawerOpen }">
        <icon name="list" scale="1.5" />
      </button>
      <button 
        class="Button Button--transparent" 
        title="Settings" 
        @click="toggleDrawer('appDrawerSettings')" 
        :class="{ 'is-selected': viewState.drawerComponent === 'appDrawerSettings' && viewState.drawerOpen }">
        <icon name="cog" scale="1.5" />
      </button>
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

    tooltipClasses () {
      return (this.toolbarIsActive || this.viewState.drawerOpen) ? 'is-active' : 'is-inactive'
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
      const payload = new Payload('modalOpen', true)
      this.$store.dispatch('setViewState', payload)
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
  padding-top: 100px;
  // position: fixed;
  transition: all .3s ease;
  &.is-inactive {
    opacity: .1;
  }
  &.is-active {
    opacity: 1;
  }
}

.Sidebar--fixed {
  position: fixed;
}
</style>