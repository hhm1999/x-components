const dom = require('../../../components/utils/dom.js')
describe('Drag组件交互测试', () => {
  before(() => {
    cy.visit('/#/drag')
  })
  function move (start, end) {
    const moveNode = dom.getLocationRelativeWindow(Cypress.$('div[dragbar]').get(start))
    const tagNode = dom.getLocationRelativeWindow(Cypress.$('div[dragbar]').get(end))
    cy.get('body')
      .trigger('mousedown', { which: 1, x: moveNode.left, y: moveNode.top })
      .trigger('mousemove', { x: tagNode.left, y: tagNode.top })
      .trigger('mouseup', { force: true })
  }
  it('将第1个拖到第6个', () => {
    move(0, 5)
    cy.get('div[order-key]').eq(5).should('contain', '1')
  })
  it('再将第5个拖到第2个', () => {
    move(4, 1)
    cy.get('div[order-key]').eq(1).should('contain', '6')
  })
})
