<template>
  <div class="col-md-8 mx-auto Modal-filename">
    <div class="Modal-filename-wrapper" v-on-clickaway="closeModal">
      <h2 class="Modal-title">{{ modalTitle }}</h2>
      <label for="filename-input">Title</label>

      <!-- note create -->
      <div class="d-inline" v-if="action === 'note-create'">
        <input type="text" id="filename-input" class="TextInput mb-4 w-100" v-model="filename" @keyup.enter="createNewDoc">
        <button 
          class="Button Button--block Button--block--field" 
          @click="createNewDoc" 
          :disabled="filename === ''">
          Accept
        </button>
      </div>
      
      <!-- note rename -->
      <div class="d-inline" v-else-if="action === 'note-rename'">
        <input type="text" id="filename-input" class="TextInput mb-4 w-100" v-model="filename" @keyup.enter="noteRename">
        <button 
          class="Button Button--block Button--block--field"
          @click="noteRename" 
          :disabled="filename === ''">
          Accept
        </button>
      </div>

      <button class="Button Button--block Button--block--field" @click="closeModal">Cancel</button>
    </div>
  </div>
</template>

<script>
import Payload from './../../../utils/payload'
import { EventBus } from './../../../utils/event-bus'
import { mixin as clickaway } from 'vue-clickaway'
export default {
  mixins: [ clickaway ],

  data () {
    return {
      action: '',
      filename: ''
    }
  },

  computed: {
    modalTitle () {
      this.action = this.viewState.modalAction
      switch (this.viewState.modalAction) {
        case 'note-create':
          this.filename = ''
          return 'New Note'
        case 'note-rename':
          this.filename = this.viewState.activeFile
          return 'Rename Note'
      }
    },

    settings () {
      return this.$store.getters.settings
    },

    viewState () {
      return this.$store.getters.viewState
    }
  },

  methods: {
    closeModal () {
      const payload = new Payload('modalOpen', false)
      this.$store.dispatch('setViewState', payload)
    },

    createNewDoc () {
      const payloadCurrentDoc = new Payload('currentDoc', this.filename)
      const payloadDrawerOpen = new Payload('drawerOpen', false)
      const payloadDrawerComp = new Payload('drawerComponent', '')
      this.$store.dispatch('setSetting', payloadCurrentDoc)
      this.$store.dispatch('setViewState', payloadDrawerOpen)
      this.$store.dispatch('setViewState', payloadDrawerComp)
      EventBus.$emit('new-doc-title-created')
      this.closeModal()
    },

    noteRename () {
      const payload = {
        oldName: this.viewState.activeFile,
        newName: this.filename
      }
      EventBus.$emit('note-renamed', payload)
      this.closeModal()
    }
  },

  mounted () {
    document.getElementById('filename-input').focus()
  }
}
</script>

<style>
.Modal-filename {
  padding-top: 80px;
}

.Modal-filename-wrapper {
  border-radius: 3px;
  padding: 3em 3em 4em 3em;
}
</style>
