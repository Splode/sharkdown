export default {
  methods: {
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
    },

    removeFromHead () {
      let links = document.getElementsByTagName('link')
      links[1].parentNode.removeChild(links[1])
    }
  }
}
