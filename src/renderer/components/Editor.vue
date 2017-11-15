<template>
  <!-- <main class="container Editor-wrapper">
    <div class="row Editor" @click="giveFocus"> -->
  <div class="row">
    <div class="col-10 ml-auto" :style="{ 'font-family': settings.font }">
      <div id="Quill"></div>
    </div>
    <div class="col-1">
      <div id="Quill-toolbar">
        <ul class="Toolbar-list" @mouseover="toolbarIsActive = true" @mouseout="toolbarIsActive = false">
          <li>
            <button class="ql-header Button Button--transparent" value="1" title="Heading 1" :class="tooltipClasses">
              <icon name="header"/><sub>1</sub>
            </button>
          </li>
          <li>
            <button class="ql-header Button Button--transparent" value="2" title="Heading 2" :class="tooltipClasses">
              <icon name="header"/><sub>2</sub>
            </button>
          </li>
          <li>
            <button class="ql-header Button Button--transparent" value="3" title="Heading 3" :class="tooltipClasses">
              <icon name="header"/><sub>3</sub>
            </button>
          </li>
          <li>
            <button class="ql-header Button Button--transparent" value="4" title="Heading 4" :class="tooltipClasses">
              <icon name="header"/><sub>4</sub>
            </button>
          </li>
          <li>
            <button class="ql-blockquote Button Button--transparent" title="Blockquote" :class="tooltipClasses">
              <icon name="quote-right"/>
            </button>
          </li>
          <li>
            <button class="ql-code-block Button Button--transparent" title="Code Block" :class="tooltipClasses">
              <icon name="code"/>
            </button>
          </li>
          <li>
            <button class="ql-list Button Button--transparent" value="ordered" title="Numbered List" :class="tooltipClasses">
              <icon name="list-ol"/>
            </button>
          </li>
          <li>
            <button class="ql-list Button Button--transparent" value="bullet" title="List" :class="tooltipClasses">
              <icon name="list-ul"/>
            </button>
          </li>
          <li>
            <button class="ql-bold Button Button--transparent" title="Bold" :class="tooltipClasses">
              <icon name="bold"/>
            </button>
          </li>
          <li>
            <button class="ql-italic Button Button--transparent" title="Italic" :class="tooltipClasses">
              <icon name="italic"/>
            </button>
          </li>
          <li>
            <button class="ql-underline Button Button--transparent" title="Underline" :class="tooltipClasses">
              <icon name="underline"/>
            </button>
          </li>
          <li>
            <button class="ql-strike Button Button--transparent" title="Strikethrough" :class="tooltipClasses">
              <icon name="strikethrough"/>
            </button>
          </li>
          <li>
            <button class="ql-code Button Button--transparent" title="Inline Code" :class="tooltipClasses"><strong>{ }</strong></button>
          </li>
          <li>
            <button class="ql-clean Button Button--transparent" title="Clear Format" :class="tooltipClasses">
              <icon name="minus-square-o"/>
            </button>
          </li>
        </ul>
      </div>
    </div>
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
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/bold'
import 'vue-awesome/icons/code'
import 'vue-awesome/icons/header'
import 'vue-awesome/icons/italic'
import 'vue-awesome/icons/list-ol'
import 'vue-awesome/icons/list-ul'
import 'vue-awesome/icons/minus-square-o'
import 'vue-awesome/icons/quote-right'
import 'vue-awesome/icons/strikethrough'
import 'vue-awesome/icons/underline'
export default {
  components: {
    Icon
  },

  data () {
    return {
      changes: false,
      quill: null,
      previousCursor: 0,
      toolbarIsActive: false
    }
  },

  computed: {
    currentDoc () {
      return this.$store.getters.currentDoc
    },

    documentDir () {
      return this.$store.getters.documentDir
    },

    editorOps () {
      return this.quill.getContents()
    },

    settings () {
      return this.$store.getters.settings
    },

    tooltipClasses () {
      return this.toolbarIsActive ? 'is-active' : 'is-inactive'
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
        modules: {
          toolbar: {
            container: '#Quill-toolbar'
          }
        },
        'syntax': true
      })
      this.quill.focus()
    },

    load (filename) {
      let localStore = new LocalStore({
        configName: filename,
        dirName: this.documentDir,
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
        dirName: this.documentDir,
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
 Button Button--transparent
.Editor {
  height: 100vh;
}

.Editor-wrapper {
  padding-top: 80px
}

.ql-toolbar {
  position: fixed;
}

.Toolbar-list {
  list-style-type: none;
  padding: 0;
}
</style>
