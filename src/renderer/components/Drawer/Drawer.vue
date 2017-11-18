<template>
  <div class="Drawer" :class="drawerClass">
    <div class="container Drawer-wrapper">
      <slot></slot>
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
  position: fixed;
  top: 0;
  bottom: 0;
  transition: all .6s ease;
  width: 400px;
  height: 100%;
  word-wrap: break-word;
  z-index: 1;
  &.is-closed {
    animation: fade-out .3s ease forwards;
    // display: none;
    // opacity: 0;
    // transform: translateX(-100vw);
  }
  &.is-open {
    // border-right: 2px solid;
    // opacity: 1;
    // transform: translateX(0);
    animation: fade-in .3s ease forwards;
  }
}

.Drawer-wrapper {
  padding-top: 80px;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateX(-400px);
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
    transform: translateX(-400px);
  }
}
</style>
