module.exports = {
  handleQuillUpdate () {
    this.quill.on('text-change', (delta, oldContents, source) => {
      console.dir(delta)
      const selection = this.quill.getSelection()
      console.log(this.quill.getLine(selection.index))
      delta.ops.forEach(element => {
        if (element.insert === '#') {
          console.log(element.insert)
          console.log(selection)
          this.quill.formatLine(selection.index, 0, 'header', 1)
        }
      })
    })
  }
}
