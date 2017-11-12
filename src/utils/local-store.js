const electron = require('electron')
const fs = require('fs')
const path = require('path')

export default class {
  constructor (opts) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData')

    this.path = path.join(userDataPath, opts.configName + '.json')
    this.data = this.parseDataFile(this.path, opts.defaults)
  }

  get (key) {
    return this.data[key]
  }

  set (key, val) {
    this.data[key] = val
    fs.writeFileSync(this.path, JSON.stringify(this.data))
  }

  parseDataFile (filePath, defaults) {
    try {
      return JSON.parse(fs.readFileSync(filePath))
    } catch (err) {
      return defaults
    }
  }
}
