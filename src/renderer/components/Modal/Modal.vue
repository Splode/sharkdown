<template>
  <div class="container-fluid Modal">
    <div class="container">
      <div class="row Modal-wrapper">
        <app-modal-filename/>
      </div>
    </div>
  </div>
</template>

<script>
import appModalFilename from './ModalFilename'
export default {
  components: {
    appModalFilename
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
