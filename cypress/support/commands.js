// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

import loc from '../support/locators'

Cypress.Commands.add('login', (user, password) => {
    cy.visit('http://barrigareact.wcaquino.me')
    cy.get(loc.LOGIN.USER).type(user)
    cy.get(loc.LOGIN.PASSWORD).type(password)
    cy.get(loc.LOGIN.BTN_LOGIN).click()
    cy.get(loc.MESSAGE).should('contain', 'Bem vindo,')
})

Cypress.Commands.add('resetApp', () => {
    cy.get(loc.MENU.BTN_SETTINGS).click()
    cy.get(loc.MENU.RESET).click()


})




Cypress.Commands.add('getToken', (user, password) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email: user,
            redirecionar: false,
            senha: password


        }

    }).its('body.token').should('not.be.empty')
        .then(token => {
            Cypress.env('token', token)
            return token
        })
})

Cypress.Commands.add('resetRest', () => {
    cy.getToken('djalma@melo.com', 'p4ssw0rd').then(token => {
        cy.request({
            method: 'GET',
            url: '/reset',
            headers: { Authorization: `JWT ${token}` }

        })
    })
})

Cypress.Commands.add('getContaByName', name => {
    cy.getToken('djalma@melo.com', 'p4ssw0rd').then(token => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: name
            }

        }).then(res => {
            return res.body[0].id
        })
    })
})


Cypress.Commands.add('getTransaction', description => {
    cy.getToken(user, password).then(token => {
        cy.request({

            method: 'GET',
            url: '/transacoes',
            qs: {
                descricao: description
            }
            // headers: { Authorization: `JWT ${token}` },
        })
    })

})




Cypress.Commands.overwrite('request', (originalFn, ...options) => {
    if (options.length === 1) {
        if (Cypress.env('token')) {
            options[0].headers = {
                Authorization: `JWT ${Cypress.env('token')}`
            }
        }
    }

    return originalFn(...options)
})


//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })