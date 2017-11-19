<template>
  <ul>
    <li 
      v-for="(file, i) in files" 
      @click="selectFile(file)"
      @click.right="test"
      :key="'file-' + i">
      {{ file | removeFileExt }}
    </li>
  </ul>
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

  filters: {
    removeFileExt (file) {
      return file.replace(/\.[^/.]+$/, '')
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
      this.files = fs.readdirSync(path)
    },

    removeFileExt (file) {
      return file.replace(/\.[^/.]+$/, '')
    },

    selectFile (file) {
      const fileNoExt = this.removeFileExt(file)
      const payload = new Payload('currentDoc', fileNoExt)
      this.$store.dispatch('setSetting', payload)
      EventBus.$emit('loadDoc', fileNoExt)
    },

    test () {
      console.log('right click')
    }
  },

  mounted () {
    this.readDir()
  }
}
</script>

<style>

</style>
