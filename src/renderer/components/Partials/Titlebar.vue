<template>
  <div class="Titlebar container-fluid">
    <div class="container">
      <div class="row">
        <div class="col-6 offset-1 Titlebar-section Titlebar-section--title">
          {{ settings.currentDoc }}
        </div>
        <div class="Titlebar-section Titlebar-section--windowControls">
          <div class="Titlebar-section-icon" @click="winMinimize">
            <svg class="" width="10px" height="11px" viewBox="0 0 10 11">
              <g stroke="none" stroke-width="" fill-rule="evenodd">
                <g class="fill">
                  <rect id="minimize" x="0" y="5" width="10" height="1"></rect>
                </g>
              </g>
            </svg>
          </div>
          <div class="Titlebar-section-icon" v-if="!winIsMaximized" @click="winMaxHandler">
            <svg class="" width="10px" height="11px" viewBox="0 0 10 11">
              <g stroke="none" stroke-width="1" fill-rule="evenodd">
                <g fill-rule="nonzero" class="fill">
                  <path d="M1,9 L9,9 L9,1 L1,1 L1,9 Z M0,0 L10,0 L10,10 L0,10 L0,0 Z"></path>
                </g>
              </g>
            </svg>
          </div>
          <div class="Titlebar-section-icon" v-else @click="winMaxHandler">
            <svg class="" width="10px" height="11px" viewBox="0 0 10 11">
              <g stroke="none" stroke-width="1" fill-rule="evenodd">
                  <g class="fill">
                      <polygon points="8 8 10 8 10 7 8 7"></polygon>
                      <polygon points="2 0 2 3 3 3 3 0"></polygon>
                      <polygon points="9 0 9 8 10 8 10 0"></polygon>
                      <polygon points="2 1 10 1 10 0 2 0"></polygon>
                      <path d="M1,3 L1,9 L7,9 L7,3 L1,3 Z M0,2 L8,2 L8,10 L0,10 L0,2 Z" fill-rule="nonzero"></path>
                  </g>
              </g>
          </svg>
          </div>
          <div class="Titlebar-section-icon Titlebar-section-icon--danger" @click="winClose">
            <svg class="" width="10px" height="11px" viewBox="0 0 10 11">
              <g stroke="none" stroke-width="1" fill-rule="evenodd">
                <g fill-rule="nonzero" class="fill">
                  <path d="M5,4.82101759 L0.678982409,0.5 L0,1.17898241 L4.32101759,5.5 L0,9.82101759 L0.678982409,10.5 L5,6.17898241 L9.32101759,10.5 L10,9.82101759 L5.67898241,5.5 L10,1.17898241 L9.32101759,0.5 L5,4.82101759 Z"></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Payload from './../../../utils/payload'
export default {
  computed: {
    settings () {
      return this.$store.getters.settings
    },

    winIsMaximized () {
      return this.$store.getters.viewState.winIsMaximized
    }
  },

  methods: {
    resizeHandler () {
      ipcRenderer.on('win-resized', (event, arg) => {
        this.setState('winIsMaximized', arg)
      })
    },

    setState (key, val) {
      const payload = new Payload(key, val)
      this.$store.dispatch('setViewState', payload)
    },

    winClose () {
      ipcRenderer.send('window-close')
    },

    winMaxHandler () {
      if (this.winIsMaximized) {
        ipcRenderer.send('window-unmaximize')
      } else {
        ipcRenderer.send('window-maximize')
      }
    },

    winMinimize () {
      ipcRenderer.send('window-minimize')
    }
  },

  mounted () {
    this.resizeHandler()
  }
}
</script>

<style lang="scss" scoped>
.Titlebar {
  align-items: center;
  display: flex;
  // justify-content: space-between;
  padding-top: 1px;
  position: fixed;
  // width: 100vw;
  height: 36px;
  z-index: 10;
  -webkit-app-region: drag;
}

.Titlebar-section {
  display: flex;
  flex: 0 0 auto;
}

.Titlebar-section--windowControls {
  position: absolute;
  top: 0;
  right: 0;
  height: 36px;
  -webkit-app-region: no-drag;
}

.Titlebar-section-icon {
  align-items: center;
  cursor: default;
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  transition: all .3s ease;
  width: 50px;
  height: 100%;
}
</style>
