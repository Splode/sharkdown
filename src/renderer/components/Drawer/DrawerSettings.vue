<template>
  <div class="col Settings">
    <div class="row">
      <div class="col-12">
        <h1 class="Drawer-title">Settings</h1>
      </div>

      <div class="col-12 Section">
        <h2 class="Section-title">Editor</h2>
        
        <div class="row Section-option-wrapper">

          <!-- always on top -->
          <div class="col-6 Section-option">
            <div class="Checkbox" @click="selectAlwaysOnTop" :class="settings.alwaysOnTop ? 'is-active' : 'is-inactive'"></div>
            <label>Always on Top</label>
          </div>

          <!-- autoSave -->
          <div class="col-6 Section-option">
            <div class="Checkbox" @click="toggleSetting('autoSave')" :class="settings.autoSave ? 'is-active' : 'is-inactive'"></div>
            <label>Autosave</label>
          </div>

          <!-- focusMode -->
          <div class="col-6 Section-option" title="Autohide sidebars">
            <div class="Checkbox" @click="toggleSetting('focusMode')" :class="settings.focusMode ? 'is-active' : 'is-inactive'"></div>
            <label>Focus Mode</label>
          </div>

          <!-- justify text -->
          <div class="col-6 Section-option">
            <div class="Checkbox" @click="toggleSetting('justify')" :class="settings.justify ? 'is-active' : 'is-inactive'"></div>
            <label>Justify Text</label>
          </div>

        </div>
        <!-- font -->
        <h3 class="Section-subtitle">Font</h3>
        <ul class="Settings-list">
          <li class="Settings-list-item" v-for="font in fonts" @click="selectFont(font)" :class="{ 'is-active': settings.font === font }"
            :style="{ 'font-family': font }" :key="font">
            <label class="RadioButton-label" :for="font">{{ font }}</label>
            <input type="radio" :id="font">
          </li>
        </ul>
        <!-- font size -->
        <h3 class="Section-subtitle">Font Size</h3>
        <input type="range" min=".75" max="1.375" step=".125" class="Slider" @change="selectFontSize" :value="settings.fontSize">
        <div class="Slider-label">
          <ul class="Slider-label-list">
            <li v-for="number in 6" :key="number">|</li>
          </ul>
        </div>
        <!-- line height -->
        <h3 class="Section-subtitle">Line Height</h3>
        <input type="range" min="1.25" max="3" step=".25" class="Slider" @change="selectLineHeight" :value="settings.lineHeight">
        <div class="Slider-label">
          <ul class="Slider-label-list">
            <li v-for="number in 8" :key="number">|</li>
          </ul>
        </div>
        <!-- paragraph width -->
        <h3 class="Section-subtitle">Paragraph Width</h3>
        <input type="range" min="6" max="11" step="1" class="Slider" @change="setSliderSetting($event, 'colWidth')" :value="settings.colWidth">
        <div class="Slider-label">
          <ul class="Slider-label-list">
            <li v-for="number in 6" :key="number">|</li>
          </ul>
        </div>
      </div>

      <div class="col-12 Section">
        <h2 class="Section-title">Theme</h2>
        <div class="row">
          <div 
            class="col-6 Section-imagePreview" 
            v-for="(theme, i) in themes"
            @click="selectTheme(theme)"
            :key="i">
            <div class="Section-imagePreview-wrapper">
              <img :src="'./static/images/' + theme + '-preview.jpg'">
            </div>
            <div class="Section-imagePreview-icon" v-if="settings.theme === theme">
              <icon name="check"/>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 Section">
        <h2 class="Section-title">Note Location</h2>
        <pre class="Section-codeBlock">{{ docPath }}</pre>
        <label for="chooseUserDir" class="Button Button--block Button--block--field">Browse</label>
        <input id="chooseUserDir" 
          type="file" 
          class="d-none" 
          @change="onFileChange" 
          webkitdirectory
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Payload from './../../../utils/payload'
import cssLoader from './../../../utils/css-loader'
import keygen from './../../../utils/key'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/check'
export default {
  components: {
    Icon
  },

  mixins: [ cssLoader, keygen ],

  data () {
    return {
      fonts: [
        'Fira Sans',
        'Inconsolata',
        'Lato',
        'Libre Baskerville',
        'Lora',
        'Open Sans',
        'Roboto',
        'Roboto Condensed'
      ],
      themes: [
        'charcoal',
        'graphite',
        'dracula',
        'D.Va',
        'oneDark',
        'phospho',
        'pocket',
        'monokai',
        'github',
        'winter-berry'
      ]
    }
  },

  computed: {
    docPath () {
      return this.settings.userDir ? this.settings.userDir : 'Default'
    },

    settings () {
      return this.$store.getters.settings
    }
  },

  methods: {
    selectAlwaysOnTop () {
      const alwaysOnTop = !this.settings.alwaysOnTop
      const payload = new Payload('alwaysOnTop', alwaysOnTop)
      this.$store.dispatch('setSetting', payload)
      ipcRenderer.send('toggle-alwaysOnTop', alwaysOnTop)
    },

    selectAutosave () {
      const payload = new Payload('autoSave', !this.settings.autoSave)
      this.$store.dispatch('setSetting', payload)
    },

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

    setSliderSetting (e, key) {
      const payload = new Payload(key, e.target.value)
      this.$store.dispatch('setSetting', payload)
    },

    toggleSetting (setting) {
      const payload = new Payload(setting, !this.settings[setting])
      this.$store.dispatch('setSetting', payload)
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
.Switch {
  display: inline-flex;
  margin-right: 10px;
  position: relative;
  width: 30px;
  height: 16px;
  vertical-align: middle;
  &::before {
    background: white;
    border-radius: 1px;
    content: '';
    margin: auto 0;
    position: absolute;
    top: 0;
    bottom: 1px;
    width: 100%;
    height: 3px;
  }
}

.Switch-button {
  background-color: blue;
  border: 2px solid;
  border-radius: 50%;
  // margin: auto 0;
  position: absolute;
  // top: 0;
  transition: all 2s ease;
  width: 15px;
  height: 15px;
  &.is-active {
    transform: translateX(100%);
  }
  &.is-inactive {
    transform: translateX(0);
    // left: 0;
    // animation: slide-right 2s ease forwards;
  }
}

@keyframes slide-right {
  from {
    left: 0;
    right: inherit;
  }
  to {
    left: inherit;
    right: 0;
  }
}
</style>
