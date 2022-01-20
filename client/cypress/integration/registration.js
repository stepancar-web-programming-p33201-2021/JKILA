describe('Counter main', () => {
  it("Links check", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("a").eq(2).click();
    cy.url().should("include","/registration");
    cy.get("a").eq(2).should("have.text","Войдите!")
    cy.get("a").eq(2).click();
    cy.get("a").eq(2).should("have.text","Зарегистрируйся!")
  });

  it("Registration username", () => {
    cy.visit("http://localhost:3000/registration");
    cy.get("input").eq(0).type("alexei");
    cy.get("input").eq(1).type("name");
    cy.get("input").eq(2).type("lastname");
    cy.get("input").eq(3).type("password");
    cy.get("button").click();
    cy.on('window:alert',(text) => {
      expect(text).to.contains('Пользователь с таким username уже существует')
    });
  });

});