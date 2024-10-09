const dayjs = require('dayjs')


describe('BarrigaTestCypress with Reset', () => {

  // let token
  before(() => {
    cy.getToken('djalma@melo.com', 'p4ssw0rd')
      // .then(tkn => {
      //   token = tkn
      // })

  })

  beforeEach(() => {
    cy.resetRest()

  })

  it('Create Account', () => {
    cy.request({
      method: 'POST',
      url: '/contas',
      // headers: { Authorization: `JWT ${token}` },
      body: {
        nome: 'conta via rest'

      }

    }).as('response')


    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', 'conta via rest')


    })
  })

  it('Should alter accout', () => {
    cy.request({
      method: 'GET',
      url: '/contas',
      // headers: { Authorization: `JWT ${token}` },
      qs: {
        nome: 'Conta para alterar'

      }


    }).then(res => {
      cy.request({
        url: `contas/${res.body[0].id}`,
        method: 'PUT',
        // headers: { Authorization: `JWT ${token}` },
        body: {
          nome: 'conta alterada by rest'
        }
      }).as('response')


    })
    cy.get('@response').its('status').should('be.equal', 200)
  })

  it('Should not be able to alter accounts name', () => {
    cy.request({
      method: 'POST',
      url: '/contas',
      // headers: { Authorization: `JWT ${token}` },
      body: {
        nome: 'Conta mesmo nome'

      },
      failOnStatusCode: false

    }).as('response')


    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(400)
      expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')


    })


  })

  it('Should create a transaction', () => {

    cy.getContaByName('Conta para movimentacoes')
      .then(contaID => {
        cy.request({
          method: 'POST',
          url: '/transacoes',
          // headers: { Authorization: `JWT ${token}` },
          body: {
            conta_id: contaID,
            data_pagamento: dayjs().add(1, 'day').format('DD/MM/YYYY'),
            data_transacao: dayjs().format('DD/MM/YYYY'),
            descricao: "wegqj",
            envolvido: "qsnfq",
            status: true,
            tipo: "REC",
            valor: "1234"

          },






        })


      }).as('response')
    cy.get('@response').its('status').should('be.equal', 201)
    cy.get('@response').its('body.id').should('exist')


  })

  it('Should get balance', () => {
    cy.request({
      method: 'GET',
      url: '/saldo',
      // headers: { Authorization: `JWT ${token}` },
    })
      .then(res => {
        let saldoConta = null
        res.body.forEach(c => {
          if (c.conta === 'Conta para saldo') saldoConta = c.saldo
        })
        expect(saldoConta).to.be.equal('534.00')
      })

    cy.getTransaction('Movimentacao 1, calculo saldo').then(res => {
      console.log(res.body[0])
      cy.request({
        method: 'PUT',
        url: `/transacoes/${res.body[0].id}`,
        // headers: { Authorization: `JWT ${token}` },
        body: {
          status: true,
          data_pagamento: dayjs(res.body[0].data_pagamento).format('DD/MM/YYYY'),
          data_transacao: dayjs(res.body[0].data_transacao).format('DD/MM/YYYY'),
          descricao: res.body[0].descricao,
          envolvido: res.body[0].envolvido,
          status: true,
          valor: res.body[0].valor,
          conta_id: res.body[0].conta_id

        },
      }).its('status').should('be.equal', 200)
      

    })

    cy.request({
      method: 'GET',
      url: '/saldo',
      // headers: { Authorization: `JWT ${token}` },
    }).then(res => {
      let saldoConta = null
      res.body.forEach(c => {
        if (c.conta === 'Conta para saldo') saldoConta = c.saldo
      })
      expect(saldoConta).to.be.equal('4034.00')
    })

  })

})


it('Should remove a transaction', () => {
  cy.getTransaction('Movimentacao para exclusao')
    .then(res => {
      // cy.getToken('djalma@melo.com', 'p4ssw0rd').then(token => {
      cy.request({
        url: `/transacoes/${res.body[0].id}`,
        method: 'DELETE',
        // headers: { Authorization: `JWT ${token}` },
      }).its('status').should('be.equal', 204)

    })
})


