<template>
  <!-- <div class="container">
    <div class="row"> -->
      <div class="col-11 ml-auto Settings">
      <div class="col-12">
        <h1>Settings</h1>
      </div>
      <div class="col-12">
        <router-link to="/"><h1>BACK</h1></router-link>
        <h2>Font</h2>
        <ul>
          <li 
            class="Settings-item"
            v-for="font in fonts" 
            @click="selectFont(font)"
            :class="{ 'is-active': settings.font === font }"
            :style="{ 'font-family': font }"
            :key="generateKey()">
              {{ font }}
          </li>
        </ul>
        <h2>Theme</h2>
        <button @click="selectTheme('oneDark')">Blank</button>
        <button @click="selectTheme('dracula')">Dracula</button>
      </div>
      </div>
    <!-- </div>
  </div> -->
</template>

<script>
import Payload from './../../utils/payload'
import cssLoader from './../../utils/css-loader'
import keygen from './../../utils/key'
export default {
  mixins: [ cssLoader, keygen ],

  data () {
    return {
      fonts: [
        'Fira Sans',
        'Inconsolata',
        'Lato',
        'Lora',
        'Open Sans',
        'Roboto',
        'Roboto Condensed'
      ]
    }
  },

  computed: {
    settings () {
      return this.$store.getters.settings
    }
  },

  methods: {
    selectFont (font) {
      const payload = new Payload('font', font)
      this.$store.dispatch('setSetting', payload)
    },

    selectTheme (theme) {
      const payload = new Payload('theme', theme)
      this.appendTheme(theme, () => {
        this.removeTheme(theme)
      })
      this.$store.dispatch('setSetting', payload)
    },

    appendTheme (theme) {
      const link = this.createCSS('static/themes/' + theme + '.css')
      this.mountToHead(link)
    },

    removeTheme (theme) {
      const link = this.createCSS('static/images' + theme + '.css')
      this.removeTheme(link)
    }
  }
}
</script>

<style lang="scss" scoped>

.Settings-item {
  cursor: pointer;
}

</style>
