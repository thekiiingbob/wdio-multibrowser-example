module.exports = function(_browser, message) {
  _browser.$('#post_textbox').setValue(message)
  _browser.keys('Enter')
}
