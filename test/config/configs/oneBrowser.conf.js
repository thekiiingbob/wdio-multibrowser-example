const baseConfig = require('./base.config')
const chromeCapabilities = require('./chromeCapabilities')

const config = {
  // Level of logging verbosity: trace | debug | info | warn | error
  logLevel: 'error',
  specs: ['./test/spec/oneBrowser/**/*.test.js'],
  // Patterns to exclude.
  // exclude: ['test/spec/multibrowser/**', 'test/spec/mobile/**'],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude option in
  // order to group specific specs to a specific capability.
  //
  //
  // First you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox and Safari) and you have
  // set maxInstances to 1, wdio will spawn 3 processes. Therefor if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property basically handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 1,
  capabilities: [chromeCapabilities],
}

module.exports = {config: Object.assign(baseConfig, config)}
