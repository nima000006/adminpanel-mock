/// <reference types="cypress" />
// About API testing: https://docs.cypress.io/api/commands/request#Method-and-URL

describe("Check Auth request", () => {
  it("Get 200 status", () => {
    cy.request({
      method: "POST",
      url: "http://gateway.example.com/auth-service/api/v1/auth/admin-login",
      body: { username: "2700143851", password: "Sa@12345" },
    }).as("auth");

    cy.get("@auth").should((response: any) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property("headers");
      expect(response.body).to.have.property("data");
    });
  });
});

describe("Check https://jsonplaceholder.typicode.com/posts request", () => {
  it("Get 200 status", () => {
    cy.request({
      method: "GET",
      url: `https://jsonplaceholder.typicode.com/posts`,
    }).as("getEntries");

    cy.get("@getEntries").should((response: any) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property("headers");
      expect(response.body).to.have.property("entries");
    });
  });
});
