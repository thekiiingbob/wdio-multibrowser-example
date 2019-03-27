module.exports = function(_browser) {
  const messages = _browser.$$('[id*=postMessageText]')
  return messages[messages.length - 1].getText()
}
