const api = require('../../api')
const pages = require('../../pages')
const utils = require('../../utils')

module.exports = function(_browser, user, manualLogin = false) {
  // Navigate to app to either login or set cookies
  _browser.url(BASE_URL)

  // Login manually by filling in the form
  if (manualLogin) {
    utils.waitUntilShowing(_browser, pages.loginPage)
    _browser.$(pages.loginPage.usernameField).setValue(user.username)
    _browser.$(pages.loginPage.passwordField).setValue(user.password)
    _browser.$(pages.loginPage.loginButton).click()
  } else {
    // Get token and userId
    const {MMAUTHTOKEN, MMUSERID} = api.login(_browser, user)

    // Wait for tokens to be set
    _browser.waitUntil(
      () => {
        // Set cookies for login
        _browser.setCookies([
          {name: 'MMAUTHTOKEN', value: MMAUTHTOKEN},
          {name: 'MMUSERID', value: MMUSERID},
        ])

        // _browser.pause(500)

        const response = utils.getTokenAndId(_browser)
        return response.MMAUTHTOKEN && response.MMUSERID
      },
      10000,
      `Token and ID were not set in ${_browser.name}`,
      1000,
    )

    // Navigate to app
    _browser.url(BASE_URL)
  }

  // Wait for main post list to become visible
  utils.waitForDisplayed(_browser, pages.messageList.postListContent)
}
