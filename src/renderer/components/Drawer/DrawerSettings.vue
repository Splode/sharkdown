<template>
  <div class="col Settings">
    <div class="row">
      <div class="col-12">
        <h1>Settings</h1>
      </div>

      <!-- <div class="row"> -->
      <div class="col-12 Section">
        <h2 class="Section-title">Editor</h2>
        <h3 class="Section-subtitle">Font</h3>
        <ul class="Settings-list">
          <li class="Settings-list-item" v-for="font in fonts" @click="selectFont(font)" :class="{ 'is-active': settings.font === font }"
            :style="{ 'font-family': font }" :key="font">
            <span class="RadioButton"></span>
            <label class="RadioButton-label" :for="font">{{ font }}</label>
            <input type="radio" :id="font">
          </li>
        </ul>
        <h3 class="Section-subtitle">Font Size</h3>
        <input type="range" min=".75" max="1.375" step=".125" class="Slider" @change="selectFontSize" :value="settings.fontSize">
        <div class="Slider-label">
          <ul class="Slider-label-list">
            <li v-for="number in 6" :key="number">|</li>
          </ul>
        </div>
        <h3 class="Section-subtitle">Line Height</h3>
        <input type="range" min="1.25" max="3" step=".25" class="Slider" @change="selectLineHeight" :value="settings.lineHeight">
        <div class="Slider-label">
          <ul class="Slider-label-list">
            <li v-for="number in 8" :key="number">|</li>
          </ul>
        </div>
      </div>

      <div class="col-12 Section">
        <h2 class="Section-title">Theme</h2>
        <button @click="selectTheme('dracula')">Dracula</button>
        <button @click="selectTheme('oneDark')">One Dark</button>
        <button @click="selectTheme('monokai')">Monokai</button>
      </div>

      <div class="col-12 Section">
        <h2 class="Section-title">Document Location</h2>
        <p>{{ settings.userDir }}</p>
        <label for="chooseUserDir">Choose</label>
        <input id="chooseUserDir" type="file" @change="onFileChange" webkitdirectory/>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import Payload from './../../../utils/payload'
import cssLoader from './../../../utils/css-loader'
import keygen from './../../../utils/key'
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

    selectFontSize (e) {
      const size = e.target.value
      const payload = new Payload('fontSize', size)
      this.$store.dispatch('setSetting', payload)
    },

    selectLineHeight (e) {
      const height = e.target.value
      const payload = new Payload('lineHeight', height)
      this.$store.dispatch('setSetting', payload)
    },

    selectTheme (theme) {
      const payload = new Payload('theme', theme)
      this.appendTheme(theme)
      this.$store.dispatch('setSetting', payload)
      setTimeout(() => {
        this.removeFromHead()
      }, 1000)
    },

    appendTheme (theme) {
      const link = this.createCSS('static/themes/' + theme + '.css')
      this.mountToHead(link)
    },

    onFileChange (e) {
      const userDir = e.target.files[0].path
      const payload = new Payload('userDir', userDir)
      this.$store.dispatch('setSetting', payload)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
