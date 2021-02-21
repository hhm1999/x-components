const dom = require('../../../components/utils/dom.js')
describe('Cascader组件测试', () => {
  before(() => {
    cy.visit('/#/cascader')
  })
  let dropDownMain = null
  it('鼠标点击显示下拉框', () => {
    cy.get('div[class^="select_main"]').first().trigger('click')
    cy.get('div[class^="dropDown_main"]').then(($el) => {
      let hasVisible = false
      $el.each((i, el) => {
        if (Cypress.dom.isVisible(el)) {
          hasVisible = true
          dropDownMain = el
        }
      })
      expect(hasVisible).to.equal(true)
    })
  })
  it('下拉框位置正确', () => {
    const dropDownMainLocation = dom.getLocationRelativeWindow(dropDownMain)
    const cascaderLocation = dom.getLocationRelativeWindow(Cypress.$('div[class^="select_main"]').get(0))
    expect(dropDownMainLocation.left).to.equal(cascaderLocation.left)
    expect(dropDownMainLocation.top).to.equal(cascaderLocation.top + cascaderLocation.height)
  })
})
