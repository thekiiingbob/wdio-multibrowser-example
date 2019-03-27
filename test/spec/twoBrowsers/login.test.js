const users = require('../../data/users/users.js')
const actions = require('../../../src/actions')
const verify = require('../../../src/verifications')

describe('2 users', () => {
  it('can send a message to each other', () => {
    const userA = users['sysadmin']
    const userB = users['user-1']

    // Login with both users
    actions.login(browserA, userA)
    actions.login(browserB, userB)

    // Send message with userA to userB
    const messageA = 'this is a message'
    actions.sendMessage(browserA, messageA)

    // Verify last message of userB is what userA sent
    verify.lastMessageIs(browserB, messageA)

    // Send message with userB to user A
    const messageB = 'and then this is mine!'
    actions.sendMessage(browserB, messageB)

    // Verify last message of userA is what userB sent
    verify.lastMessageIs(browserA, messageB)
  })
})
