
import loc from '../support/locators'
import '../support/AccountsCommands'
import buildEnv from '../support/buildEnv'



describe('BarrigaTestCypress with Reset', () => {
  after(() => {
    cy.clearLocalStorage()

  })

  before(() => {



  })
  beforeEach(() => {
    buildEnv()

    cy.login('djalma@melo.com', 'senha errada')
    // cy.resetApp()
    cy.get(loc.MENU.BTN_HOME).click()

  })

  it('Should test colors', () => {
    cy.get(loc.MENU.BTN_HOME).should('exist')
      .and('be.visible')

    cy.viewport(500, 700)
    cy.get(loc.MENU.BTN_HOME).should('exist')
      .and('be.not.visible')

    cy.viewport('iphone-5')
    cy.get(loc.MENU.BTN_HOME).should('exist')
      .and('be.not.visible')

    cy.viewport('ipad-2')
    cy.get(loc.MENU.BTN_HOME).should('exist')
      .and('be.visible')
  })
  it('Create Account', () => {

    cy.intercept({
      method: 'POST',
      url: '/contas'
    },

      { id: 3, nome: "account test", visivel: true, usuario_id: 1 },
    )
    cy.AccessAccountMenu()

    cy.intercept({
      method: 'GET',
      url: '/contas'
    },
      [
        { id: 1, nome: "Carteira", visivel: true, usuario_id: 1 },
        { id: 2, nome: "Banco", visivel: true, usuario_id: 1 },
        { id: 3, nome: "account test", visivel: true, usuario_id: 1 }
      ]
    ).as('SAVEcontas')

    cy.InsertAccount('account test')
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')

  })

  it('Should alter accout', () => {
    cy.intercept({
      method: 'GET',
      url: '/contas'
    },
      [
        { id: 1, nome: "Carteira", visivel: true, usuario_id: 1 },
        { id: 2, nome: "Banco", visivel: true, usuario_id: 1 }
      ]
    ).as('contas')

    cy.intercept({
      method: 'PUT',
      url: '/contas/**'
    },
      { id: 1, nome: "Conta alterada 2", visivel: true, usuario_id: 1 }

    )

    cy.AccessAccountMenu()
    cy.AlterAccount('Conta alterada 2')
    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')

  })

  it('Should not be able to alter accounts name', () => {
    cy.intercept({
      method: 'POST',
      url: '/contas'
    },

      {
        "error": "Já existe uma conta com este nome!",
        statusCode: 400
      },

    ).as('SaveContaMesmoNome')

    cy.AccessAccountMenu()
    cy.InsertAccount('Conta mesmo nome')
    cy.get(loc.MESSAGE).should('contain', '400')
  })

  it('Should create a transaction', () => {
    cy.intercept({
      method: 'POST',
      url: '/transacoes'
    }, {
      "id": 2147587,
      "descricao": "Description",
      "envolvido": "Payee",
      "observacao": null,
      "tipo": "REC",
      "data_transacao": "2024-10-08T03:00:00.000Z",
      "data_pagamento": "2024-10-08T03:00:00.000Z",
      "valor": "123.00",
      "status": true,
      "conta_id": 2287412,
      "usuario_id": 55665,
      "transferencia_id": null,
      "parcelamento_id": null
    }
    )
    cy.intercept({
      method: 'GET',
      url: '/extrato/**'
    }, { fixture: 'SavedTransaction.json' }

    )


    cy.get(loc.MENU.CASHFLOW).click()
    cy.get(loc.CASHFLOW.DESCRIPTION).type('Description')
    cy.get(loc.CASHFLOW.VALUE).type('123')
    cy.get(loc.CASHFLOW.PAYEE).type('Payee')
    cy.get(loc.CASHFLOW.ACCOUNTSELECT).select('Banco')
    cy.get(loc.CASHFLOW.STATUS).click()
    cy.get(loc.CASHFLOW.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'sucesso!')
    cy.get(loc.STATEMENTS.DESCRIPTION).should('contain', 'Description')
    cy.get(loc.STATEMENTS.VALUE).should('contain', 'R$')
    cy.get(loc.MENU.BTN_HOME).click()
    cy.get(loc.HOME.BALANCE_VALUE).should('contain', 'R$')
  })

  it('Should get balance', () => {
    cy.intercept({
      method: 'GET',
      url: '/transacoes/**'
    },
      {
        "conta": "Conta para saldo",
        "id": 2147575,
        "descricao": "Movimentacao 1, calculo saldo",
        "envolvido": "CCC",
        "observacao": null,
        "tipo": "REC",
        "data_transacao": "2024-10-08T03:00:00.000Z",
        "data_pagamento": "2024-10-08T03:00:00.000Z",
        "valor": "3500.00",
        "status": false,
        "conta_id": 2287416,
        "usuario_id": 55665,
        "transferencia_id": null,
        "parcelamento_id": null
      }
    )
    cy.intercept({
      method: 'PUT',
      url: '/transacoes/**'
    },
      {
        "conta": "Conta para saldo",
        "id": 2147575,
        "descricao": "Movimentacao 1, calculo saldo",
        "envolvido": "CCC",
        "observacao": null,
        "tipo": "REC",
        "data_transacao": "2024-10-08T03:00:00.000Z",
        "data_pagamento": "2024-10-08T03:00:00.000Z",
        "valor": "3500.00",
        "status": true,
        "conta_id": 2287416,
        "usuario_id": 55665,
        "transferencia_id": null,
        "parcelamento_id": null
      }
    )

    cy.get('.container').should('contain', 'Carteira')
    cy.get('.container').should('contain', '100,00')
    cy.get(loc.MENU.BALANCE).click()
    cy.get(loc.BALANCE.ALTERTRANSACTIONone).click()

    cy.get(loc.CASHFLOW.DESCRIPTION).should('have.value', 'Movimentacao 1, calculo saldo')
    cy.get(loc.CASHFLOW.ACCOUNTSELECT).select('Carteira')
    cy.get(loc.CASHFLOW.STATUS).click()
    cy.get(loc.CASHFLOW.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'Movimentação alterada com sucesso!')


    cy.intercept({
      method: 'GET',
      url: '/saldo'
    },
      [
        {
          conta_id: 9909,
          conta: 'Carteira',
          saldo: "4034.00"
        },
        {
          conta_id: 9902,
          conta: "Banco",
          saldo: "131235.00"
        }
      ]
    ).as('saldoFinal')
    cy.get(loc.MENU.BTN_HOME).click()

    cy.get('.container').should('contain', 'Carteira')
    cy.get('.container').should('contain', '4.034,00')

  })

  it('Should remove a transaction', () => {
    cy.intercept({
      method: 'DELETE',
      url: '/transacoes/**'
    },
      { statusCode: 204 }
    )
    cy.get(loc.MENU.BALANCE).click()
    cy.get(loc.BALANCE.REMOVETRANSACTION).click()
    cy.get(loc.MESSAGE).should('contain', 'sucesso!')

  })

  it('Should validate data sent to Create Account', () => {
    cy.intercept('POST', '/contas', (req) => {
      console.log(req)
      expect(req.body.nome).to.be.empty
      expect(req.headers).to.have.property('authorization')
      req.reply({
        statusCode: 200,
        body: { id: 3, nome: 'Conta de Teste', visivel: true, usuario_id: 1 }
      })
    }).as('saveConta3')
    cy.AccessAccountMenu()

    cy.intercept({
      method: 'GET',
      url: '/contas'
    },
      [
        { id: 1, nome: "Carteira", visivel: true, usuario_id: 1 },
        { id: 2, nome: "Banco", visivel: true, usuario_id: 1 },
        { id: 3, nome: "account test", visivel: true, usuario_id: 1 }
      ]
    ).as('SAVEcontas')

    cy.InsertAccount('{CONTROL}')
    // cy.wait('@SaveAccount').its('reqiest.body.nome').should('not.be.empty')
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')

  })

  it('Should test colors', () => {


    cy.intercept({
      method: 'GET',
      url: '/extrato/**'
    },

      [
        {
          "conta": "Conta para movimentacoes",
          "id": 2147594,
          "descricao": "Receita Paga",
          "envolvido": "AAA",
          "observacao": null,
          "tipo": "REC",
          "data_transacao": "2024-10-08T03:00:00.000Z",
          "data_pagamento": "2024-10-08T03:00:00.000Z",
          "valor": "-1500.00",
          "status": true,
          "conta_id": 2287428,
          "usuario_id": 55665,
          "transferencia_id": null,
          "parcelamento_id": null
        },
        {
          "conta": "Conta com movimentacao",
          "id": 2147595,
          "descricao": "Receita Pentende",
          "envolvido": "BBB",
          "observacao": null,
          "tipo": "REC",
          "data_transacao": "2024-10-08T03:00:00.000Z",
          "data_pagamento": "2024-10-08T03:00:00.000Z",
          "valor": "-1500.00",
          "status": false,
          "conta_id": 2287429,
          "usuario_id": 55665,
          "transferencia_id": null,
          "parcelamento_id": null
        },
        {
          "conta": "Conta para saldo",
          "id": 2147596,
          "descricao": "Despesa Paga",
          "envolvido": "CCC",
          "observacao": null,
          "tipo": "DESP",
          "data_transacao": "2024-10-08T03:00:00.000Z",
          "data_pagamento": "2024-10-08T03:00:00.000Z",
          "valor": "3500.00",
          "status": true,
          "conta_id": 2287430,
          "usuario_id": 55665,
          "transferencia_id": null,
          "parcelamento_id": null
        },
        {
          "conta": "Conta para saldo",
          "id": 2147597,
          "descricao": "Despesa Pendente",
          "envolvido": "DDD",
          "observacao": null,
          "tipo": "DESP",
          "data_transacao": "2024-10-08T03:00:00.000Z",
          "data_pagamento": "2024-10-08T03:00:00.000Z",
          "valor": "-1000.00",
          "status": false,
          "conta_id": 2287430,
          "usuario_id": 55665,
          "transferencia_id": null,
          "parcelamento_id": null
        }

      ]

    ).as('Extrato')

    cy.get(loc.MENU.BALANCE).click()
    cy.get(loc.BALANCE.BALANCESTATUSLINE('.receitaPaga'))
    cy.get(loc.BALANCE.BALANCESTATUSLINE('.receitaPendente'))
    cy.get(loc.BALANCE.BALANCESTATUSLINE('.despesaPaga'))
    cy.get(loc.BALANCE.BALANCESTATUSLINE('.despesaPendente'))
  })

})




  
