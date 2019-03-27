/* eslint-disable no-unused-vars*/

/**
 * Gets executed after all workers got shut down and the process is about to exit.
 * @param {Object} exitCode 0 - success, 1 - fail
 * @param {Object} config wdio configuration object
 * @param {Array.<Object>} capabilities list of capabilities details
 * @param {<Object>} results object containing test results
 */
function onComplete(exitCode, config, capabilities, results) {}

module.exports = onComplete
