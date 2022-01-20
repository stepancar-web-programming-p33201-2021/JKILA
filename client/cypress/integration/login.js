describe('Counter main', () => {
  // приложение должно открыться по адресу: http://localhost:3000
  it("Should login", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("a").eq(1).should("have.text"," Sign In ");
    cy.get("input").eq(0).type("alexei");
    cy.get("input").eq(1).type("alexei");
    cy.get("button").click();
    cy.url().should("include","/workspaces");
    cy.get("p").eq(1).should("have.text","alexei");
    cy.get("a").eq(1).should("have.text"," Sign Out ");
    cy.get("a").eq(1).click();
    cy.get("a").eq(1).should("have.text"," Sign In ");
    // cy.get(".card-title").eq(0).click();
    // cy.request()
  });
  it("Should not login password", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("a").eq(1).should("have.text"," Sign In ");
    cy.get("input").eq(0).type("alexei");
    cy.get("input").eq(1).type("12345");
    cy.get("button").click();
    cy.on('window:alert',(text) => {
      expect(text).to.contains('Неверный пароль')
    });
  });

  it("Should not login username", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input").eq(0).type("alex");
    cy.get("input").eq(1).type("12345");
    cy.get("button").click();
    cy.on('window:alert',(text) => {
      expect(text).to.contains('Пользователь не найден')
    });
  });

});