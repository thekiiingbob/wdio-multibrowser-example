const axios = require('axios')

module.exports = function(_browser, user) {
  return _browser.call(async () => {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}/api/v4/users/login`,
      data: {
        login_id: user.username,
        password: user.password,
      },
    })

    return {
      authToken: response.headers.token,
      userId: response.data.id,
      cookies: response.headers['set-cookie'],
    }
  })
}
