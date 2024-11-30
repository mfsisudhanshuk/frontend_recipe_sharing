describe("Add recipe flow", () => {
  it("should navigate to the adding recipe page", async () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find a link with an href attribute containing "Registration" and click it
    cy.get(".flex > :nth-child(2) > .text-gray-700").click();

    // Check if the registration form is present
    it("should display the Add Recipe form with all fields", () => {
      // Check the page title
      cy.get(".text-2xl").should("have.text", "Add Recipe");

      // Check if the labels and inputs exist
      cy.get("label[for='title']").should("have.text", "Title");
      cy.get("input[name='title']").should("exist");

      cy.get("label[for='ingredients']").should("have.text", "Ingredients");
      cy.get("input[name='ingredients[0]']").should("exist");

      cy.get("label[for='preparationTime']").should(
        "have.text",
        "Preparation Time"
      );
      cy.get("input[name='preparationTime']").should("exist");

      cy.get("label[for='steps']").should("have.text", "Steps");
      cy.get("textarea[name='steps']").should("exist");

      cy.get("label[for='rating']").should("have.text", "Rating");
      cy.get("input[name='rating']").should("exist");

      cy.get("label[for='image']").should("have.text", "Image");
      cy.get("input[name='image']").should("exist");

      cy.get("button[type='submit']").should("have.text", "Add Recipe");
    });

    // Fill in valid data
    // const userData = {
    //   name: "Test User",
    //   email: `testuser${Date.now()}@example.com`, // Ensure a unique email for testing
    //   password: "password123",
    //   confirmPassword: "password123",
    // };
  });
});
