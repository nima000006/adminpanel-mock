describe("Home Page", () => {
  it("should load home page successfully", () => {
    cy.visit("/");
    cy.contains("Welcome").should("exist");
  });
});
