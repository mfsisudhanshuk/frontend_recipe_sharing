describe("Navigate from Home Page to Detail Page", () => {
  it("should navigate to the detail page when a card is clicked", () => {
    // Step 1: Visit the homepage
    cy.visit("http://localhost:3001/");

    cy.get(".grid > :nth-child(1)").first().click(); // This assumes you want to click the first card

    // Hardcode the recipe ID and check the title .
    cy.get('[data-id="4FmKH6bHOfl29VmirMrE"]').contains("Recipe title 1");
  });
});

describe("Check comment", () => {
  it("Checking comment is are shown on detail page", () => {
    // Step 1: Visit the homepage
    cy.visit("http://localhost:3001/");

    cy.get(".grid > :nth-child(1)").first().click(); // This assumes you want to click the first card

    cy.url().should(
      "include",
      "http://localhost:3001/recipe/4FmKH6bHOfl29VmirMrE"
    );

    cy.get(".text-2xl").contains("Comments");

    cy.get("body").then(($body) => {
      if ($body.find(".hidden > :nth-child(1):contains('Login')").length > 0) {
        // User is not logged in
        cy.log("User is not logged in.");
        cy.get(".hidden > :nth-child(1)")
          .contains("Login")
          .should("be.visible");
      } else if ($body.find(".hidden > .px-4:contains('Logout')").length > 0) {
        // User is logged in
        cy.log("User is logged in.");
        cy.get(".hidden > .px-4").contains("Logout").should("be.visible");

        // Verify comment form is present
        cy.get("form").should("exist").and("be.visible");
      } else {
        // Neither Login nor Logout button is found
        throw new Error("Authentication status could not be determined.");
      }
    });
  });
});
