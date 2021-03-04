const dom = require('../../../components/utils/dom.js')
describe('Cascader组件测试', () => {
  before(() => {
    cy.visit('/#/cascader')
  })
  it('鼠标点击显示下拉框', () => {
    cy.get('div[class^="select_main"]').first().trigger('click')
    cy.get('div[class^="dropDown_main"]').filter(':visible').as('dropDownMain').should('have.length', 1)
  })
  it('下拉框位置正确', () => {
    const dropDownMainLocation = dom.getLocationRelativeWindow(Cypress.$('div[class^="dropDown_main"]').filter(':visible').get(0))
    const cascaderLocation = dom.getLocationRelativeWindow(Cypress.$('div[class^="select_main"]').first().get(0))
    expect(dropDownMainLocation.left).to.equal(cascaderLocation.left)
    expect(dropDownMainLocation.top).to.equal(cascaderLocation.top + cascaderLocation.height)
  })
  it('点击选项正确展开次级', () => {
    cy.get('div[class^="dropDown_main"]').filter(':visible').find('div[class*="selectOption_main"]').first().trigger('click')
    cy.get('div[class^="dropDown_main"]').filter(':visible').find('div[class*="cascader_layer"]').should('have.length', 2)
    cy.get('div[class^="dropDown_main"]').filter(':visible').find('div[class*="cascader_layer"]').eq(1).find('div[class*="selectOption_main"]').first().trigger('click')
  })
  it('本地搜索功能可用', () => {
    cy.get('div[class^="select_main"]').eq(1).trigger('click')
    cy.get('div[class^="select_main"]').eq(1).find('input').focus()
    // cy.wait(3000)
    // cy.get('div[class^="select_main"]').eq(1).find('input').type('b')
  })
})
