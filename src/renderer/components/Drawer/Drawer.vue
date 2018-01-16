<template>
  <div class="Drawer" :class="drawerClass">
    <div class="container Drawer-wrapper">
      <div class="row">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    drawerOpen () {
      return this.$store.getters.viewState.drawerOpen
    },

    drawerClass () {
      return this.drawerOpen ? 'is-open' : 'is-closed'
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/_variables.scss';

.Drawer {
  overflow-y: auto;
  padding-right: 2em;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 420px;
  height: 100%;
  word-wrap: break-word;
  z-index: 2;
  &.is-closed {
    animation: fade-out .3s ease forwards;
  }
  &.is-open {
    animation: fade-in .3s ease forwards;
  }
}

.Drawer-wrapper {
  padding-top: 80px;
  padding-bottom: 2em;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateX(-420px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-420px);
  }
}
</style>
