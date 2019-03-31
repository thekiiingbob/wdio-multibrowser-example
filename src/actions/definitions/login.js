const api = require('../../api')
const pages = require('../../pages')
const utils = require('../../utils')

module.exports = function(_browser, user, manualLogin = false) {
  // Navigate to app to either login or set cookies
  _browser.url(BASE_URL)

  let cookiesNameAndValue

  // Login manually by filling in the form
  if (manualLogin) {
    utils.waitUntilShowing(_browser, pages.loginPage)
    _browser.$(pages.loginPage.usernameField).setValue(user.username)
    _browser.$(pages.loginPage.passwordField).setValue(user.password)
    _browser.$(pages.loginPage.loginButton).click()
  } else {
    // Get token and userId
    const {cookies: loginCookies} = api.login(_browser, user)

    cookiesNameAndValue = loginCookies.map(cookie => {
      const nameAndValue = cookie.split(';')[0]
      const [name, value] = nameAndValue.split('=')
      return {name, value}
    })

    _browser.setCookies(cookiesNameAndValue)

    // Wait for tokens to be set
    _browser.waitUntil(
      () => {
        // Set cookies for login

        _browser.pause(500)

        const response = utils.getMMCookies(_browser)
        return response.MMAUTHTOKEN && response.MMUSERID && response.MMCSRF
      },
      10000,
      `Token, ID or CSRF was not set in ${_browser.name}`,
      1000,
    )

    // Navigate to app
    _browser.url(BASE_URL)
  }

  // Wait for main post list to become visible
  utils.waitForDisplayed(_browser, pages.messageList.postListContent)

  const mmCookies = utils.getMMCookies(_browser)

  // return the cookie if we need it for future requests
  const cookieObject = {}

  cookiesNameAndValue.forEach(cookie => {
    cookieObject[cookie.name] = cookie.value
  })

  return {
    cookies: cookieObject,
    userId: mmCookies.MMUSERID,
    authToken: mmCookies.MMAUTHTOKEN,
  }
}
