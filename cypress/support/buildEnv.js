const buildEnv = () => {
    cy.intercept({
        method: 'POST',
        url: '/signin'
      },
        {
          id: 1000,
          nome: 'Fake User',
          token: 'One big string thats just hogus bogus'
        }
      ).as('signin')
  
      cy.intercept({
        method: 'GET',
        url: '/saldo'
      },
        [
          {
            conta_id: 9909,
            conta: 'Carteira',
            saldo: "100.00"
          },
          {
            conta_id: 9902,
            conta: "Banco",
            saldo: "131235.00"
          }
        ]
      ).as('saldo')

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
        method: 'GET',
        url: '/extrato/**'
    },
    
        [
            {
                "conta": "Conta para movimentacoes",
                "id": 2147594,
                "descricao": "Movimentacao para exclusao",
                "envolvido": "AAA",
                "observacao": null,
                "tipo": "DESP",
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
                "descricao": "Movimentacao de conta",
                "envolvido": "BBB",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2024-10-08T03:00:00.000Z",
                "data_pagamento": "2024-10-08T03:00:00.000Z",
                "valor": "-1500.00",
                "status": true,
                "conta_id": 2287429,
                "usuario_id": 55665,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Conta para saldo",
                "id": 2147596,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2024-10-08T03:00:00.000Z",
                "data_pagamento": "2024-10-08T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 2287430,
                "usuario_id": 55665,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Conta para saldo",
                "id": 2147597,
                "descricao": "Movimentacao 2, calculo saldo",
                "envolvido": "DDD",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2024-10-08T03:00:00.000Z",
                "data_pagamento": "2024-10-08T03:00:00.000Z",
                "valor": "-1000.00",
                "status": true,
                "conta_id": 2287430,
                "usuario_id": 55665,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Conta para saldo",
                "id": 2147598,
                "descricao": "Movimentacao 3, calculo saldo",
                "envolvido": "EEE",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2024-10-08T03:00:00.000Z",
                "data_pagamento": "2024-10-08T03:00:00.000Z",
                "valor": "1534.00",
                "status": true,
                "conta_id": 2287430,
                "usuario_id": 55665,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Conta para extrato",
                "id": 2147599,
                "descricao": "Movimentacao para extrato",
                "envolvido": "FFF",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2024-10-08T03:00:00.000Z",
                "data_pagamento": "2024-10-08T03:00:00.000Z",
                "valor": "-220.00",
                "status": true,
                "conta_id": 2287431,
                "usuario_id": 55665,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        ]
    
  ).as('Extrato')





    




}
export default buildEnv