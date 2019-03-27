const fs = require('fs')
const path = require('path')

module.exports = function(dirName, customizationCb = null) {
  const index = {}
  const dir = path.resolve(dirName, './definitions')
  const files = fs.readdirSync(dir)
  for (let filename of files) {
    const moduleName = path.basename(filename, path.extname(filename))
    const module = require(path.join(dir, moduleName))
    index[moduleName] = customizationCb ? customizationCb(module) : module
  }

  return index
}
