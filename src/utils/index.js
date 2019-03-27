// This is a hack for the moment, there is a bug with wdio when using MR
function waitForDisplayed(b, selector, timeout = 5000, interval = 500) {
  return b.waitUntil(
    () => {
      return b.$(selector).isExisting() ? b.$(selector).isDisplayed() : false
    },
    timeout,
    `Waited for ${timeout}ms for '${selector}' to be displayed.`,
    interval,
  )
}

function isShowing(b, page) {
  try {
    const results = page.isShowingElements.map(selector => {
      return b.$(selector).isDisplayed()
    })

    return results.every(result => {
      return result === true
    })
  } catch (error) {
    error.message =
      `App ${b.name} had an issue determining if ${
        page.name
      } was showing or not.\n` + error.message
  }
}

function waitUntilShowing(b, page, timeout = 10000, interval = 2000) {
  try {
    return b.waitUntil(
      () => {
        return isShowing(b, page)
      },
      timeout,
      `Waited ${timeout}ms to see the ${
        page.name
      }, but not all expected elements were visible`,
      interval,
    )
  } catch (error) {
    error.message =
      `App '${b.name}' had an issue waiting for the ${page.name}:\n` +
      error.message
    throw error
  }
}

function waitUntilNotShowing(b, page, timeout = 10000, interval = 2000) {
  try {
    return b.waitUntil(
      () => {
        return !isShowing(b, page)
      },
      timeout,
      `Waited ${timeout}ms to see the ${
        page.name
      }, but not all expected elements were visible`,
      interval,
    )
  } catch (error) {
    error.message =
      `App '${b.name}' had an issue waiting for the ${page.name}:\n` +
      error.message
    throw error
  }
}

function getTokenAndId(b) {
  const cookies = b.getCookies(['MMAUTHTOKEN', 'MMUSERID'])

  let tokenAndId = {}

  cookies.forEach(cookie => {
    tokenAndId[cookie.name] = cookie.value
  })

  return tokenAndId
}

module.exports = {
  waitForDisplayed,
  waitUntilShowing,
  waitUntilNotShowing,
  isShowing,
  getTokenAndId,
}
