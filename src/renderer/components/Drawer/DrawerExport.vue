<template>
  <div class="col-12">
    <div class="row">
      <div class="col-12">
        <h1>Export to...</h1>
      </div>
      <div class="col-12 Section">
        <ul class="Settings-list">
          <li 
            class="Settings-list-item"
            @click="requestEditorData('text')">
            Plain Text
          </li>
          <li class="Settings-list-item">HTML</li>
          <li class="Settings-list-item">Markdown</li>
          <li class="Settings-list-item">PDF</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import path from 'path'
import fs from 'fs'
import { EventBus } from './../../../utils/event-bus'

const dialog = require('electron').remote.dialog

export default {
  computed: {
    settings () {
      return this.$store.getters.settings
    }
  },

  methods: {
    requestEditorData (type) {
      EventBus.$emit('request-editor-data', type)
    },

    exportText (data) {
      dialog.showSaveDialog({
        title: 'Export to Plain Text',
        defaultPath: this.settings.currentDoc,
        filters: [
          {
            name: 'Text',
            extensions: ['txt']
          }
        ]
      }, function (fileName) {
        if (fileName === undefined || '') return

        fs.writeFile(fileName, data, (err) => {
          if (err) console.log(err)
        })
      })
    }
  },

  mounted () {
    EventBus.$on('respond-editor-data', (payload) => {
      switch (payload.type) {
        case 'text':
          this.exportText(payload.data)
          break

        default:
          break
      }
    })
  }
}
</script>

<style>

</style>
