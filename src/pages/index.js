const generateIndex = require('../utils/generateIndex')

function _createPage(page) {
  // Default isShowing ELements
  page.isShowingElements = []

  for (let elementKey in page.elements) {
    // Get name of element
    const name = elementKey

    // Determine if element is an object or string
    const isObject =
      typeof page.elements[elementKey] === 'string' ? false : true

    // Setup selector
    let selector

    if (isObject) {
      selector = page.elements[elementKey].selector

      // if element has isShowing: true, push it
      // to the isShowingElements array
      if (page.elements[elementKey].isShowing) {
        page.isShowingElements.push(selector)
      }
    } else {
      selector = page.elements[elementKey]
    }

    // Assign element name and selector to page
    page[name] = selector
  }

  // return the page
  return page
}

module.exports = generateIndex(__dirname, _createPage)
