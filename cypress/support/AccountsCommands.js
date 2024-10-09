import loc from '../support/locators'

Cypress.Commands.add('AccessAccountMenu', () => {
    cy.get(loc.MENU.BTN_SETTINGS).click()
    cy.get(loc.MENU.BTN_ACCOUNTS).click()

})

Cypress.Commands.add('InsertAccount', AccName => {
    cy.get(loc.ACCOUNT.NAME).type(AccName)
    cy.get(loc.ACCOUNT.BTN_SAVE).click()

})

Cypress.Commands.add('AlterAccount', AccName => {
    cy.get(loc.ACCOUNT.ALTER_ACCOUNT).click()
    cy.get(loc.ACCOUNT.NAME)
    .clear()
    .type(AccName)
    cy.get(loc.ACCOUNT.BTN_SAVE).click()

})