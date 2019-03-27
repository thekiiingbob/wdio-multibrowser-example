/* eslint-disable no-unused-vars*/

/**
 * Gets executed before test execution begins. At this point you can access to all global
 * variables like `browser`. It is the perfect place to define custom commands.
 * @param {Array.<Object>} capabilities list of capabilities details
 * @param {Array.<String>} specs List of spec file paths that are to be run
 */
function before(capabilities, specs) {
  // setup mocha/chai for expect() functions
  const chai = require('chai')
  global.expect = chai.expect

  // Set BASE_URL global, multiremote does not respect wdio.conf baseURL
  global.BASE_URL = process.env.BASE_URL
    ? process.env.BASE_URL
    : 'http://localhost:8065'

  const isMultiRemote = !Object.keys(capabilities).includes('browserName')

  if (isMultiRemote) {
    // BUG! WE NEED THIS SO BROWSERS CLOSE WITH MULTIREMOTE
    global.browser.sessionId = 'multiremote-test'

    for (const cap in capabilities) {
      global[cap].name = cap
    }
  }
}

module.exports = before
