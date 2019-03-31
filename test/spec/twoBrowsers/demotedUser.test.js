// Demoted user cannot continue to view System Console

// 1. Log in on another / incognito browser as another user (we'll call them user2)
// who is also a system admin (can temporarily promote to admin if needed)
// 2. Have user2 view any page in System Console
// 3. As your own system admin user, go to Users and locate user2 in the list
// 4. Click the dropdown next to user2 and select Manage Roles
// 5. Click Member to demote user2

const users = require('../../data/users/users.js')
const actions = require('../../../src/actions')
const api = require('../../../src/api')
const pages = require('../../../src/pages')
const verify = require('../../../src/verifications')
const utils = require('../../../src/utils')

describe('Demoted User', () => {
  it('cannot continue to view System Console', () => {
    const admin = users['sysadmin']
    const user = users['user-1']

    // Login with both users
    const adminLogin = actions.login(browserA, admin)
    const userLogin = actions.login(browserB, user)

    // Change user-1 to a sys admin so it can access console
    api.updateUserRole(
      adminLogin.cookies,
      userLogin.userId,
      'system_user system_admin',
    )

    // // Have userB view the system console
    browserB.url(BASE_URL + '/admin_console/general/configuration')
    utils.waitUntilShowing(browserB, pages.systemConsoleSidebar)

    // Have original sysAdmin change userB's role back to a normal user
    // api.updateUserRole(adminLogin.cookies, userLogin.userId, 'system_user')
    actions.admin.changeUserRole(browserA, userLogin.userId, 'member')

    // Demoted user should no longer see admin console, and be
    // redirected to the town square
    utils.waitUntilNotShowing(browserB, pages.systemConsoleSidebar, 1000, 500)
    expect(utils.isShowing(browserB, pages.messageList)).to.be.true
    expect(browserB.getUrl()).to.equal(
      'http://localhost:8065/ad-1/channels/town-square',
    )
  })
})
