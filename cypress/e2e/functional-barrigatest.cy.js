
import loc from '../support/locators'
import '../support/AccountsCommands'





describe('BarrigaTestCypress with Reset', () => {

  beforeEach(() => {
    cy.login('djalma@melo.com', 'p4ssw0rd')
    cy.resetApp()
    cy.get(loc.MENU.BTN_HOME).click()
    cy.resetApp()

  })

  it('Create Account', () => {
    cy.AccessAccountMenu()
    cy.InsertAccount('account test')
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')

  })

  it('Should alter accout', () => {
    cy.AccessAccountMenu()
    cy.AlterAccount('Conta alterada 2')
    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')

  })

  it('Should not be able to alter accounts name', () => {
    cy.AccessAccountMenu()
    cy.InsertAccount('Conta mesmo nome')
    cy.get(loc.MESSAGE).should('contain', '400')
  })

  it('Should create a transaction', () => {
    cy.get(loc.MENU.CASHFLOW).click()
    cy.get(loc.CASHFLOW.DESCRIPTION).type('Description')
    cy.get(loc.CASHFLOW.VALUE).type('124121')
    cy.get(loc.CASHFLOW.PAYEE).type('Payee')
    cy.get(loc.CASHFLOW.ACCOUNTSELECT).select('Conta para movimentacoes')
    cy.get(loc.CASHFLOW.STATUS).click()
    cy.get(loc.CASHFLOW.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'sucesso!')
    cy.get(loc.STATEMENTS.DESCRIPTION).should('contain', 'Description')
    cy.get(loc.STATEMENTS.VALUE).should('contain', 'R$')
    cy.get(loc.MENU.BTN_HOME).click()
    cy.get(loc.HOME.BALANCE_ACCOUNT).should('contain','Conta para saldo')
    cy.get(loc.HOME.BALANCE_VALUE).should('contain', 'R$')
  })

  it('Should get balance', () => {
    cy.get(loc.HOME.BALANCE_ACCOUNT).should('contain','Conta para saldo')
    cy.get(loc.HOME.BALANCE_VALUE).should('contain', '534,00')
    cy.get(loc.MENU.BALANCE).click()
    cy.get(loc.BALANCE.ALTERTRANSACTIONone).click()
    
    cy.get(loc.CASHFLOW.DESCRIPTION).should('have.value', 'Movimentacao 1, calculo saldo')
    cy.get(loc.CASHFLOW.ACCOUNTSELECT).select('Conta para saldo')
    cy.get(loc.CASHFLOW.STATUS).click()
    cy.get(loc.CASHFLOW.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'Movimentação alterada com sucesso!')
    cy.get(loc.MENU.BTN_HOME).click()
   
    cy.get(loc.HOME.BALANCE_ACCOUNT).should('contain','Conta para saldo')
    cy.get(loc.HOME.BALANCE_VALUE).should('contain', '4.034,00')
    
  })

  it('Should remove a transaction', () =>{
    cy.get(loc.MENU.BALANCE).click()
    cy.get(loc.BALANCE.REMOVETRANSACTION).click()
    cy.get(loc.MESSAGE).should('contain', 'sucesso!')

  })


})











// describe('BarrigaTestCypress', ()=>{

// beforeEach(() => {

//   cy.login('djalma@melo.com', 'p4ssw0rd')

// })

// it('Should create a transaction', () => {
//   cy.resetApp
//   cy.get(loc.MENU.CASHFLOW).click()
//   cy.get(loc.CASHFLOW.DESCRIPTION).type('Description')
//   cy.get(loc.CASHFLOW.VALUE).type('124121')
//   cy.get(loc.CASHFLOW.PAYEE).type('Payee')
//   cy.get(loc.CASHFLOW.ACCOUNTSELECT).select('Conta para saldo')
//   cy.get(loc.CASHFLOW.STATUS).click()
//   cy.get(loc.CASHFLOW.BTN_SAVE).click()
//   cy.get(loc.MESSAGE).should('contain', 'sucesso!')
//   cy.get(loc.STATEMENTS.DESCRIPTION).should('contain', 'Description')
//   cy.get(loc.STATEMENTS.VALUE).should('contain', 'R$')
// })

// it('Should get balance', () => {
//   cy.get(loc.MENU.BTN_HOME).click()
//   cy.get(loc.HOME.ACCOUNT).should('contain','Conta para saldo')
//   cy.get(loc.HOME.BALANCE).should('contain', 'R$')
// })

// })