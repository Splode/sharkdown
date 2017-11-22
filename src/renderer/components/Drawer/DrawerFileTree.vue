<template>
  <div class="col-12 Drawer-fileTree">
    <div class="row">
      <div class="col-12">
        <h1 @contextmenu="test">Notes</h1>
      </div>
      <div class="col-12 Section">
        <ul class="Settings-list">
          <li 
            class="Settings-list-item" 
            v-for="(file, i) in files" 
            @click="selectFile(file)"
            @contextmenu="openContextMenu($event, file, i)"
            :class="{ 'is-active': file === settings.currentDoc }"
            :key="'file-' + i">
            {{ file }}
            <div 
              class="Settings-contextMenu"
              v-if="contextMenu.isOpen && contextMenu.index === i"
              :style="contextMenu.pos">
              <ul class="Settings-contextMenu-list">
                <li>TEST</li>
              </ul>
            </div>
          </li>
        </ul>
        
      </div>
    </div>
  </div>
</template>

<script>
import path from 'path'
import fs from 'fs'
import Payload from './../../../utils/payload'
import { EventBus } from './../../../utils/event-bus'
export default {
  data () {
    return {
      files: [],
      contextMenu: {
        isOpen: false,
        pos: {
          top: 0,
          left: 0
        },
        file: '',
        index: ''
      }
    }
  },

  computed: {
    defaultDocPath () {
      return path.join(this.$store.getters.userDataPath, this.settings.documentDir)
    },

    settings () {
      return this.$store.getters.settings
    }
  },

  methods: {
    openContextMenu (e, file, i) {
      console.log(e, file, i)
      this.contextMenu.isOpen = true
      this.contextMenu.pos.top = (e.layerY + 50) + 'px'
      this.contextMenu.pos.left = e.layerX + 'px'
      this.contextMenu.file = file
      this.contextMenu.index = i
    },

    readDir () {
      let path
      if (this.settings.userDir) {
        path = this.settings.userDir
      } else {
        path = this.defaultDocPath
      }
      const files = fs.readdirSync(path)
      const prettyFiles = files.map(file => this.removeFileExt(file))
      this.files = prettyFiles
    },

    removeFileExt (file) {
      return file.replace(/\.[^/.]+$/, '')
    },

    selectFile (file) {
      const fileNoExt = this.removeFileExt(file)
      const payloadDoc = new Payload('currentDoc', fileNoExt)
      const payloadDrawer = new Payload('drawerOpen', false)
      this.$store.dispatch('setSetting', payloadDoc)
      this.$store.dispatch('setViewState', payloadDrawer)
      EventBus.$emit('loadDoc', fileNoExt)
    },

    test () {
      console.log('tested')
    }
  },

  created () {
    this.readDir()
  }
}
</script>

<style lang="scss">
.Settings-contextMenu {
  background-color: lightgray;
  padding: 1em;
  position: absolute;
}

.Settings-contextMenu-list {
  margin: 0;
  padding: 0;
}
</style>
