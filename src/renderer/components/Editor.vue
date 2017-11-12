<template>
  <main class="container">
    <div class="row Editor" @click="giveFocus">
      <div class="col-lg-10 mx-auto py-5">
        <div id="Quill"></div>
      </div>
    </div>
  </main>
</template>

<script>
import _ from 'lodash'
import Quill from 'quill'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
export default {
  data () {
    return {
      quill: null,
      previousCursor: 0
    }
  },

  methods: {
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

    initQuill () {
      this.quill = new Quill('#Quill', {
        // theme: 'snow'
      })
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
        let payload = this.getPayload()

        // console.log(payload, delta)
        console.log(this.quill.root.innerHTML)

        delta.ops.forEach(element => {
          if (element.insert === ' ' || element.delete) {
            payload.phrase = payload.text.slice(this.previousCursor, payload.offset)
            this.previousCursor = payload.offset
            this.matchHeader(payload)
          }
        })
      })
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
    }

  },

  mounted () {
    this.initQuill()
    // this.handleEditorUpdate()
    this.handleTextUpdate()
    // this.quill.setContents({
    //   'ops': [
    //     {
    //       'insert': '# Hello world'
    //     },
    //     {
    //       'attributes': {
    //         'header': 1
    //       },
    //       'insert': '\n'
    //     }
    //   ]
    // })
  }
}
</script>

<style lang="scss">
@import './../assets/main.scss';

.Editor {
  width: 100%;
  height: 100vh;
}
</style>
