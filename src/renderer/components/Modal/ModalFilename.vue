<template>
  <div class="col-md-8 mx-auto Modal-filename">
    <div class="Modal-filename-wrapper" v-on-clickaway="closeModal">
      <h2>New Note</h2>
      <label for="filename-input">Title</label>
      <input type="text" id="filename-input" class="TextInput mb-4 w-100" v-model="filename">
      <button class="Button Button--block Button--block--field" @click="createNewDoc" :disabled="filename === ''">Accept</button>
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
      filename: ''
    }
  },

  methods: {
    closeModal () {
      const payload = new Payload('modalOpen', false)
      this.$store.dispatch('setViewState', payload)
    },

    createNewDoc () {
      const payload = new Payload('currentDoc', this.filename)
      this.$store.dispatch('setSetting', payload)
      EventBus.$emit('new-doc-title-created')
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
