<template>
  <!-- <main class="container Editor-wrapper">
    <div class="row Editor" @click="giveFocus"> -->
      <div>
      <div class="col-10 mx-auto" :style="{ 'font-family': settings.font }">
        <div id="Quill"></div>
      </div>
      <div class="col-1"></div>
      </div>
    <!-- </div>
  </main> -->
</template>

<script>
import _ from 'lodash'
import Quill from 'quill'
import LocalStore from './../../utils/local-store'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
export default {
  data () {
    return {
      changes: false,
      quill: null,
      previousCursor: 0
    }
  },

  computed: {
    currentDoc () {
      return this.$store.getters.currentDoc
    },

    editorOps () {
      return this.quill.getContents()
    },

    settings () {
      return this.$store.getters.settings
    }
  },

  methods: {
    autoSave () {
      setInterval(() => {
        if (!this.changes) {
          return false
        } else if (this.changes) {
          this.save(this.currentDoc)
          console.log(`Autosaved ${this.currentDoc}.`)
        }
      }, 10000)
    },

    getPayload () {
      const selection = this.quill.getSelection()
      const [line, offset] = this.quill.getLine(selection.index)
      const text = line.domNode.textContent.trim()
      const words = _.words(text, /[#a-zA-Z0-9]+/g)
      const index = selection.index
      let payload = {
        selection,
        line,
        offset,
        text,
        words,
        index
      }
      return payload
    },

    giveFocus () {
      this.quill.focus()
    },

    handleEditorUpdate () {
      this.quill.on('editor-change', () => {
        let payload = this.getPayload()
        console.log(payload, this.quill.editor.delta.ops)
      })
    },

    handleTextUpdate () {
      this.quill.on('text-change', (delta) => {
        // let payload = this.getPayload()

        // console.log(payload, delta)
        // console.log(this.quill.root.innerHTML)

        this.changes = true

        // delta.ops.forEach(element => {
        //   if (element.insert === ' ' || element.delete) {
        //     payload.phrase = payload.text.slice(this.previousCursor, payload.offset)
        //     this.previousCursor = payload.offset
        //     this.matchHeader(payload)
        //   }
        // })
      })
    },

    initQuill () {
      this.quill = new Quill('#Quill', {
        // theme: 'snow'
      })
      this.quill.focus()
    },

    load (filename) {
      let localStore = new LocalStore({
        configName: filename,
        defaults: {
          ops: null
        }
      })
      const ops = localStore.get('ops')
      if (ops === null) {
        return null
      }
      this.quill.setContents(ops)
    },

    matchHeader (payload) {
      const cases = {
        '#': 1,
        '##': 2,
        '###': 3,
        '####': 4,
        '#####': 5,
        '######': 6
      }

      if (cases[payload.words[0]] && _.startsWith(payload.text, '#')) {
        // this.quill.formatLine(payload.offset, 0, 'header', cases[payload.words[0]])
        this.quill.formatLine(payload.index, 0, 'header', cases[payload.words[0]])
      } else if (payload.offset === 0 || 1) {
        this.quill.formatLine(payload.index, 0, 'header', false)
      }
    },

    save (filename) {
      let localStore = new LocalStore({
        configName: filename,
        defaults: {}
      })
      localStore.set('ops', this.editorOps)
      // NOTE: refresh save state
      this.changes = false
    }
  },

  mounted () {
    this.initQuill()
    this.load(this.currentDoc)
    // this.handleEditorUpdate()
    this.handleTextUpdate()
    this.autoSave()
  }
}
</script>

<style lang="scss">
@import './../assets/main.scss';
.Test {
  font-family: $fontLora;
}

.Editor {
  height: 100vh;
}

.Editor-wrapper {
  padding-top: 80px
}
</style>
