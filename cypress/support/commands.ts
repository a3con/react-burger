/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { endpoints } from '../../src/utils/api'

const refreshToken = JSON.stringify('cy-refresh-token')
const accessToken = JSON.stringify('cy-access-token')

Cypress.Commands.add('prepare', () => {
  cy.intercept('POST', endpoints.orders, { fixture: 'order' }).as('postOrder')
  cy.intercept('GET', endpoints.ingredients, { fixture: 'ingredients' })
  cy.intercept('GET', endpoints.user, { fixture: 'user' })

  cy.visit('http://localhost:5173/')

  window.localStorage.setItem('accessToken', accessToken)
  window.localStorage.setItem('refreshToken', refreshToken)
})
