const electron = require('electron')
const fs = require('fs')
const path = require('path')

export default class {
  constructor (opts) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData')

    this.dir = path.join(userDataPath, opts.dirName)
    this.path = path.join(userDataPath, opts.dirName, opts.configName + '.json')
    this.data = this.parseDataFile(this.path, opts.defaults)
  }

  makeDir () {
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir)
    }
  }

  get (key) {
    return this.data[key]
  }

  set (key, val) {
    this.data[key] = val
    this.makeDir()
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
