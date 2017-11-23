<template>
  <div class="container-fluid Modal">
    <div class="container">
      <div class="row Modal-wrapper">
        <component :is="modalComponent"/>
      </div>
    </div>
  </div>
</template>

<script>
import appModalFilename from './ModalFilename'
export default {
  components: {
    appModalFilename
  },

  computed: {
    modalComponent () {
      return this.$store.getters.viewState.modalComponent
    }
  }
}
</script>

<style lang="scss" scoped>
.Modal {
  position: absolute;
  height: 100vh;
  z-index: 10;
}

.Modal-wrapper {
  height: 100vh;
}
</style>
