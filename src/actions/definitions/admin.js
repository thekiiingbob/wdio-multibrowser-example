const utils = require('../../utils')
const pages = require('../../pages')

function changeUserRole(adminBrowser, userId, role = 'member') {
  const ROLES = {
    admin: '#systemAdminRadio',
    member: '#systemMemberRadio',
  }

  // Navigate to the admin users page
  adminBrowser.url(BASE_URL + '/admin_console/users')

  // Click the actions dropdown for the particular user
  utils.waitUntilShowing(adminBrowser, pages.systemConsoleSidebar)
  adminBrowser
    .$(`#user_id_${userId}`)
    .$('#moreActions a')
    .click()

  // Click Manage Roles button
  utils.waitForDisplayed(adminBrowser, '#manageRolesMenuItem')
  adminBrowser.$('#manageRolesMenuItem').click()

  // Select the desired role
  utils.waitForDisplayed(adminBrowser, ROLES[role])
  adminBrowser.$(ROLES[role]).click()

  // Click the save button
  adminBrowser.$('#saveRoleButton').click()
}

module.exports = {changeUserRole}
