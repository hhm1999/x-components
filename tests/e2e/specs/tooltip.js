const dom = require('../../../components/utils/dom.js')
describe('Tooltip组件交互测试', () => {
  before(() => {
    cy.visit('/#/tooltip')
  })
  it('鼠标进入正常显示，位置也正常', () => {
    cy.get('.x-btn').first().trigger('mouseenter')
    cy.get('div[class^="container_main"]').should(($el) => {
      const barLocation = dom.getLocationRelativeWindow(Cypress.$('.x-btn').get(0))
      expect($el).to.be.visible
      const containerLocation = dom.getLocationRelativeWindow($el.get(0))
      expect(barLocation.left).to.equal(containerLocation.left)
      expect(barLocation.top).to.equal(containerLocation.top + containerLocation.height)
    })
  })
})
