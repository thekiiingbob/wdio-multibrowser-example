/* eslint-disable no-unused-vars*/

/**
 * Gets executed just before initialising the webdriver session and test framework. It allows you
 * to manipulate configurations depending on the capability or spec.
 * @param {Object} config wdio configuration object
 * @param {Array.<Object>} capabilities list of capabilities details
 * @param {Array.<String>} specs List of spec file paths that are to be run
 */
function beforeSession(config, capabilities, specs) {}

module.exports = beforeSession
