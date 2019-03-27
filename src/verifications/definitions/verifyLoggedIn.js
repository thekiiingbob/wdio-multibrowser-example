const {messageList} = require('../../pages')

module.exports = function(b) {
  expect(b.$(pages.messageList.postListContent).isDisplayed()).to.be(
    true,
    'Expected main post content to be visible when logged in, but was not',
  )
}
