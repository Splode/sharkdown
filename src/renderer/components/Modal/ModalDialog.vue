<template>
  <div class="col-md-6 mx-auto Modal-dialog-wrapper">
    <div class="Modal-dialog" v-on-clickaway="closeModal">
      <h2 class="Modal-title">Delete Note?</h2>
      <button
        class="Button Button--block Button--block--field"
        @click="confirmDelete">
        Confirm
      </button>
      <button
        class="Button Button--block Button--block--field"
        @click="closeModal">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import Payload from './../../../utils/payload'
import { EventBus } from './../../../utils/event-bus'
import { mixin as clickaway } from 'vue-clickaway'
export default {
  mixins: [ clickaway ],

  methods: {
    closeModal () {
      const payload = new Payload('modalOpen', false)
      this.$store.dispatch('setViewState', payload)
    },

    confirmDelete () {
      EventBus.$emit('note-delete-confirmed')
      this.closeModal()
    }
  }
}
</script>

<style lang="scss" scoped>
.Modal-dialog-wrapper {
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  text-align: center;
}

.Modal-dialog {
  border-radius: 3px;
  padding: 1em 2em 2em 2em;
}

.Modal-title {
  margin-bottom: 1em;
}
</style>
