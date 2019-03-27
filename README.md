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

This example's approach to abstracting away shared code is to break the code into either an action, verification, or utility. Additionally, there are fairly light page objects which are little more than a collection of selectors.

All of the actions, verifications, and utilities use the same mechanism
to control the individual browsers, which is to pass in the browser in to each function call. So generally, most of the code will be doing things like `actions.login(browserA, user)`.

Another approach would be to wrap the browser into an "app" or "client" object so you could do something like `app.login(user)`. With this approach we can omit the browser because we would have instantiated the app before the tests run (usually in the webdriver.io hooks).

These two approaches could be debated, but I've found the second approach to lead to us using webdriver.io more "as it wants to be used",in my opinion. Just generally less wrapping, and less "framework-y" code.

## Comparison to Cypress.io

Generally, I'd rather be using Cypress.io for most of these tests. But if there is a need to use multiple browsers or browsers other than Chrome, then a Selenium oriented tool like webdriver.io would be what I would reach for.
