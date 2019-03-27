const baseConfig = {
  // ==================================
  // Where should your test be launched
  // ==================================
  //
  runner: 'local',
  sync: true,

  //
  // =====================
  // Server Configurations
  // =====================
  // Host address of the running Selenium server. This information is usually obsolete as
  // WebdriverIO automatically connects to localhost. Also if you are using one of the
  // supported cloud services like Sauce Labs, Browserstack or Testing Bot you also don't
  // need to define host and port information because WebdriverIO can figure that out
  // according to your user and key information. However if you are using a private Selenium
  // backend you should define the host address, port, and path here.
  //
  // hostname: '0.0.0.0',
  // port: 4444,
  // path: '/wd/hub',
  //
  // =================
  // Service Providers
  // =================
  // WebdriverIO supports Sauce Labs, Browserstack and Testing Bot (other cloud providers
  // should work too though). These services define specific user and key (or access key)
  // values you need to put in here in order to connect to these services.
  //
  //
  // If you run your tests on SauceLabs you can specify the region you want to run your tests
  // in via the `region` property. Available short handles for regions are `us` (default) and `eu`.
  // These regions are used for the Sauce Labs VM cloud and the Sauce Labs Real Device Cloud.
  // If you don't provide the region it will default for the `us`
  region: 'us',
  //
  // Additional list of node arguments to use when starting child processes
  execArgv: [],
  baseUrl: 'http://localhost:8065',
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error
  logLevel: 'error',
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  // baseUrl: 'https://webapp.lifesizecloudbeta.com/',
  //
  // Default timeout for all waitForXXX commands.
  waitforTimeout: 1000,
  //
  // Framework you want to run your specs with.
  // The following are supported: mocha, jasmine and cucumber
  // see also: https://webdriver.io/docs/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed before running any tests.
  framework: 'mocha',
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter.html and click on "Reporters" in left column
  reporters: ['spec'],
  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd',
    timeout: 9999999999, //90000,
    // retries: 1,
  },
  // onPrepare: hooks.onPrepare,
  // beforeSession: hooks.beforeSession,
  // before: hooks.before,
  // beforeSuite: hooks.beforeSuite,
  // beforeHook: hooks.beforeHook,
  // afterHook: hooks.afterHook,
  // beforeTest: hooks.beforeTest,
  // beforeCommand: hooks.beforeCommand,
  // afterCommand: hooks.afterCommand,
  // afterTest: hooks.afterTest,
  // afterSuite: hooks.afterSuite,
  // after: hooks.after,
  // afterSession: hooks.afterSession,
  // onComplete: hooks.onComplete,
  // onReload: hooks.onReload,
}

const fs = require('fs')
const path = require('path')

const _applyHooksToConfig = (prototype = {}) => {
  const dir = path.resolve(__dirname, '../hooks')
  const files = fs.readdirSync(dir)
  for (let filename of files) {
    const commandName = path.basename(filename, path.extname(filename))
    prototype[commandName] = require(path.join(dir, commandName))
  }
  return prototype
}

// Check if we want to NOT run on sauce
if (!process.env.USE_SAUCE) {
  baseConfig.hostname = process.env.HOST ? process.env.HOST : '0.0.0.0'
  baseConfig.port = 4444
  baseConfig.path = '/wd/hub'
  baseConfig.services = process.env.HOST ? [] : ['selenium-standalone']
} else {
  baseConfig.user = process.env.SAUCE_USERNAME
  baseConfig.key = process.env.SAUCE_ACCESS_KEY
  baseConfig.services = ['sauce']
}

module.exports = _applyHooksToConfig(baseConfig)
