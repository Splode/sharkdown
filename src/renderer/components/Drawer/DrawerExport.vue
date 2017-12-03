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
          <li 
            class="Settings-list-item" 
            @click="requestEditorData('html')">
            HTML
          </li>
          <li 
            class="Settings-list-item"
            @click="requestEditorData('markdown')">
            Markdown
          </li>
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

    exportText (data, metadata) {
      dialog.showSaveDialog({
        title: `Export to ${metadata.name}`,
        defaultPath: this.settings.currentDoc,
        filters: [
          {
            name: metadata.name,
            extensions: metadata.extensions
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
    EventBus.$on('respond-editor-data', (response) => {
      let metadata = {
        name: '',
        extensions: []
      }
      switch (response.type) {
        case 'text':
          metadata.name = 'Text'
          metadata.extensions.push('txt')
          this.exportText(response.data, metadata)
          break

        case 'html':
          metadata.name = 'HTML'
          metadata.extensions.push('html')
          metadata.extensions.push('htm')
          this.exportText(response.data, metadata)
          break

        case 'markdown':
          metadata.name = 'Markdown'
          metadata.extensions.push('md')
          this.exportText(response.data, metadata)
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
