<div align="center">
<h1>WebdriverIO Multibrowser Example</h1>

<p></p>
</div>

<hr />

## Setup

### Requirements

Node 10+ installed
Mattermost server and frontend running.
DB should be seeded with the normal test data

### Instructions

Clone this repo and run `npm install`.
Then to run the example login test, run `npm run test:2`. Two browser should appear and they should do the following:

1.  Each will login
1.  UserA will send a message to UserB
1.  UserB will send a message to UserA

## Notes

This uses Webdriver.io's multiremote configuration to start 2 separate browsers to run tests with.

This example's approach to abstracting away shared code is to break the code into either an action, verification, or utility. Additionally, there are fairly light page objects which are little more than a collection of selectors (this same sort of approach could be used with Cypress.io as well, as it does nothing specific to webdriver.io).

All of the actions, verifications, and utilities use the same mechanism
to control the individual browsers, which is to pass in the browser in to each function call. So generally, most of the code will be doing things like `actions.login(browserA, user)`.

Another approach would be to wrap the browser into an "app" or "client" object so you could do something like `app.login(user)`. With this approach we can omit the browser because we would have instantiated the app before the tests run (usually in the webdriver.io hooks).

These two approaches could be debated, but I've found the second approach to lead to us using webdriver.io more "as it wants to be used",in my opinion. Just generally less wrapping, and less "framework-y" code required to get things going.

Other things of note is that this example is configured to run with selenium-standalone locally, or can hit Sauce Labs or any other remote Selenium grid as needs be. There is also a directory for api related functions/modules. This is currently only used to get login tokens and ids to bypass the login page.

## Bugs

Because I think it's important to note, webdriver.io had a recent overhaul of going from v4 to v5 at the end of last year. Generally the transition has been smooth, but there are some bugs around the multiremote usage (which I imagine, not being as highly used as it's more normal confuration). As a result, I have had to do 2 things that are not ideal. First, in the before hook, I have to manually add a session id. Without it, the browsers do not close properly after the tests are complete. I also have a workaround for `$(selector).waitForDisplayed()` not actually waiting by having a util that does it manually effectively. Lastly, it also seems that, with multiremote, webdriver.io does not respect the `baseUrl` attribute in the configuration file, so manually making that work as well.

## Comparison to Cypress.io

Generally, I'd rather be using Cypress.io for most of these tests. But if there is a need to use multiple browsers or browsers other than Chrome, then a Selenium oriented tool like webdriver.io would be what I would reach for. I could see a world where we do most of our functional testing via Cypress.io, and then have a smaller (and more easily maintainable) suite of Selenium based tests so that we can perform smoke tests and/or visual regression tests across a variety of browsers.
