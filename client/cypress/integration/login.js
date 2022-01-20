describe('Counter main', () => {
  // приложение должно открыться по адресу: http://localhost:3000
  it("Should open app on localhost:3000", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input").eq(0).type("alexei");
    cy.get("input").eq(1).type("alexei");
    cy.get("button").click();
    cy.url().should("include","/workspaces");
    cy.get("p").eq(1).should("have.text","alexei");
    cy.wait(10);
    // cy.get("button").eq(1).click();
    cy.get(".card-title").eq(1).click();
    cy.get(".card-title").eq(0).click();
    // cy.request()
  });
});