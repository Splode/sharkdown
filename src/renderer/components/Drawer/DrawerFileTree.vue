<template>
  <div class="col-12 Drawer-fileTree">
    <div class="row">
      <div class="col-12">
        <h1>Notes</h1>
      </div>
      <div class="col-12 Section">
        <ul class="Settings-list">
          <li 
            class="Settings-list-item" 
            v-for="(file, i) in files" 
            @click="selectFile(file)" 
            :class="{ 'is-active': file === settings.currentDoc }"
            :key="'file-' + i">
            {{ file }}
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
      files: []
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
    }
  },

  created () {
    this.readDir()
  }
}
</script>

<style>

</style>
