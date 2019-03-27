const actions = require('../../actions')

/**
 * Verify the text content of the last message
 * @argument _browser Browser of the last message you want to check
 * @argument message Text of the message
 */
module.exports = function(_browser, message) {
  expect(actions.getLastMessageText(_browser)).to.be.equal(
    message,
    `Last message for ${_browser.name} did not match the sent message.`,
  )
}
