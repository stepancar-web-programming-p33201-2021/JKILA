describe('Counter main', () => {
  it("Registration check", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input").eq(0).type("alexei");
    cy.get("input").eq(1).type("alexei");
    cy.get("button").click();
    cy.wait(200);
    cy.get("button").eq(-1).should('have.text','Join workspace');
    cy.get("button").eq(-2).should('have.text','Create Workspace');
    cy.get("button").eq(-1).click();
    cy.get("button").eq(-1).should('have.text','Вступить');
    cy.get("button").eq(-2).click();
    cy.get("button").eq(-2).click();
    cy.get("button").eq(-1).should('have.text','Добавить');
  });

  it("Registration check", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input").eq(0).type("alexei");
    cy.get("input").eq(1).type("alexei");
    cy.get("button").click();
    cy.wait(200);
    cy.get(".card-title").eq(0).click();
    cy.wait(200);
    cy.get(".card-title").eq(0).click();
    cy.wait(200);
    cy.get(".container").eq(1)
      .find('.container').eq(0)
      .find("div").eq(0).should('have.text', "To Do");

    cy.get(".container").eq(1)
      .find('.container').eq(1)
      .find("div").eq(0).should('have.text', "In Progress");

    cy.get(".container").eq(1)
      .find('.container').eq(2)
      .find("div").eq(0).should('have.text', "Done");

  });
});