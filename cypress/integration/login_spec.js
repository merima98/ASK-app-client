/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

beforeEach(() => {
    cy.visit("/login");
});

describe("Auth", () => {
    it("Should have successful login", () => {
        cy.get(`[data-cy=input-email]`).type("testing.ceranic@test.com");
        cy.get(`[data-cy=input-password]`).type("merima123");

        cy.get(`[data-cy=login-button]`).click()
            .should(() => {
                expect(localStorage.getItem("token")).to.be.string;
                expect(localStorage.getItem("userId")).to.be.string;
            });
        cy.location('pathname').should('match', /\/$/);
    });
});
