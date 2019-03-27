/* eslint-disable no-unused-vars*/

/**
 * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
 * @param {Object} test test details
 */
function beforeTest(test) {
  browser.deleteCookies()
  browser.refresh()
}

module.exports = beforeTest
