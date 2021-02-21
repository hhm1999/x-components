describe('Clickoutside点击测试', () => {
  before(() => {
    cy.visit('/#/clickoutside')
  })
  it('点击绑定指令的div，不触发回调函数', () => {
    cy.get('.main').trigger('mousedown')
    cy.get('.tip').should('not.be.visible')
  })
  it('点击设置了忽略的div，不触发回调函数', () => {
    cy.get('.ignore').trigger('mousedown')
    cy.get('.tip').should('not.be.visible')
  })
  it('点击了其它位置，触发回调函数', () => {
    cy.get('.other').first().trigger('mousedown')
    cy.get('.tip').should('be.visible')
  })
})
