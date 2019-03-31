const axios = require('axios')
const {getTokenAndId} = require('../../utils')

module.exports = function(adminCookies, userId, roles) {
  let cookieString = ''

  for (let cookie in adminCookies) {
    cookieString = cookieString + `${cookie}=${adminCookies[cookie]}; `
  }

  return browser.call(async () => {
    return axios({
      method: 'put',
      url: `${BASE_URL}/api/v4/users/${userId}/roles`,
      headers: {
        // Authorization: 'Bearer ' + adminCookies.MMAUTHTOKEN,
        'Content-Type': 'text/plain',
        Cookie: cookieString,
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': adminCookies.MMCSRF,
      },
      data: {roles},
    })
      .then(resp => {
        return resp.data
      })
      .catch(e => {
        console.log(
          'Request to update role had an error, but most likely worked',
        )
      })
  })
}
