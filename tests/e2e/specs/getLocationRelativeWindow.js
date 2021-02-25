const dom = require('../../../components/utils/dom.js')
describe('GetLocationRelativeWindow测试', () => {
  before(() => {
    cy.viewport(1000, 600)
    cy.visit('/#/test-page/get-location-relative-window')
  })
  it('位置正确', () => {
    cy.scrollTo(0, 200)
    cy.get('#getLocationRelativeWindowScroll').scrollTo(0, 60)
    cy.get('#getLocationRelativeWindowTag').then(($el) => {
      const standard = {
        bottom: -70,
        bottomSpace: -120,
        height: 50,
        left: 445,
        leftSpace: 445,
        right: -445,
        rightSpace: -495,
        top: 70,
        topSpace: 70,
        width: 50
      }
      const location = dom.getLocationRelativeWindow($el.get(0))
      console.log(location);
      expect(standard).to.deep.equal(location)
    })
  })
})
