<template>
  <div class="col-11 Settings">
    <div class="row">
      <div class="col-12">
        <h1>Settings</h1>
        <router-link to="/">
          <h1>BACK</h1>
        </router-link>
      </div>

      <!-- <div class="row"> -->
      <div class="col-md-5 Section">
        <h2 class="Section-title">Editor</h2>
        <h3>Font</h3>
        <ul class="Settings-list">
          <li class="Settings-list-item" v-for="font in fonts" @click="selectFont(font)" :class="{ 'is-active': settings.font === font }"
            :style="{ 'font-family': font }" :key="font">
            <span class="RadioButton"></span>
            <label :for="font">{{ font }}</label>
            <input type="radio" :id="font">
          </li>
        </ul>
        <h3>Font Size</h3>
        <input type="range" min="14" max="22" step="2" list="font-sizes" v-model="fontSize">
        <datalist id="font-sizes">
          <option label="14px" value="14" />
          <option label="16px" value="16" />
          <option label="18px" value="18" />
          <option label="20px" value="20" />
          <option label="22px" value="22" />
        </datalist>
      </div>

      <div class="col-md-5 Section">
        <h2 class="Section-title">Theme</h2>
        <button @click="selectTheme('dracula')">Dracula</button>
        <button @click="selectTheme('oneDark')">One Dark</button>
        <button @click="selectTheme('monokai')">Monokai</button>
      </div>

      <div class="col-md-5 Section">
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
      ],
      fontSize: ''
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
