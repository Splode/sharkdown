<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import cssLoader from './../utils/css-loader'
export default {
  name: 'sharkdown',

  mixins: [ cssLoader ],

  computed: {
    theme () {
      return this.$store.getters.settings.theme.toLowerCase()
    }
  },

  created () {
    const theme = this.theme
    const link = this.createCSS('static/themes/' + theme + '.css')
    this.mountToHead(link)
  }
}
</script>
