<template>
  <!-- <div class="row"> -->
  <div class="col-11 d-flex Editor-wrapper" :class="{ 'is-disabled': drawerOpen }">
    <div class="row Editor" @click="giveFocus" :style="{ 'font-family': settings.font }">
      <div 
        id="Quill"
        class="ql-container mx-auto"
        :class="'col-' + settings.colWidth" 
        :style="{
          'font-size': settings.fontSize + 'rem', 
          'line-height': settings.lineHeight,
          'text-align': settings.justify ? 'justify' : 'left'
        }">
        </div>
      <div class="col-1 Sidebar" @mouseover="toolbarIsActive = true" @mouseout="toolbarIsActive = false" :class="sidebarClasses">
        <div id="Quill-toolbar">
          <ul class="Toolbar-list">
            <li>
              <button class="ql-header Button Button--transparent" value="1" title="Heading 1">
                <icon name="header"/><sub>1</sub>
              </button>
            </li>
            <li>
              <button class="ql-header Button Button--transparent" value="2" title="Heading 2">
                <icon name="header"/><sub>2</sub>
              </button>
            </li>
            <li>
              <button class="ql-header Button Button--transparent" value="3" title="Heading 3">
                <icon name="header"/><sub>3</sub>
              </button>
            </li>
            <li>
              <button class="ql-header Button Button--transparent" value="4" title="Heading 4">
                <icon name="header"/><sub>4</sub>
              </button>
            </li>
            <li>
              <button class="ql-blockquote Button Button--transparent" title="Blockquote">
                <icon name="quote-right"/>
              </button>
            </li>
            <li>
              <button class="ql-code-block Button Button--transparent" title="Code Block">
                <icon name="code"/>
              </button>
            </li>
            <li>
              <button class="ql-list Button Button--transparent" value="ordered" title="Numbered List">
                <icon name="list-ol"/>
              </button>
            </li>
            <li>
              <button class="ql-list Button Button--transparent" value="bullet" title="List">
                <icon name="list-ul"/>
              </button>
            </li>
            <li>
              <button class="ql-bold Button Button--transparent" title="Bold">
                <icon name="bold"/>
              </button>
            </li>
            <li>
              <button class="ql-italic Button Button--transparent" title="Italic">
                <icon name="italic"/>
              </button>
            </li>
            <li>
              <button class="ql-underline Button Button--transparent" title="Underline">
                <icon name="underline"/>
              </button>
            </li>
            <li>
              <button class="ql-strike Button Button--transparent" title="Strikethrough">
                <icon name="strikethrough"/>
              </button>
            </li>
            <li>
              <button class="ql-code Button Button--transparent" title="Inline Code"><strong>{ }</strong></button>
            </li>
            <li>
              <button class="ql-clean Button Button--transparent" title="Clear Format">
                <icon name="minus-square-o"/>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { ipcRenderer } from 'electron'
import _ from 'lodash'
import Quill from 'quill'
// import 'quill/dist/quill.core.css'
import LocalStore from './../../utils/local-store'
import { EventBus } from './../../utils/event-bus'
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
    drawerOpen () {
      return this.$store.getters.viewState.drawerOpen
    },

    editorOps () {
      return this.quill.getContents()
    },

    settings () {
      return this.$store.getters.settings
    },

    sidebarClasses () {
      if (!this.settings.focusMode) {
        return 'is-active'
      } else if (!this.toolbarIsActive) {
        return 'is-inactive'
      }
    }
  },

  methods: {
    // Quill functions
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
        modules: {
          toolbar: {
            container: '#Quill-toolbar'
          }
        }
      })
      this.keybinding()
      this.quill.focus()
    },

    keybinding () {
      this.quill.keyboard.addBinding({ key: '1', ctrlKey: true }, (range) => {
        this.formatLineToggle(range, 'header', 1)
      })
      this.quill.keyboard.addBinding({ key: '2', ctrlKey: true }, (range) => {
        this.formatLineToggle(range, 'header', 2)
      })
      this.quill.keyboard.addBinding({ key: '3', ctrlKey: true }, (range) => {
        this.formatLineToggle(range, 'header', 3)
      })
      this.quill.keyboard.addBinding({ key: '4', ctrlKey: true }, (range) => {
        this.formatLineToggle(range, 'header', 4)
      })
      this.quill.keyboard.addBinding({ key: 's', ctrlKey: true }, () => {
        this.save(this.settings.currentDoc)
      })
    },

    formatLineToggle (range, format, value) {
      if (this.quill.getFormat(range)[format] === value) {
        this.quill.removeFormat(range)
      } else {
        this.quill.formatLine(range, format, value)
      }
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

    // Local Store functions
    autoSave () {
      setInterval(() => {
        if (!this.changes) {
          return false
        } else if (this.changes) {
          this.save(this.settings.currentDoc)
          console.log(`Autosaved ${this.settings.currentDoc}.`)
        }
      }, 5000)
    },

    load (filename) {
      let localStore = new LocalStore({
        configName: filename,
        dirName: this.settings.documentDir,
        userDir: this.settings.userDir,
        defaults: {
          ops: null
        }
      })
      const ops = localStore.get('ops')
      if (ops === null) {
        return null
      }
      this.quill.setContents(ops)
      this.quill.history.clear()
      ipcRenderer.send('title-change', this.settings.currentDoc)
      console.log(`loaded '${filename}' from '${this.settings.userDir}'`)
    },

    save (filename) {
      let localStore = new LocalStore({
        configName: filename,
        dirName: this.settings.documentDir,
        userDir: this.settings.userDir,
        defaults: {}
      })
      localStore.set('ops', this.editorOps)
      // NOTE: refresh save state
      this.changes = false
    }
  },

  created () {
    EventBus.$on('loadDoc', (file) => {
      this.load(file)
    })
    EventBus.$on('new-doc-init', () => {
      this.save(this.settings.currentDoc)
    })
    EventBus.$on('new-doc-title-created', () => {
      this.quill.setText('')
      this.quill.focus()
      ipcRenderer.send('title-change', this.settings.currentDoc)
      this.save(this.settings.currentDoc)
    })
    EventBus.$on('current-note-deleted', () => {
      this.quill.setText('')
      ipcRenderer.send('title-change', this.settings.currentDoc)
    })
    EventBus.$on('request-editor-data', (type) => {
      let data
      let response = {
        data: null,
        type: type
      }
      switch (type) {
        case 'text':
          data = this.quill.getText()
          response.data = data
          EventBus.$emit('respond-editor-data', response)
          break

        case 'html':
          data = this.quill.root.innerHTML
          response.data = data
          EventBus.$emit('respond-editor-data', response)
          break

        default:
          break
      }
    })
  },

  mounted () {
    this.initQuill()
    this.load(this.settings.currentDoc)
    this.handleTextUpdate()
    if (this.settings.autoSave) {
      this.autoSave()
    }
  }
}
</script>

<style lang="scss">
@import './../assets/main.scss';

.Editor {
  width: 100%;
  height: 100vh;
}

.Editor-wrapper {
  &.is-disabled {
    opacity: .5;
    pointer-events: none;
  }
}

.ql-toolbar {
  position: fixed;
}

.Toolbar-list {
  list-style-type: none;
  padding: 0;
  & li {
    margin-bottom: 1.5vmin;
  }
}
</style>
