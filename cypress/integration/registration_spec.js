/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
beforeEach(() => {
  cy.visit("/");
});

describe("Auth", () => {
  it("Should have successful registration", () => {
    cy.get(`[data-cy=input-firstName]`).type("John");
    cy.get(`[data-cy=input-lastName]`).type("Doe");
    cy.get(`[data-cy=input-email]`).type(`john${Math.random()}.doe@test.com`);
    cy.get(`[data-cy=input-password]`).type("jDo3!");


    cy.get(`[data-cy=register-button]`).click()
      .should(() => {
        expect(localStorage.getItem("token")).to.be.string;
        expect(localStorage.getItem("userId")).to.be.string;
      });
    cy.location('pathname').should('match', /\/$/);
  });
});
