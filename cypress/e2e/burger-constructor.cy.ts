import type {} from 'cypress'
import type {} from '../support/cypress'

describe('Home page', () => {
  // TODO Добавить нескольких одинаковых ингридиентов
  // TODO Разбить тесты модалки на открытие и закрытие
  it('should DnD the ingredients and place an order', function () {
    cy.prepare()

    cy.get('[data-testid="cy-ingredient-bun"]').should('exist').as('dragBun')
    cy.get('[data-testid="cy-ingredient-card"]')
      .should('exist')
      .as('dragIngredient')
    cy.get('[data-testid="cy-constructor-drop-area"]')
      .should('exist')
      .as('dropConstructor')

    cy.get('@dragBun').first().trigger('dragstart')
    cy.get('@dropConstructor').trigger('dragenter').trigger('drop')

    cy.get('@dragIngredient').eq(2).trigger('dragstart')
    cy.get('@dropConstructor').trigger('dragenter').trigger('drop')

    cy.get('[data-testid="cy-constructor-bun-top"]').should(
      'contain',
      'Краторная булка N-200i (верх)',
    )
    cy.get('[data-testid="cy-constructor-bun-bottom"]').should(
      'contain',
      'Краторная булка N-200i (низ)',
    )
    cy.get('[data-testid="cy-ingredient-card"]').should(
      'contain',
      'Биокотлета из марсианской Магнолии',
    )

    cy.get('[data-testid="cy-constructor-place-an-order"]')
      .should('exist')
      .click()

    cy.get('[data-testid="cy-order-number"]').contains('12345').should('exist')
  })

  it('should open and close the modal with an ingredient', () => {
    cy.prepare()

    cy.get('[data-testid="cy-ingredient-bun"]').should('exist').as('bun')

    cy.get('@bun').first().should('exist').click()
    cy.get('[data-testid="cy-modal-close-button"]').should('exist')
    cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa093c')
    cy.get('[data-testid="cy-ingredient-details-name"]')
      .should('exist')
      .contains('Краторная булка N-200i')
    cy.get('[data-testid="cy-modal-close-button"]').should('exist').click()
    cy.get('[data-testid="cy-modal-close-button"]').should('not.exist')

    cy.get('@bun').first().should('exist').click()
    cy.get('[data-testid="cy-modal-close-button"]').should('exist')
    cy.get('[data-testid="cy-modal-close-overlay"]')
      .should('exist')
      .click({ force: true })
    cy.get('[data-testid="cy-modal-close-button"]').should('not.exist')
  })

})
