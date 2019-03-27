/* eslint-disable no-unused-vars*/

/**
 * Runs after a WebdriverIO command gets executed
 * @param {String} commandName hook command name
 * @param {Array} args arguments that command would receive
 * @param {Number} result 0 - command success, 1 - command error
 * @param {Object} error error object if any
 */
function afterCommand(commandName, args, result, error) {}

module.exports = afterCommand
