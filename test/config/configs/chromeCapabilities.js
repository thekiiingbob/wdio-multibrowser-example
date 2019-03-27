const fs = require('fs')

const capabilities = {
  browserName: 'chrome',
  'goog:chromeOptions': getChromeOptions(),
}

function getChromeOptions() {
  return {
    args: [
      '--start-maximized',
      '--disable-infobars',
      '--disable-user-media-security',
      '--ignore-certificate-errors',
    ],
  }
}

if (process.env.USE_SAUCE) {
  capabilities.platform = 'macOS 10.14'
  capabilities.version = 'latest'
  capabilities.screenResolution = '1600x1200'
}

module.exports = capabilities
