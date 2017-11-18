<template>
  <div class="col-1 d-flex flex-column align-items-center" @mouseover="toolbarIsActive = true" @mouseout="toolbarIsActive = false">
    <div class="position-fixed d-flex flex-column align-items-center">
      <button class="Button Button--transparent" title="New Document" @click="emitNewDoc" :class="tooltipClasses">
        <icon name="plus" scale="1.5" />
      </button>
      <button class="Button Button--transparent" title="Notes" @click="toggleDrawer('appDrawerFileTree')" :class="tooltipClasses">
        <icon name="plus" scale="1.5" />
      </button>
      <!-- <keep-alive> -->
        <!-- <router-link to="/settings"> -->
          <button class="Button Button--transparent" title="Settings" @click="toggleDrawer('appDrawerSettings')" :class="tooltipClasses">
            <icon name="cog" scale="1.5" />
          </button>
        <!-- </router-link> -->
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
import Payload from './../../../utils/payload'
import { EventBus } from './../../../utils/event-bus'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/cog'
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
      return this.toolbarIsActive ? 'is-active' : 'is-inactive'
    }
  },

  methods: {
    emitNewDoc () {
      console.log('clicked new document')
      EventBus.$emit('newDoc')
    },

    toggleDrawer (drawerComponent) {
      const payloadToggle = new Payload('drawerOpen', !this.drawerOpen)
      const payloadComponent = new Payload('drawerComponent', drawerComponent)
      this.$store.dispatch('setViewState', payloadToggle)
      this.$store.dispatch('setViewState', payloadComponent)
    }
  }
}
</script>

<style lang="scss" scoped>
.Sidebar {
  display: flex;
  flex-direction: column;
  position: fixed;
  // width: 70px;
}
</style>