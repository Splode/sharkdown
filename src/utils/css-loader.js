module.exports = {
  createCSS (path) {
    let link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.media = 'screen'
    link.href = path
    return link
  },

  mountToHead (el) {
    document.getElementsByTagName('head')[0].appendChild(el)
  }
}
