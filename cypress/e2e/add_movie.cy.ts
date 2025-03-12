// https://on.cypress.io/api

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/movies');
    cy.visit('/movies/create');

    cy.get('input[name="title"]').type('The Matrix');
    cy.get('input[name="description"]').type('The Wachowskis');
    cy.get('input[name="rating"]').type('151');

    cy.get('button[type="submit"]').click();

    cy.contains('h1', 'List Movie');
  });
});
